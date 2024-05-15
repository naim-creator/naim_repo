import {Component, OnInit} from '@angular/core';
import {Construction} from "../../models/Construction";
import {ConstructionService} from "../../services/construction/construction.service";
import {Router} from "@angular/router";
import {CustomerService} from "../../services/customer/customer.service";
import {Customer} from "../../models/Customer";
import {Devis} from "../../models/Devis";

@Component({
  selector: 'app-new-construction',
  templateUrl: './new-construction.component.html',
  styleUrls: ['./new-construction.component.css']
})
export class NewConstructionComponent implements OnInit {

  constructor(private constructionService: ConstructionService,
              private route: Router,
              private customerService: CustomerService) {
  }

  labelListClient: string = "choisir un client"
  customersList: Array<Customer> = []
  devis: any;
  companyId: string = "";
  construction: Construction = {
    description: "", location: "", companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }, customerDto: {
      id: "", address: "", email: "", phone: "", companyDto: {
        id: "", companyName: "", contactorDto: {
          id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
          licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
        }, address: "", contact: ""
      }, lastName: "", firstName: ""
    }, devisDto: {
      idDevis: "",
      date: "", ref: "", about: "",
      companyDto: {
        id: "", companyName: "", contactorDto: {
          id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
          licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
        }, address: "", contact: ""
      },
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
      battery: {modelBattery: "", priceBattery: 0, quantityBattery: 0, totalBattery: 0, tvaBattery: 0},
      cable: {modelCable: "", priceCable: 0, quantityCable: 0, totalCable: 0, tvaCable: 0},
      meter: {modelMeter: "", priceMeter: 0, quantityMeter: 0, totalMeter: 0, tvaMeter: 0},
      inverter: {modelInverter: "", priceInverter: 0, quantityInverter: 0, totalInverter: 0, tvaInverter: 0},
      solarPanel: {
        modelSolarPanel: "",
        priceSolarPanel: 0,
        quantitySolarPanel: 0,
        totalSolarPanel: 0,
        tvaSolarPanel: 0
      },
      systemFixing: {
        modelSystemFixing: "",
        priceSystemFixing: 0,
        quantitySystemFixing: 0,
        totalSystemFixing: 0,
        tvaSystemFixing: 0
      },
      total: 0
    }
  }
  customerId: string = ""
  validLocation: boolean = true;
  validCustomer: boolean = true;

  public checkValidLocation(): void {
    this.validLocation = this.construction.location !== "";
  }

  public checkValidCustomer(): void {
    this.validCustomer = this.customerId !== "";
  }

  public saveConstruction(): void {
    this.checkValidLocation();
    this.checkValidCustomer();
    if (this.validCustomer && this.validLocation) {
      this.construction.companyDto.id = this.companyId;
      this.construction.devisDto.idDevis = this.devis.idDevis;
      this.construction.customerDto.id = this.customerId;
      this.constructionService.saveConstruction(this.construction).subscribe({
        next: (res) => {
        }, error: (err) => {
          if (err.status === 200) {
            this.route.navigate(['contactor/construction']).then(r => sessionStorage.setItem('message', 'chantier a été enregistrer'));
          }
        }
      })
    }
  }

  public getCustomerList(id: any): void {
    this.customerService.getCustomersList(id, 0).subscribe({
      next: (res) => {
        this.customersList = res.content;
      }
    })
  }

  public selectCustomer(customer: Customer): void {
    this.customerId = customer.id;
    this.labelListClient = customer.firstName + " " + customer.lastName
  }

  ngOnInit() {
    this.devis = JSON.parse(sessionStorage.getItem('devis') as string);
    this.companyId = sessionStorage.getItem('company') as string;
    this.getCustomerList(sessionStorage.getItem('company') as string);
  }
}
