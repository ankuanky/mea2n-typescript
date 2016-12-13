import { User, Users } from '../../db/models/user.model';
export class UserResponseDTO {
    username: string;
    fullname: string;
    email: string;
    role: string;
    rememberMe: boolean;
    constructor(user: User, rememberMe: boolean = false) {
        this.username = user.username;
        this.fullname = user.fullname;
        this.email = user.email;
        this.role = user.role;
        this.rememberMe = rememberMe;
    }
    getUserDetails() {
        let user = {
            username: this.username,
            fullname: this.fullname,
            email: this.email,
            role: this.role,
            rememberMe: this.rememberMe
        }
        return user;
    }

    setUserDetails(user: User, rememberMe: boolean = false) {
        this.username = user.username;
        this.fullname = user.fullname;
        this.email = user.email;
        this.role = user.role;
        this.rememberMe = rememberMe;
    }
}