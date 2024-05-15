import {Component, OnInit} from '@angular/core';
import {ConstructionService} from "../../services/construction/construction.service";
import {Construction} from "../../models/Construction";

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.css']
})
export class ConstructionComponent implements OnInit {
  constructor(private constructionService: ConstructionService) {
  }

  message: string = "";
  constructionList: Array<Construction> = [];
  pageNo: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  companyId: string = "";

  public getConstructionList(pageNo: number, id: any): void {
    this.constructionService.getConstructionList(pageNo, id).subscribe({
      next: (res) => {
        this.constructionList = res.content;
        console.log(res)
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      }
    })
  }

  public getConstructionFiltered(pageNo: number, id: any, filter: string): void {
    this.constructionService.getConstructionListFiltered(pageNo, id, filter).subscribe({
      next: (res) => {
        this.constructionList = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      }
    })
  }

  ngOnInit() {
    this.getConstructionList(0, sessionStorage.getItem('company') as string);
  }

}
