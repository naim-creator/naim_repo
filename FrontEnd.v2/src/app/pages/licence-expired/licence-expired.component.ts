import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-licence-expired',
  templateUrl: './licence-expired.component.html',
  styleUrls: ['./licence-expired.component.css']
})
export class LicenceExpiredComponent implements OnInit {


  ngOnInit() {
    sessionStorage.removeItem('token')
  }
}
