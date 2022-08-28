import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import NineBoxData from './data/nine-box-data';
import { StatusNineBox } from './data/status-nine-box.enum';
import UserData from './data/user-data';

@Component({
  selector: 'app-nine-box-chart',
  templateUrl: './nine-box-chart.component.html',
  styleUrls: ['./nine-box-chart.component.css']
})
export class NineBoxChartComponent implements OnInit {

  model: Array<NineBoxData>;
  userDataPopup: UserData;
  nivelPopup: string;
  count: number;

  @ViewChild('userSpanCompId') userSpanCompId: HTMLElement;

  constructor() {
    this.model = [];
    this.userDataPopup = new UserData();
    this.nivelPopup = '';
  }

  ngOnInit(): void {
    this.model = this.loadData();
  }

  onSelectUser(popover: NgbPopover, userDataTemp: UserData, nivel: string, index: number) {
    if (index > 4) {

    } else {
      this.userDataPopup = userDataTemp;
      this.nivelPopup = nivel;
      popover.open();
    }
  }

  onClosePopover(popover: NgbPopover) {
    popover.close();
  }

  onCleanUserObject() {
    this.userDataPopup = new UserData();
    this.nivelPopup = '';
  }

  private loadData(): Array<NineBoxData> {
    return [
      {
        color: '#CFE2F3',
        status: StatusNineBox.A1,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: 'https://lh3.googleusercontent.com/a-/AFdZucpod9jta5TZSY0jTGuMyTgeb9kJIJlhKM6CrqqEWJU=s96-c'
          },
          {
            name: 'Ana Cristina Calegari',
            picture: ''
          },
          {
            name: 'Vanessa Suzuki',
            picture: ''
          },
          {
            name: 'Osni Mendes',
            picture: ''
          },
          {
            name: 'Danyel Reis',
            picture: ''
          },
          {
            name: 'Giovane Alves de Oliveira',
            picture: ''
          },
          {
            name: 'Lilian Cristina Peixer',
            picture: ''
          },
          {
            name: 'Danielle Harue',
            picture: ''
          }
        ]
      },
      {
        color: '#B6D7A8',
        status: StatusNineBox.A2,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      },
      {
        color: '#93C47D',
        status: StatusNineBox.A3,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      },
      {
        color: '#EA9999',
        status: StatusNineBox.B1,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      },
      {
        color: '#CFE2F3',
        status: StatusNineBox.B2,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      },
      {
        color: '#B6D7A8',
        status: StatusNineBox.B3,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      },
      {
        color: '#E06666',
        status: StatusNineBox.C1,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      },
      {
        color: '#EA9999',
        status: StatusNineBox.C2,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      },
      {
        color: '#CFE2F3',
        status: StatusNineBox.C3,
        percentage: 15,
        value: 3,
        totalUsers: 8,
        users: [
          {
            name: 'Thiago Gonçalves dos Santos',
            picture: ''
          }
        ]
      }
    ];
  }

}
