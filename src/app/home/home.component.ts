import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teste = {};

  constructor(public service: ServicesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getProducts();
  }

  getProducts() {
    this.teste = [];
    this.service.getProducts().subscribe((data: {}) => {
      this.spinner.hide();
      console.log(data);
      this.teste = data;
    }, (error: {}) => {
      console.log(error);
      this.spinner.hide();
    });
  }

}
