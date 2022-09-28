import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @Input() profile: string;

  @Input() axisX: number;

  @Input() axisY: number;

  @Input() users: Array<any>;

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
  }

  reloadData(user: any, x: number, y: number) {
    this.users = user;
    this.axisX = x;
    this.axisY = y;
    this.model = this.loadData();
  }

  onSelectUser(popover: NgbPopover, userDataTemp: UserData, nivel: string, index: number) {
    if (index > 3) {
      // abrir menu
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

  formatValue(value: number): string {
    return Number(value).toFixed(1);
  }

  private loadData(): Array<NineBoxData> {
    const object = [
      {
        color: '#CFE2F3',
        colorTitle: '#3f64da',
        title: 'Alto potencial e baixo desempenho (profissional enigma)',
        status: StatusNineBox.A1,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#B6D7A8',
        colorTitle: '#52b64e',
        title: 'Alto potencial e desempenho esperado (forte desempenho)',
        status: StatusNineBox.A2,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#B6D7A8',
        colorTitle: '#52b64e',
        status: StatusNineBox.A3,
        title: 'Alto potencial e desempenho acima do esperado (alto potencial)',
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#EA9999',
        colorTitle: '#db0000',
        title: 'Potencial mediano e baixo desempenho (questionável)',
        status: StatusNineBox.B1,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#CFE2F3',
        colorTitle: '#3f64da',
        title: 'Potencial e desempenho em nível mediano (mantenedor)',
        status: StatusNineBox.B2,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#B6D7A8',
        colorTitle: '#52b64e',
        title: 'Potencial mediano e desempenho acima do esperado (forte desempenho)',
        status: StatusNineBox.B3,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#EA9999',
        colorTitle: '#db0000',
        title: 'Potencial baixo e desempenho abaixo do esperado (insuficiente)',
        status: StatusNineBox.C1,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#EA9999',
        colorTitle: '#db0000',
        title: 'Baixo potencial mas atinge o desempenho esperado (eficaz)',
        status: StatusNineBox.C2,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      },
      {
        color: '#CFE2F3',
        colorTitle: '#3f64da',
        title: 'Baixo potencial e desempenho acima do esperado (comprometido)',
        status: StatusNineBox.C3,
        percentage: 0,
        value: 0,
        totalUsers: 0,
        users: []
      }
    ];
    
    if (this.profile === 'user-profile') {
      if (this.axisX > 0 && this.axisY > 0) {
        const status = NineBoxChartComponent.calcAxis(this.axisX, this.axisY);
        const box = object.find((el:any) => el.status === status);
        box.users.push(this.users[0]);
      }
    } else {
      this.users.forEach((user: any) => {
        const status = NineBoxChartComponent.calcAxis(user.x, user.y);
        const box = object.find((el:any) => el.status === status);
        box.value += 1; 
        box.users.push(user);
      });

      object.forEach((o: any) => {
        if (o.users.length > 0)
          o.percentage = (o.users.length * 100) / this.users.length;
        else
          o.percentage = 0;
      });
    }

    return object;
  }

  static calcAxis(x: number, y: number): string {
    if (x >= 1 && x < 2 && y >= 1 && y < 2) return StatusNineBox.C1;
    else if (x >= 2 && x < 3 && y >= 1 && y < 2) return StatusNineBox.C2;
    else if (x >= 3 && x < 4 && y >= 1 && y < 2) return StatusNineBox.C3;
    else if (x >= 1 && x < 2 && y >= 2 && y < 3) return StatusNineBox.B1;
    else if (x >= 2 && x < 3 && y >= 2 && y < 3) return StatusNineBox.B2;
    else if (x >= 3 && x < 4 && y >= 2 && y < 3) return StatusNineBox.B3;
    else if (x >= 1 && x < 2 && y >= 3 && y < 4) return StatusNineBox.A1;
    else if (x >= 2 && x < 3 && y >= 3 && y < 4) return StatusNineBox.A2;
    else if (x >= 3 && x < 4 && y >= 3 && y < 4) return StatusNineBox.A3;
    else return '';
  }

}
