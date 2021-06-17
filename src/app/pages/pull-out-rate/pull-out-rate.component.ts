import { Component, OnInit } from '@angular/core';
import { Cuy, Death, Pool, Saca, Shed } from 'api/graphql';
import { UserService } from '../user/user.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-pull-out-rate',
  templateUrl: './pull-out-rate.component.html',
  styles: [
  ]
})
export class PullOutRateComponent implements OnInit {

  periodsOfTime = [];
  selectedId: string;
  selectedPeriod: string;
  sheds : Shed[] = [];
  headers: string[] = [];
  cuyes: Cuy[] = [];
  pullsOutData: Saca[] = []
  quantities: number[] = [];
  // Properties of Canvas
  canvas: any;
  ctx;
  barChart = null;
  barChartData = [{
    data: [],
    label: 'sacas',
    backgroundColor: 'rgba(136,232,253,1)'
  }];
  barChartOptions = {
    tooltip: {
      enabled: true
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },

      }],
      yAxes: [{
        gridLines: {
          display: false
        },
      }]
    }
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.sheds().subscribe( (response) => {
      this.sheds = response.data['sheds']['shedList'];
    });
  }

  selectShed(id: string){
    this.periodsOfTime = [];
    this.selectedId = id;
  }

  selectPeriod(period: string){
    this.periodsOfTime = [];
    this.selectedPeriod = period;
  }

  searchPeriodsOfTime(){
    this.periodsOfTime = [];
    this.cuyes = [];
    this.pullsOutData = [];
    this.userService.pullsOutRate(this.selectedId).subscribe(
      ({data}) => {
        let pools: Pool[] = data['getShedByID']['pools']['poolList'];
        pools.forEach( pool => { this.cuyes = this.cuyes.concat(pool.cuys.cuyList); });
        this.cuyes.forEach( cuy => { 
          if(cuy.saca != null){
            this.pullsOutData.push(cuy.saca);
          }
        });
        switch(this.selectedPeriod) {
          case "allYears" : this.deathRateByAllYears();
            break;
          case "allMonths" : this.deathRateByAllMonths();
            break;
          case "month" : this.getMonths();
            break;
          case "year" : this.getYears();
            break;
        }
      }
    );
  }

  getMonths(){
    this.pullsOutData.forEach( saca => {
      let numberOfMonth = (new Date(saca.date).getMonth() + 1).toString();
      let month = numberOfMonth.length == 1 ? '0' + numberOfMonth : numberOfMonth;
      let year = new Date(saca.date).getFullYear().toString();
      let monthOfYear = year + '/' + month;
      if(!this.periodsOfTime.find(e => e == monthOfYear)) {this.periodsOfTime.push(monthOfYear); }
    })
    this.periodsOfTime.sort();
  }

  getYears(){
    this.pullsOutData.forEach( saca => {
      let year = new Date(saca.date).getFullYear().toString();
      if(!this.periodsOfTime.find(e => e == year)){ this.periodsOfTime.push(year); }
    });
    this.periodsOfTime.sort();
  }

  deathRateByAllYears() {
      this.pullsOutData.forEach(saca => {
          let year = new Date(saca.date).getFullYear().toString();
          if (!this.headers.find(e => e == year)) {
              this.headers.push(year);
          }
      });
      this.headers.sort();
      this.headers.forEach(header => {
          this.quantities.push(
              this.pullsOutData.filter(dead => new Date(dead.date).getFullYear().toString() == header).length);
      });
      this.watchStatistics();
  }

  deathRateByAllMonths(){
    this.pullsOutData.forEach( saca => {
      let numberOfMonth = (new Date(saca.date).getMonth() + 1).toString();
      let month = numberOfMonth.length == 1 ? '0' + numberOfMonth : numberOfMonth;
      let year = new Date(saca.date).getFullYear().toString();
      let monthOfYear = year + '/' + month;
      if(!this.headers.find(e => e == monthOfYear)) {this.headers.push(monthOfYear); }
    })
    this.headers.sort();
    this.headers.forEach( header => {
      this.quantities.push(
        this.pullsOutData.filter(saca => {
          let numberOfMonth = (new Date(saca.date).getMonth() + 1).toString();
          let month = numberOfMonth.length == 1 ? '0' + numberOfMonth : numberOfMonth;
          let year = new Date(saca.date).getFullYear().toString();
          let monthOfYear = year + '/' + month;
          return monthOfYear == header;
        }).length)
    });
    this.watchStatistics();
  }

  selectedPeriodOfTime(periodo: string){
    if(periodo.length == 4){ // 
      this.pullsOutData.forEach( saca => {
        let numberOfMonth = (new Date(saca.date).getMonth() + 1).toString();
        let month = numberOfMonth.length == 1 ? '0' + numberOfMonth : numberOfMonth;
        let year = new Date(saca.date).getFullYear().toString();
        let monthOfYear = year + '/' + month;
        if(year == periodo && !this.headers.find(e => e == monthOfYear)){
          this.headers.push(monthOfYear);
        }
      });
      this.headers.sort();
      this.headers.forEach( header => {
        this.quantities.push(
          this.pullsOutData.filter( saca => {
            let numberOfMonth = (new Date(saca.date).getMonth() + 1).toString();
            let month = numberOfMonth.length == 1 ? '0' + numberOfMonth : numberOfMonth;
            let year = new Date(saca.date).getFullYear().toString();
            let monthOfYear = year + '/' + month;
            return monthOfYear == header;
          }).length
        );
      });
    } else if(periodo.length == 7){ // Mes
      this.pullsOutData.forEach( saca => {
        let numberOfDay = (new Date(saca.date)).getDate().toString();
        let day = numberOfDay.length == 1 ? '0' + numberOfDay : numberOfDay;
        let numberOfMonth = (new Date(saca.date).getMonth() + 1).toString();
        let month = numberOfMonth.length == 1 ? '0' + numberOfMonth : numberOfMonth;
        let year = new Date(saca.date).getFullYear().toString();
        let monthOfYear = year + '/' + month;
        if(monthOfYear == periodo && !this.headers.find(e => e == day)){
          this.headers.push(day);
        }
      });
      this.headers.sort();
      this.headers.forEach( header => {
        this.quantities.push(
          this.pullsOutData.filter( saca => {
            let numberOfDay = (new Date(saca.date)).getDate().toString();
            let day = numberOfDay.length == 1 ? '0' + numberOfDay : numberOfDay;
            let numberOfMonth = (new Date(saca.date).getMonth() + 1).toString();
            let month = numberOfMonth.length == 1 ? '0' + numberOfMonth : numberOfMonth;
            let year = new Date(saca.date).getFullYear().toString();
            let monthOfYear = year + '/' + month;
            return (monthOfYear == periodo && day == header);
          }).length
        );
      });
      this.watchStatistics();
    }
  }

  watchStatistics(){
    if(this.barChart != null){
      this.barChart.clear();
    }
    this.barChartData[0].data = this.quantities;
    this.canvas = document.getElementById('pullOutRate');
    this.ctx = this.canvas.getContext('2d');
    this.barChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.headers,
        datasets: this.barChartData
      },
      options: this.barChartOptions
    });
    setTimeout(() => {
      this.barChart.update();
    }, 1000);
  }
}


