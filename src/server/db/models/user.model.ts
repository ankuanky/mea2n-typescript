// ```
// user.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// user.model.js may be freely distributed under the MIT license
// ```

// */app/models/user.model.js*

// ## User Model

// Note: MongoDB will autogenerate an _id for each User object created

// Grab the Mongoose module
import mongoose = require('mongoose');

// Import library to hash passwords
import * as bcrypt from 'bcrypt-nodejs';

let Schema = mongoose.Schema;


export interface IUser {
    username: string;
    fullname:string;
    password: string;
    email: string;
    role: string;
    _id: any;
}

export class User  {
  username: string;
  fullname:string;
  password: string;
  email: string;
  role: string;
  _id: any;

  constructor(data: User) {
    console.log("data",data)
    this.username = data.username;
    this.fullname = data.fullname? data.fullname: '';
    this.password = this.generateHash(data.password);
    this.email = data.email;
    this.role = data.role || 'ROLE_USER';
  }

  generateHash(password): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  validPassword(password): boolean {
    return bcrypt.compareSync(password, this.password);
  };
}

// Define the schema for the showcase item
let userSchema = new Schema({
    username : { type : String, unique : true, required: true },
    password : {type: String, unique: true, required: true },
    email : {type: String, unique: true, required: true },
    fullname : { type : String},
    role : { type : String }
});

// Register methods
userSchema.method('generateHash', User.prototype.generateHash);
userSchema.method('validPassword', User.prototype.validPassword);

// Export `Document`
export interface UserDocument extends User, mongoose.Document { }

// Expose the `model` so that it can be imported and used in
// the controller (to search, delete, etc.)
export let Users = mongoose.model<UserDocument>('User', userSchema);
