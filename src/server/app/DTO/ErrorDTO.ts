export class ErrorDTO {
    message: any;
    status: number;
    constructor(msg: any, status?: number) {
        this.message = msg;
        //status is to identification of error type
        //status = 0 => Runtime code error (default) 
        //status = 1 => Database error
        this.status = status || 0;
    }
}