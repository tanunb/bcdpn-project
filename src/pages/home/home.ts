import { Component, NgZone } from "@angular/core";  
import { ModalController, NavController, Platform } from 'ionic-angular';  
import { TaskService } from '../../services/task.service';  
import { DetailsPage } from '../details/details';  
import { IonicPage, NavParams} from 'ionic-angular';
import { Add } from '../../pages/add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
    public tasks = [];

    constructor(private taskService: TaskService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController) {

    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.taskService.initDB();

            this.taskService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.tasks = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }

    showDetail(task) {
        let modal = this.modalCtrl.create(DetailsPage, { task: task });
        modal.present();
    }

    goToAdd(){
        this.nav.push(Add);
    }

}