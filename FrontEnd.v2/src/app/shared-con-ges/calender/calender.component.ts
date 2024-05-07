import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {scheduler} from "dhtmlx-scheduler";
import {Worker} from "../../models/Worker";
import {Construction} from "../../models/Construction";
import {CalenderService} from "../../services/calender/calender.service";
import {WorkerService} from "../../services/worker/worker.service";
import {Contactor} from "../../models/Contactor";
import {Activity} from "../../models/Activity";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(private calenderService: CalenderService,
              private workerService: WorkerService) {
  }

  pageNo_tech: number = 0;
  totalPages_tech: number = 0
  companyId: any = '';
  dataLoading: boolean = true;
  public activity: Activity = {
    text: "", end_date: "", start_date: "", company: {id: ""}, workers: []
  }
  constructionList: Array<Construction> = []
  workersList: Array<Worker> = []
  listWorkersSelected: Array<Worker> = []
  activityList: Array<Activity> = []
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", company: null
  }
  worker: Worker = {
    id: "", firstName: "", lastName: "", address: "", email: "", phone: "", profession: "", image: "", company: {id: ""}
  }

  @ViewChild("scheduler_here", {static: true}) schedulerContainer !: ElementRef;
  custom_form: any = document.getElementById("custom_form");

  public getCalender(id: any): void {
    this.calenderService.getCalender(id).subscribe({
      next: (res) => {
        this.activityList = res;
        scheduler.parse(res);
        this.dataLoading = false;
      }
    })
  }

  public getWorkerTechList(pageNo: number, id: any): void {
    this.workerService.getWorkersListByProfession(pageNo, id, "TECHNICIEN").subscribe({
      next: (res) => {
        this.workersList = res.content;
        this.totalPages_tech = res.totalPages;
      }
    })
  }

  public selectWorker(worker: Worker): void {
    this.listWorkersSelected.push(worker);
  }

  public removeWorkerFromSelectedList(worker: Worker): void {
    let i: number = 0;
    let deleted: boolean = false
    while (i < this.activity.workers.length && !deleted) {
      if (this.activity.workers[i].id === worker.id) {
        this.listWorkersSelected.splice(i, 1);
        deleted = true
      }
      i++;
    }
  }

  ngOnInit() {
    const custom_form: any = document.getElementById("custom_form");
    this.companyId = sessionStorage.getItem('company') as string;
    this.getCalender(this.companyId)
    this.getWorkerTechList(0, this.companyId);
    scheduler.config.date_format = "%Y-%m-%d %H:%i";
    scheduler.i18n.setLocale("fr");
    scheduler.init(this.schedulerContainer.nativeElement, new Date());

    scheduler.showLightbox = (id) => {
      scheduler.startLightbox(id, custom_form);
    }
    scheduler.attachEvent("onDragEnd", (id) => {
      this.update_Event_Dragged(id)
    });

    scheduler.attachEvent("onEventDeleted", (id) => {
      this.delete_Event(id);
    });

    scheduler.attachEvent('onDblClick', (id) => {
      this.open_Event(id)
    })
  }

  public open_Event(id: any): void {
    const custom_form_update: any = document.getElementById("custom_form_update");
    scheduler.startLightbox(id, custom_form_update);
    this.calenderService.getActivityById(id).subscribe({
      next: (res) => {
        this.listWorkersSelected = res.workers
        this.activity = res
      }
    })
  }

  public delete_Event(id: any): void {
    this.calenderService.deleteCalenderActivity(id).subscribe({
      error: (err) => {
        console.log(err)
      }
    })
  }

  public update_Event_Dragged(id: any): void {
    const event = scheduler.getEvent(id);
    this.calenderService.getCalenderActivity(id).subscribe({
      next: (res) => {
        this.activity = res;
        if (res) {
          this.activity.start_date = event.start_date;
          this.activity.end_date = event.end_date;
          this.calenderService.updateCalenderActivity(this.activity).subscribe();
        }
      }
    })
  }

  public update_Event(): void {
    const event = scheduler.getEvent(scheduler.getState().lightbox_id);
    scheduler.endLightbox(true, this.custom_form);
    event.text = "Chantier :" + `<br>`;
    event.text += "Les technicien :" + `<br>`;
    this.activity.text = event.text;
    this.activity.start_date = event.start_date;
    this.activity.end_date = event.end_date;
    this.activity.workers = [];
    for (let i = 0; i < this.listWorkersSelected.length; i++) {
      this.activity.workers.push({id: String(this.listWorkersSelected[i].id)});
      this.activity.text += ("- " + this.listWorkersSelected[i].firstName + this.listWorkersSelected[i].lastName + `<br>`)
      event.text += ("- " + this.listWorkersSelected[i].firstName + this.listWorkersSelected[i].lastName + `<br>`)
    }
    this.calenderService.updateCalenderActivity(this.activity).subscribe();
    scheduler.updateEvent(event.id);
  }


  save_form() {
    const ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    scheduler.endLightbox(true, this.custom_form);
    ev.text = "Chantier :" + `<br>`;
    ev.text += "Les technicien :" + `<br>`;
    this.activity.text = ev.text;
    this.activity.start_date = ev.start_date;
    this.activity.end_date = ev.end_date;
    this.activity.company.id = this.companyId;
    for (let i = 0; i < this.listWorkersSelected.length; i++) {
      this.activity.workers.push({id: String(this.listWorkersSelected[i].id)});
      this.activity.text += ("- " + this.listWorkersSelected[i].firstName + this.listWorkersSelected[i].lastName + `<br>`);
      ev.text += ("- " + this.listWorkersSelected[i].firstName + this.listWorkersSelected[i].lastName + `<br>`);
    }
    scheduler.updateEvent(ev.id);
    this.calenderService.addCalenderActivity(this.activity).subscribe();
  }

  close_form() {
    scheduler.endLightbox(false, this.custom_form);
    this.listWorkersSelected = []
  }

  public next_page_tech(): void {
    if (this.pageNo_tech < this.totalPages_tech - 1) {
      this.pageNo_tech += 1
      this.getWorkerTechList(this.pageNo_tech, this.companyId)
    } else {
      this.pageNo_tech = 0
      this.getWorkerTechList(this.pageNo_tech, this.companyId)
    }
  }

  public previous_page_tech(): void {
    if (this.pageNo_tech > 0) {
      this.pageNo_tech -= 1
      this.getWorkerTechList(this.pageNo_tech, this.companyId)
    } else {
      this.pageNo_tech = this.totalPages_tech - 1
      this.getWorkerTechList(this.pageNo_tech, this.companyId)
    }
  }


}
