import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
            this.todo['discription'] = val[i]['discription'];
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
              val[i]['discription'] = this.todo['discription'];
              val[i]['dosages'] = this.todo['dosages'];
              val[i]['datetime'] = this.todo['datetime'];
              val[i]['alarm'] = this.todo['alarm'];              
              break;
            }
        }
      } else {
        let currentTodo = {        
          'id' : Math.floor(Date.now()),
          'discription' : this.todo['discription'],
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
      let countLocal = 0;
      for(let i in val){   
          if(val[i]['id'] != this.medId){ 
            arraySlice.push(val[i]);      
          }
      }      
      storage.set('medicine', arraySlice);
    });
    this.navCtrl.pop();    
  }
}
