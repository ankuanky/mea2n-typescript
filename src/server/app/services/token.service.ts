import * as jwt from 'jwt-simple';
export class TokenService {
    /* Fake, in-memory database of remember me tokens */
    tokens: any;
    constructor() {
        this.tokens = {};
    }
    public generateAndSaveToken(user, done) {
        let token = jwt.encode(user._id, process.env.SESSION_SECRET);
        this.saveRememberMeToken(token, user._id, (err) => {
            if (err) { return done(err); }
            return done(null, token);
        });
    }
    public saveRememberMeToken(token, uid, fn) {
        this.tokens[token] = uid;
        return fn();
    }
    public consumeRememberMeToken(token) {
        return new Promise((resolve, reject) => {
            try {
                let uid = this.tokens[token];
                // invalidate the single-use token
                delete this.tokens[token];
                resolve(uid);
            } catch (e) {
                reject(e);
            }
        });
    }
}