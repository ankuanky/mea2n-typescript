import { Injectable } from '@angular/core';
let Config = require('../../../../../config/config');

@Injectable()
export class CookieService {
            public set(cName: any, cValue: any, days?: any, RememberMe?: any) {
                if (this.get(cName)) {
                    this.remove(cName);
                }
                if (RememberMe) {
                    var expires = new Date();
                    var exp = expires.getTime() + (days ? days : 30) * 24 * 60 * 60 * 1000;
                    expires.setTime(exp);
                    document.cookie = cName + '=' + cValue + '; ' + 'expires=' + expires + Config.cookieSecure;
                } else {
                    document.cookie = cName + '=' + cValue + Config.cookieSecure;
                }
            }

            public get(cName: any) {
                let cookies: any = document.cookie.split(';');
                let length: number = cookies.length;
                let cValue: any = undefined;
                for (let i:number = 0; i < length; i++) {
                    var index = cookies[i].indexOf(cName);
                    if (index != -1) {
                        cValue = cookies[i].split('=')[1];
                        break;
                    }
                }
                return cValue;
            }

            public remove(cName: any) {
                document.cookie = cName + '=; ' + 'expires=Thu, 01 Jan 1970 00:00:00 GMT' + Config.cookieSecure;
                if (this.get(cName) == '') {
                    return true;
                }
                return false;
            }

            public getAll() {
                let cookies: any = document.cookie.split(';');
                return cookies;
            }

            public removeAll() {
                let cookies: any = this.getAll();
                let length: number = cookies.length;
                for (let i:number = 0; i < length; i++) {
                    var cName = cookies[i].split('=')[0];
                    this.remove(cName);
                }
                console.log(document.cookie.length);
                if (document.cookie.length == 0)
                    return true;
                return false;
            }
    
}


