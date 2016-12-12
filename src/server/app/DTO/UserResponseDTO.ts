import { User, Users } from '../../db/models/user.model';
export class UserResponseDTO {
    username: string;
    fullname: string;
    email: string;
    role: string;
    constructor(user: User) {
        this.username = user.username;
        this.fullname = user.fullname;
        this.email = user.email;
        this.role = user.role;
    }
    getUserDetails() {
        let user = {
            username: this.username,
            fullname: this.fullname,
            email: this.email,
            role: this.role
        }
        return user;
    }

    setUserDetails(user: User) {
        this.username = user.username;
        this.fullname = user.fullname;
        this.email = user.email;
        this.role = user.role;
    }
}