import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teste = {};

  constructor(public service: ServicesService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.teste = [];
    this.service.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.teste = data;
    });
  }

}
