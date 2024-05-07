import {Component, OnInit} from '@angular/core';
import {SolarPanelService} from "../../services/solar-panel/solar-panel.service";
import {Contactor} from "../../models/Contactor";
import {Supplier} from "../../models/supplier";
import {SupplierService} from "../../services/supplier/supplier.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit{

  constructor(private supplierService:SupplierService,
              private route:Router) {}
  errorMessage: string = "";
  companyId: string = "";

  contactor: Contactor = {
    email: "", phone: "", firstName: "", lastName: "", address: "", company: {id: ""}
  }

  supplier:Supplier={
    id:"", firstName:"", lastName:"", SupplierCompanyName:"", phone:"", email:"",company:{id:""}
  }

  public saveSupplier(): void {
    this.supplier.company.id=this.companyId
    this.supplierService.addSupplier(this.supplier).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.route.navigate(['contactor/supplier']).then(r => console.log(r))
        }
      }
    })

  }
  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
  }
}
