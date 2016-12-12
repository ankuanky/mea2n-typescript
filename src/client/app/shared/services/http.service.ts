import {Http, Headers, RequestMethod, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class HttpService {
    constructor(private http: Http, private router: Router, private cookieService: CookieService) {
        
    }
//    private setRequestOptions(requestMethod, headers, data){
//        return new RequestOptions({
//           method: requestMethod,
//           headers: headers,
//           body : data 
//        });
//    }
//    
// 
    public makeHttpGetRequestWithToken(url:string, data?:any) {
        return this.makeHttpRequest(url, RequestMethod.Get, data, true);
    }
    
    public makeHttpGetRequestWithoutToken(url:string, data?:any) {
        return this.makeHttpRequest(url, RequestMethod.Get, data, false);
    }
    
    public makeHttpPostRequestWithToken(url:string, data?:any) {
        
        return this.makeHttpRequest(url, RequestMethod.Post, data, true);
        
    }
    public makeHttpPostRequestWithoutToken(url:string, data?:any) {
        return this.makeHttpRequest(url, RequestMethod.Post, data, false);
    }      
    private makeHttpRequest(url:string, requestMethod: RequestMethod, data?:any, needToken?:boolean) {
        let requestOptions = new RequestOptions({
            method: requestMethod,
            url: url
        });
        requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
        //if token needs for request then this block get user access token from cookies and add into Headers class properties
        if(needToken ) {
            let sessionData = JSON.parse(this.cookieService.get('SessionData')); 
            if(sessionData && sessionData.accessToken) {         
                requestOptions.headers.append('Authorization', 'Bearer '+ sessionData.accessToken);
            }
        }
        if(data) {
            requestOptions.body = data;
        }
        return this.intercept(this.http.request(url, requestOptions).timeout(10000));        
    } 
    private intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status  === 401) {
                this.cookieService.set('SessionData', '', -1, '/');
                this.router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
 
    }         
}

