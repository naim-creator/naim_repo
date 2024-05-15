import {Component} from '@angular/core';
import {SupplierService} from "../../services/supplier/supplier.service";
import {Supplier} from "../../models/supplier";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  constructor(private supplierService: SupplierService) {
  }

  supplierList: Array<Supplier> = [];
  sh: string = ""
  errorMessage: string = ""
  goodRequest: boolean = false
  pageNo: number = 0
  totalPages: number = 0
  dataExist: boolean = false
  filteredData: boolean = false
  dataLoading: boolean = false;
  companyId: string = ""
  supplier: Supplier = {
    id: "", firstName: "", lastName: "", supplierCompanyName: "", phone: "", email: "", companyDto: {
      id: "", companyName: "", contactorDto: {
        id: "", firstName: "", lastName: "", address: "", email: "", phone: "",
        licenceDto: {id: "", status: "", expiredAt: "", startedAt: ""}
      }, address: "", contact: ""
    }
  }

  public getSuppliersByCompany(pageNo: number): void {
    this.dataLoading = true;
    this.supplierService.getSuppliersByCompany(pageNo, this.companyId).subscribe({
      next: (res) => {
        this.supplierList = res.content
        this.totalPages = res.totalPages
        this.dataExist = res.content.length != 0
        this.dataLoading = false;
      }
    })
  }

  public getSuppliersByCompanyFiltered(pageNo: number): void {
    this.dataLoading = true;
    this.supplierService.getSuppliersByCompanyFiltered(pageNo, this.companyId, this.sh).subscribe({
      next: (res) => {
        this.supplierList = res.content
        this.totalPages = res.totalPages
        this.filteredData = res.content.length = !0
        this.dataLoading = false;
      }
    })
  }

  public updateSupplierByCompany(): void {
    this.supplierService.updateSupplierByCompany(this.supplier).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.errorMessage = "fournisseur a été modifier"
          this.goodRequest = true
          this.getSuppliersByCompany(0)
        } else {
          this.getSuppliersByCompany(0)
          this.goodRequest = false
          this.errorMessage = "Un erreur a été servenu"
        }
      }
    })
  }

  public deleteSupplierByCompany(): void {
    this.supplierService.deleteSupplierByCompany(this.supplier.id).subscribe({
      error: (err) => {
        if (err.status === 200) {
          this.getSuppliersByCompany(0)
        } else {
          this.errorMessage = "Un erreur a été servenu";
        }
      }
    })
  }

  public nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo += 1
      if (!this.filteredData) {
        this.getSuppliersByCompany(this.pageNo)
      } else {
        this.getSuppliersByCompanyFiltered(this.pageNo)
      }
    } else {
      this.pageNo = 0
      if (!this.filteredData) {
        this.getSuppliersByCompany(this.pageNo)
      } else {
        this.getSuppliersByCompanyFiltered(this.pageNo)
      }
    }
  }

  public previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo -= 1
      if (!this.filteredData) {
        this.getSuppliersByCompany(this.pageNo);
      } else {
        this.getSuppliersByCompanyFiltered(this.pageNo);
      }
    } else {
      this.pageNo = this.totalPages - 1
      if (!this.filteredData) {
        this.getSuppliersByCompany(this.pageNo);
      } else {
        this.getSuppliersByCompanyFiltered(this.pageNo);
      }
    }
  }

  public selectSupplier(supplier: Supplier): void {
    this.supplier = supplier;
  }

  public search(): void {
    this.getSuppliersByCompanyFiltered(0)
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('company') as string;
    this.getSuppliersByCompany(0)
  }
}
