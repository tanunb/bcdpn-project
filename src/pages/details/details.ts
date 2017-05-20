import { Component } from '@angular/core';  
import { NavParams, ViewController, NavController } from 'ionic-angular';  
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {  
    public task: any = {};
    public isNew = true;
    public action = 'Edit';
    public isoDate = '';
    public name = '';
    public category = '';
    public description = '';


    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private taskService: TaskService,
        private navCtrl: NavController) {
    }

    ionViewDidLoad() {
        let editTask = this.navParams.get('task');

        if (editTask) {
            this.task = editTask;
            this.isNew = false;
            this.isoDate = this.task.Date.toISOString().slice(0, 10);
            this.name = this.task.Name
            this.category = this.task.Category
            this.description = this.task.Description
        }
    }

    save() {
        this.task.Date = new Date(this.isoDate);
        this.task.Name = this.name
        this.task.Category = this.category
        this.task.Description = this.description

        if (this.isNew) {
            this.taskService.add(this.task)
                .catch(console.error.bind(console));
        } else {
            this.taskService.update(this.task)
                .catch(console.error.bind(console));
   
        }

        this.dismiss();
    }

    delete() {
        this.taskService.delete(this.task)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.task);
    }

    goBack(){
      this.navCtrl.pop();
    }
}