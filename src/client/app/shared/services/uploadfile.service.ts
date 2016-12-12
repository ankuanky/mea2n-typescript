import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CookieService } from './cookie.service';

@Injectable()
export class UploadService {
   progress:any;
   progressObserver:any;
  constructor (private cookieService: CookieService) {
    this.progress = Observable.create((observer:any) => {
        this.progressObserver = observer;
        console.log(this.progressObserver);
    }).share();
  }

  uploadFile (url: string, params: string[], file: File, fileName:string): Observable<any> {      
      console.log(file);
    return Observable.create((observer:any) => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();
            formData.append('file', file, fileName);


        xhr.onreadystatechange = () => {
            console.log(xhr);
            
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.response);
                    observer.next(xhr.response);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };

        xhr.upload.onprogress = (event) => {
            console.log(event);
            this.progress = Math.round(event.loaded / event.total * 100);
            if(this.progressObserver) {
                this.progressObserver.next(this.progress);
            }
        };
        let sessionData = JSON.parse(this.cookieService.get('SessionData'));
        console.log(sessionData);
        xhr.open('POST', url, true);                
        xhr.setRequestHeader('Authorization', 'Bearer '+ sessionData.accessToken);
        xhr.send(formData);
    });
  }
  
  getFile (url: string, params?: string[]): Observable<any> {      
    return Observable.create((observer:any) => {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = () => {            
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.response);
                    observer.next(xhr.response);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };        
        let sessionData = JSON.parse(this.cookieService.get('SessionData'));
        if(sessionData){
            xhr.open('GET', url, true);   
            xhr.responseType = 'blob';             
            xhr.setRequestHeader('Authorization', 'Bearer '+ sessionData.accessToken);
            xhr.send();
        }
    });
  }
  
  public b64toBlob(b64Data: any, contentType: string = '', sliceSize: number = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays:any[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers:Array<any> = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}


