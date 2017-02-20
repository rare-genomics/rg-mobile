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
      console.log("Deve setar campos");
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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeddetailsPage');
  }
  saveMedicine(){
    if(this.medId){
      console.log("Deletando item");
      this.deleteMedicine();
    }   
    
    let storage = new Storage();
    storage.get('medicine').then((val) => {
      // let localId = Math.floor(Date.now());
      // if(val != null){
      //   localId = val.length + 1;
      // }
      let currentTodo = {        
        'id' : Math.floor(Date.now()),
        'discription' : this.todo['discription'],
        'dosages' : this.todo['dosages'],
        'datetime' : this.todo['datetime'],
        'alarm' : this.todo['alarm']
      };

    if(val == null){
          val = [currentTodo];
        } else {
          val.push(currentTodo);
        }
        storage.set('medicine', val);      
    });    
    this.navCtrl.pop();    
  }

  deleteMedicineButton(){
    this.deleteMedicine();
    this.navCtrl.pop();
  }

  deleteMedicine(){
    let storage = new Storage();    
    storage.get('medicine').then((val) => {      
      let newArray = [];
      for(let i in val){   
          if(val[i]['id'] != this.medId){            
            newArray.push(val[i]);
          }
      }
      storage.remove('medicine');
      storage.set('medicine', newArray);
    });    
  }
  
  // printa(){
  //   let storage = new Storage();
  //   storage.get('medicine').then((val) => {
  //     console.log(val);
  //   });
  // }
}
