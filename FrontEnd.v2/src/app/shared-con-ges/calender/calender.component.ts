import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {scheduler} from "dhtmlx-scheduler";
import {Worker} from "../../models/Worker";
import {Construction} from "../../models/Construction";
import {CalenderService} from "../../services/calender/calender.service";
import {WorkerService} from "../../services/worker/worker.service";
import {Contactor} from "../../models/Contactor";
import {Activity} from "../../models/Activity";
import {ConstructionService} from "../../services/construction/construction.service";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(private calenderService: CalenderService,
              private workerService: WorkerService,
              private constructionService: ConstructionService) {
  }

  pageNo_tech: number = 0;
  totalPages_tech: number = 0
  companyId: any = '';
  dataLoading: boolean = true;
  public activity: Activity = {
    text: "", end_date: "", start_date: "",
    companyDto: {
      id: "", companyName: "",
      contactorDto: {
        id: "",
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      },
      address: "", contact: ""
    },
    workerDtoList: [],
    constructionDto: {
      id: "", location: "", description: "", companyDto: {
        id: "", companyName: "", contactorDto: {
          id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
          licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
        }, address: "", contact: ""
      }, customerDto: {
        id: "", firstName: "", lastName: "", companyDto: {
          id: "", companyName: "",
          contactorDto: {
            id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
            licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
          }, address: "", contact: ""
        }, phone: "", email: "", address: ""
      }, devisDto: {
        devisRequestDto: {
          id: "",
          phone: "",
          firstName: "",
          lastName: "",
          location: "",
          email: "",
          status: "",
          available_area: 0,
          consumption: 0,
          building_type: "",
          roof_type: "",
          electricity_access: false,
          post_code: "",
          companyDto: {
            id: "", companyName: "", contactorDto: {
              id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
              licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
            }, address: "", contact: ""
          }
        },
        idDevis: "", battery: {totalBattery: 0, quantityBattery: 0, modelBattery: "", priceBattery: 0, tvaBattery: 0},
        cable: {totalCable: 0, modelCable: "", priceCable: 0, tvaCable: 0, quantityCable: 0},
        meter: {totalMeter: 0, modelMeter: "", quantityMeter: 0, priceMeter: 0, tvaMeter: 0},
        systemFixing: {
          totalSystemFixing: 0,
          quantitySystemFixing: 0,
          modelSystemFixing: "",
          priceSystemFixing: 0,
          tvaSystemFixing: 0
        },
        inverter: {totalInverter: 0, quantityInverter: 0, modelInverter: "", priceInverter: 0, tvaInverter: 0},
        solarPanel: {
          totalSolarPanel: 0,
          quantitySolarPanel: 0,
          modelSolarPanel: "",
          priceSolarPanel: 0,
          tvaSolarPanel: 0
        },
        ref: "", date: "", total: 0, about: "",
        companyDto: {
          id: "", companyName: "", contactorDto: {
            id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
            licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
          }, address: "", contact: ""
        }
      }
    }
  }
  constructionList: Array<Construction> = []
  workersList: Array<Worker> = []
  listWorkersSelected: Array<Worker> = []
  activityList: Array<Activity> = []
  constructionLabel: string = "Selectionner un chantier"
  contactor: Contactor = {
    id: "", firstName: "", lastName: "", email: "", phone: "", address: "", licenceDto: {
      id: "", startedAt: "", expiredAt: "", status: ""
    }
  }
  worker: Worker = {
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    profession: "",
    image: "",
    companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }
  }
  construction: Construction = {
    id: "", location: "", description: "", companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, customerDto: {
      id: "", firstName: "", lastName: "", companyDto: {
        id: "", companyName: "",
        contactorDto: {
          id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
          licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
        }, address: "", contact: ""
      }, phone: "", email: "", address: ""
    }, devisDto: {
      devisRequestDto: {
        id: "",
        phone: "",
        firstName: "",
        lastName: "",
        location: "",
        email: "",
        status: "",
        available_area: 0,
        consumption: 0,
        building_type: "",
        roof_type: "",
        electricity_access: false,
        post_code: "",
        companyDto: {
          id: "", companyName: "", contactorDto: {
            id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
            licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
          }, address: "", contact: ""
        }
      },
      idDevis: "", battery: {totalBattery: 0, quantityBattery: 0, modelBattery: "", priceBattery: 0, tvaBattery: 0},
      cable: {totalCable: 0, modelCable: "", priceCable: 0, tvaCable: 0, quantityCable: 0},
      meter: {totalMeter: 0, modelMeter: "", quantityMeter: 0, priceMeter: 0, tvaMeter: 0},
      systemFixing: {
        totalSystemFixing: 0,
        quantitySystemFixing: 0,
        modelSystemFixing: "",
        priceSystemFixing: 0,
        tvaSystemFixing: 0
      },
      inverter: {totalInverter: 0, quantityInverter: 0, modelInverter: "", priceInverter: 0, tvaInverter: 0},
      solarPanel: {
        totalSolarPanel: 0,
        quantitySolarPanel: 0,
        modelSolarPanel: "",
        priceSolarPanel: 0,
        tvaSolarPanel: 0
      },
      ref: "", date: "", total: 0, about: "",
      companyDto: {
        id: "", companyName: "", contactorDto: {
          id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
          licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
        }, address: "", contact: ""
      }
    }
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

  public getConstructionList(pageNo: number, id: any): void {
    this.constructionService.getConstructionList(pageNo, id).subscribe({
      next: (res) => {
        this.constructionList = res.content;
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

  public selectConstruction(construction: Construction): void {
    this.constructionLabel = "Chantier de " + construction.customerDto.firstName + " " + construction.customerDto.lastName
    this.construction = construction;
  }

  public selectWorker(worker: any): void {
    this.activity.workerDtoList.push(worker);
  }

  public removeWorkerFromSelectedList(worker: Worker): void {
    let i: number = 0;
    let deleted: boolean = false
    while (i < this.activity.workerDtoList.length && !deleted) {
      if (this.activity.workerDtoList[i].id === worker.id) {
        this.activity.workerDtoList.splice(i, 1);
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
    this.getConstructionList(0, this.companyId);
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
        this.listWorkersSelected = res.workerDtoList
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
    event.text = `<br>` + "Chantier de " + this.construction.customerDto.firstName + ' ' + this.construction.customerDto.lastName + ' à ' + this.construction.location + `<br>`;
    event.text += "Les technicien :" + `<br>`;
    this.activity.text = event.text;
    this.activity.start_date = event.start_date;
    this.activity.end_date = event.end_date;
    this.activity.workerDtoList = [];
    this.activity.constructionDto = this.construction
    for (let i = 0; i < this.listWorkersSelected.length; i++) {
      this.activity.workerDtoList.push(this.listWorkersSelected[i]);
      this.activity.text += ("- " + this.listWorkersSelected[i].firstName + this.listWorkersSelected[i].lastName + `<br>`)
      event.text += ("- " + this.listWorkersSelected[i].firstName + this.listWorkersSelected[i].lastName + `<br>`)
    }
    this.calenderService.updateCalenderActivity(this.activity).subscribe();
    scheduler.updateEvent(event.id);
  }


  save_form() {
    const ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    scheduler.endLightbox(true, this.custom_form);
    this.activity.constructionDto = this.construction;
    ev.text = `<br>` + "Chantier de " + this.construction.customerDto.firstName + ' ' + this.construction.customerDto.lastName + ' à ' + this.construction.location + `<br>`;
    ev.text += "Les technicien :" + `<br>`;
    this.activity.text = ev.text;
    this.activity.start_date = ev.start_date;
    this.activity.end_date = ev.end_date;
    this.activity.companyDto.id = this.companyId;
    for (let i = 0; i < this.listWorkersSelected.length; i++) {
      this.activity.workerDtoList.push({id: String(this.listWorkersSelected[i].id)});
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
