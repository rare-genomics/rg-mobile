import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from 'ionic-native';
/*
  Generated class for the Meddetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-meddetails',
  templateUrl: 'meddetails.html',
  providers: [Storage]
})

export class MeddetailsPage {
  medId;
  todo = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage, public params:NavParams) {
    if(params.get("medId") != null){
      this.medId = params.get("medId");
      let storage = new Storage();   
      storage.get('medicine').then((val) => {      
        for(let i in val){   
          if(val[i]['id'] == params.get("medId")){
            this.todo['description'] = val[i]['description'];
            this.todo['dosages'] = val[i]['dosages'];
            this.todo['datetime'] = val[i]['datetime'];
            this.todo['alarm'] = val[i]['alarm'];
          }
        }
      });
    }
  }
  
  saveMedicine(){
    let storage = new Storage();
    storage.get('medicine').then((val) => {
     if(this.medId){
        for(let i in val){               
            if(val[i]['id'] == this.medId){            
              val[i]['description'] = this.todo['description'];
              val[i]['dosages'] = this.todo['dosages'];
              val[i]['datetime'] = this.todo['datetime'];
              val[i]['alarm'] = this.todo['alarm'];              
              break;
            }
        }
      } else {
        let currentTodo = {        
          'id' : Math.floor(Date.now()),
          'description' : this.todo['description'],
          'dosages' : this.todo['dosages'],
          'datetime' : this.todo['datetime'],
          'alarm' : this.todo['alarm']
        };
        if(val == null){
          let objt = [];
          objt.push(currentTodo);
          val = objt;
        } else {
          val.push(currentTodo);
        }
     }
     storage.set('medicine', val);
    });        
    this.navCtrl.pop();    
  }

  deleteMedicine(){
    let storage = new Storage();    
    storage.get('medicine').then((val) => {      
      let arraySlice = [];
      for(let i in val){   
          if(val[i]['id'] != this.medId){ 
            arraySlice.push(val[i]);      
          }
      }      
      storage.set('medicine', arraySlice);
    });
    this.navCtrl.pop();    
  }

  addNotification(){
    // LocalNotifications.schedule({
    //   id: 1,
    //   text: 'Single ILocalNotification',
    //   sound: 'file://sound.mp3',
    //   data: { secret: "teste" }
    // });
var now             = new Date().getTime(),
    _5_sec_from_now = new Date(now + 60*1000);
    LocalNotifications.schedule({
    text: "Delayed Notification 2",
    at: _5_sec_from_now,    
    led: "FF0000",
    // sound: 'file://alarm_bell.mp3'
    sound: 'file://assets/images/alarm_bell.mp3'
});
  }
  
}
