
import { Injectable } from '@angular/core';
import * as moment from 'moment';
declare var jQuery: any;
@Injectable()
export class UtilityService {
    time:any;
    getTime() {
//        let date:Date = new Date();
//        let h:any;
//        let H:any = date.getHours();
//        let timeLabel:string;
//        let m:any = date.getMinutes();
//        
//        if(m < 10) {
//           m = '0'+m;
//        }
//        if(H > 12) {
//            h = H%12;  
//            timeLabel = h + ':' + m + ' pm';
//        }else {
//            h = date.getHours();
//            timeLabel = h + ':' + m + ' am';
//        }
        
        this.time = [{label:'select time', value:''},
                    {label:'06:00 am', value:'06:00'},
                    {label:'06:30 am', value:'06:30'},
                    {label:'07:00 am', value:'07:00'},
                    {label:'07:30 am', value:'07:30'},
                    {label:'08:00 am', value:'08:00'},
                    {label:'08:30 am', value:'08:30'},
                    {label:'09:00 am', value:'09:00'},
                    {label:'09:30 am', value:'09:30'},
                    {label:'10:00 am', value:'10:00'},
                    {label:'10:30 am', value:'10:30'},
                    {label:'11:00 am', value:'11:00'},
                    {label:'11:30 am', value:'11:30'},
                    {label:'12:00 pm', value:'12:00'},
                    {label:'12:30 pm', value:'12:30'},
                    {label:'01:00 pm', value:'13:00'},
                    {label:'01:30 pm', value:'13:30'},
                    {label:'02:00 pm', value:'14:00'},
                    {label:'02:30 pm', value:'14:30'},
                    {label:'03:00 pm', value:'15:00'},
                    {label:'03:30 pm', value:'15:30'},
                    {label:'04:00 pm', value:'16:00'},
                    {label:'04:30 pm', value:'16:30'},
                    {label:'05:00 pm', value:'17:00'},
                    {label:'05:30 pm', value:'17:30'},
                    {label:'06:00 pm', value:'18:00'},
                    {label:'06:30 pm', value:'18:30'},
                    {label:'07:00 pm', value:'19:00'},
                    {label:'07:30 pm', value:'19:30'},
                    {label:'08:00 pm', value:'20:00'},
                    {label:'08:30 pm', value:'20:30'},
                    {label:'09:00 pm', value:'21:00'},
                    {label:'09:30 pm', value:'21:30'},
                    {label:'10:00 pm', value:'22:00'},
                    {label:'10:30 pm', value:'22:30'},
                    {label:'11:00 pm', value:'23:00'},
                    {label:'11:30 pm', value:'23:30'},
                    {label:'12:00 am', value:'00:00'},
                    {label:'12:30 am', value:'00:30'},
                    {label:'01:00 am', value:'01:00'},
                    {label:'01:30 am', value:'01:30'},
                    {label:'02:00 am', value:'02:00'},
                    {label:'02:30 am', value:'02:30'},
                    {label:'03:00 am', value:'03:00'},
                    {label:'03:30 am', value:'03:30'},
                    {label:'04:00 am', value:'04:00'},
                    {label:'04:30 am', value:'04:30'},
                    {label:'05:00 am', value:'05:00'},
                    {label:'05:30 am', value:'05:30'}
        ];
        return this.time;
    }
   
    getGradeDropDownList() {
        let gradeList = [  {label:'grade', value:''},
                           {label: 'k', value: 'k'},
                           {label: '1', value: '1'},
                           {label: '2', value: '2'},
                           {label: '3', value: '3'},
                           {label: '4', value: '4'},
                           {label: '5', value: '5'},
                           {label: '6', value: '6'},
                           {label: '7', value: '7'},
                           {label: '8', value: '8'},
                           {label: '9', value: '9'},
                           {label: '10', value: '10'},
                           {label: '11', value: '11'},
                           {label: '12', value: '12'}
                           ];
           return gradeList;                
    }
    getDateTime(date: any, hours: any, minutes: any){ 
      let dateTime: any = moment(date,'MM/DD/YYYY');
      dateTime = new Date(dateTime);
      dateTime.setHours(hours);
      dateTime.setMinutes(minutes);
      dateTime = moment.utc(dateTime).format();
     return dateTime;
     
    }
    
    showModal(modalId: string) {
        console.log(jQuery(modalId));
        jQuery(modalId).modal('show');
        }
    hideModal(modalId: string) {
        jQuery(modalId).modal('hide');
        }
        
}

