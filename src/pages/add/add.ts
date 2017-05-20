import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams} from 'ionic-angular';
//import { BirthdayService } from '../../services/birthday.service';
import { Subject } from '../subject/subject';
import { TaskService } from '../../services/task.service';

/**
 * Generated class for the Add page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class Add {
    public task: any = {};
    public isNew = true;
    public action = 'Add';
    public isoDate = '';

 
  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              public navParams: NavParams,
              private taskService: TaskService
              ){
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Add');
    let editTask = this.navParams.get('task');

      /*let editTask = this.navParams.get('task');

        if (editTask) {
            this.task = editTask;
            this.isNew = false;
            this.action = 'Edit';
            this.isoDate = this.task.Date.toISOString().slice(0, 10);}*/
  }

  goBack(){
  	this.navCtrl.pop();
  }


  save() {
        this.task.Date = new Date(this.isoDate);

        if (this.isNew) {
            this.taskService.add(this.task)
                .catch(console.error.bind(console));
        } else {
            this.taskService.update(this.task)
                .catch(console.error.bind(console));
        }

        this.dismiss();
    }
  dismiss() {
    this.viewCtrl.dismiss(this.task);
    }

  /*goSub() {
    this.navCtrl.push(Subject);
  }*/
}