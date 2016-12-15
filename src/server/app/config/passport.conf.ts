'use strict';
// ```
// passport.conf.js
// (c) 2015 David Newman
// david.r.niciforovic@gmail.com
// passport.conf.js may be freely distributed under the MIT license
// ```

// *config/passport.conf.js*

// This file contains the function which configures the PassportJS
// instance passed in.

// Load PassportJS strategies
import * as local from 'passport-local';
import * as rememberMe from 'passport-remember-me';
import { validateEmail, checkLength } from '../utils/utility';
// Load `User` `interfaces`, `class`, and `model`
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import { UserResponseDTO } from '../DTO/UserResponseDTO';
import mongoose = require('mongoose');

// Load the `Mongoose` `ObjectId` function
let ObjectId = require('mongoose').Types.ObjectId;

class SessionUser implements IUser {
    username: string;
    fullname: string;
    password: string;
    email: string;
    role: string;
    _id: any;

    constructor(username: string,
        id?: string,
        email?: string,
        role?: string) {
        this.username = username;
        this.email = email;
        this._id = id || undefined;
        this.role = role || undefined;
    }
}

interface IBounds {
    username: {
        minLength: number,
        maxLength: number
    },
    password: {
        minLength: number,
        maxLength: number
    },
    email: {
        minLength: number,
        maxLength: number
    }
}

export default function passportConf(passport, tokenService) {

    // Define length boundariess for expected parameters
    let bounds: IBounds = {
        username: {
            minLength: 3,
            maxLength: 16
        },
        password: {
            minLength: 8,
            maxLength: 128
        },
        email: {
            minLength: 5,
            maxLength: 254
        }
    };
    
    // # Passport Session Setup
    // *required for persistent login sessions*
    // Passport needs the ability to serialize and deserialize users out of
    // session data
    // ## Serialize User
    passport.serializeUser((user: UserDocument, done: any) => {
        let sessionUser = {
            _id: user._id,
            username: user.username,
            role: user.role
        };
        done(null, sessionUser);
    });

    // ## Deserialize User
    passport.deserializeUser((sessionUser: any, done: any) => {
        // The `sessionUser` object is different from the `user` mongoose
        // collection. It is actually `req.session.passport.user` and comes
        // from the `session` collection
        done(null, sessionUser);
    });

    // # Local Signup
    // We are using named strategies since we have one for login and one
    // for signup
    // By default, if there is no name, it would just be called 'local'
    passport.use('local-signup', new local.Strategy({
        // By default, local strategy uses username and password
        usernameField: 'username',
        passwordField: 'password',
        // Allow the entire request to be passed back to the callback
        passReqToCallback: true
    }, (req, username, password, done) => {
        // ## Data Checks
        // If the length of the username string is too long/short,
        // invoke verify callback
        if (!checkLength(username, bounds.username.minLength, bounds.username.maxLength)) {
            // ### Verify Callback
            // Invoke `done` with `false` to indicate authentication
            // failure
            return done(null,
                false,
                // Return info message object
                { message: 'Invalid username length.' }
            );
        }
        // If the length of the password string is too long/short,
        // invoke verify callback
        if (!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {
            // ### Verify Callback
            // Invoke `done` with `false` to indicate authentication
            // failure
            return done(null,
                false,
                // Return info message object
                { message: 'Invalid password length.' }
            );
        }
        // If the length of the email string is too long/short,
        // invoke verify callback
        if (!checkLength(req.body.email, bounds.email.minLength, bounds.email.maxLength)) {
            // ### Verify Callback
            // Invoke `done` with `false` to indicate authentication failure
            return done(null,
                false,
                // Return info message object
                { message: 'Invalid email length.' }
            );
        }
        // If the string is not a valid email...
        if (!validateEmail(req.body.email)) {
            // ### Verify Callback
            // Invoke `done` with `false` to indicate authentication
            // failure
            return done(null,
                false,
                // Return info message object
                { message: 'Invalid email address.' }
            );
        }
        // Asynchronous
        // User.findOne will not fire unless data is sent back
        process.nextTick(() => {
            // Find a user whose email or username is the same as the passed
            // in data.
            // We are checking to see if the user trying to login already
            // exists...
            Users.findOne({
                // Model.find `$or` Mongoose condition
                $or: [
                    { 'username': username },
                    { 'email': req.body.email }
                ]
            }, (err, user) => {
                // If there are any errors, return the error
                if (err)
                    return done(err);
                // If a user exists with either of those ...
                if (user) {
                    // ### Verify Callback
                    // Invoke `done` with `false` to indicate authentication
                    // failure
                    return done(null,
                        false,
                        // Return info message object
                        {
                            message: 'That username/email is already ' +
                            'taken.'
                        }
                    );
                } else {
                    // If there is no user with that email or username...
                    // Create the user
                    let newUser = new Users();
                    // Set the user's local credentials
                    // Combat case sensitivity by converting username and
                    // email to lowercase characters
                    newUser.username = username.toLowerCase();
                    newUser.email = req.body.email.toLowerCase();
                    // Hash password with model method
                    newUser.password = newUser.generateHash(password);
                    // Save the new user
                    newUser.save((err) => {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new local.Strategy({
        // By default, local strategy uses username and password
        usernameField: 'username',
        passwordField: 'password',
        // Allow the entire request to be passed back to the callback
        passReqToCallback: true
    }, (req, username, password, done) => {
        // ## Data Checks
        // If the length of the username string is too long/short,
        // invoke verify callback.
        // Note that the check is against the bounds of the email
        // object. This is because emails can be used to login as
        // well.
        if (!checkLength(username, bounds.username.minLength, bounds.email.maxLength)) {
            // ### Verify Callback
            // Invoke `done` with `false` to indicate authentication
            // failure
            return done(null,
                false,
                // Return info message object
                { message: 'Invalid username/email length.' }
            );
        }
        // If the length of the password string is too long/short,
        // invoke verify callback
        if (!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {
            // ### Verify Callback
            // Invoke `done` with `false` to indicate authentication
            // failure
            return done(null,
                false,
                // Return info message object
                { message: 'Invalid password length.' }
            );
        }
        // Find a user whose email or username is the same as the passed
        // in data
        // Combat case sensitivity by converting username to lowercase
        // characters
        Users.findOne({
            // Model.find `$or` Mongoose condition
            $or: [
                { 'username': username.toLowerCase() },
                { 'email': username.toLowerCase() }
            ]
        }, (err, user) => {
            // If there are any errors, return the error before anything
            // else
            if (err)
                return done(err);
            // If no user is found, return a message
            if (!user) {
                return done(null,
                    false,
                    {
                        message: 'That user was not found. '
                        + 'Please enter valid user credentials.'
                    }
                );
            }
            // If the user is found but the password is incorrect
            if (!user.validPassword(password)) {
                return done(null,
                    false,
                    { message: 'Invalid password entered.' });
            }
            // Otherwise all is well; return successful user
            return done(null, user);
        });
    }));
    
 
    
    // Remember Me cookie strategy
    //   This strategy consumes a remember me token, supplying the user the
    //   token was originally issued to.  The token is single-use, so a new
    //   token is then issued to replace it.
    passport.use(new rememberMe.Strategy(
        (token, done) => {
            tokenService.consumeRememberMeToken(token)
            .then((uid: any) => {
                if (!uid) { 
                    return done(null, false); 
                }
                Users.findById({_id: uid}, (err, user) => {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    return done(null, user);
                });
            })
            .catch((err: any) => {
                return done(err);
            });
        },
        tokenService.generateAndSaveToken
    ));

}   
