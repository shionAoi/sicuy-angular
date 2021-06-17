import { Component, OnInit } from '@angular/core';
import { Cuy, Pool, Shed } from 'api/graphql';
import Chart from 'chart.js';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-birth-rate',
  templateUrl: './birth-rate.component.html',
  styleUrls: ['./birth-rate.component.css']
})
export class BirthRateComponent implements OnInit {
  public shedByPeriod = [];
  public galponId : string;
  public period: string;
  public headers: string[] = [];
  public galpones : Shed[] = [];
  public fechas: Cuy[] = [];
  public conteo = [];

  canvas: any;
  ctx;
  barChart = null;
  barChartData = [{
      data: [],
      label: 'nacimientos',
      backgroundColor: 'rgba(155, 238, 177, 1)'
    }
  ];
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
    this.userService.sheds().subscribe((response) =>{
      this.galpones = response.data['sheds']['shedList'];
    });
  }

  selectShed(id: string){
    this.shedByPeriod = [];
    this.galponId = id;
  }

  selectPeriod(periodo: string){
    this.shedByPeriod = [];
    this.period = periodo;
  }

  searchPeriodsOfTime(){
    switch(this.period) {
      case "allYears" : this.birthRateByAllYears();
        break;
      case "allMonths" : this.birthRateByAllMonths();
        break;
      case "month" : this.getMonths();
        break;
      case "year" : this.getYears();
        break;
    }
  }

  getMonths(){
    this.userService.birth_rate(this.galponId).subscribe(
      ({data}) => {
        let pools : Pool[] = data['getShedByID']['pools']['poolList'];
        for(var i = 0; i < pools.length; i++){
          this.fechas = this.fechas.concat(pools[i].cuys.cuyList);
        }
        // Group Months
        this.fechas.forEach(fecha => {
          let mesNumero = (new Date(fecha.birthday_date).getMonth() + 1);
          let month = mesNumero < 10 ? '0' + mesNumero.toString() : mesNumero.toString();
          let year = new Date(fecha.birthday_date).getFullYear();
          let monthOfYear = year.toString() + '/' + month.toString();
          if(!this.shedByPeriod.find(e => e == monthOfYear)){
            this.shedByPeriod.push(monthOfYear);
          }
        });
        this.shedByPeriod.sort();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getYears(){
    this.userService.birth_rate(this.galponId).subscribe(
      ({data}) => {
        let pools : Pool[] = data['getShedByID']['pools']['poolList'];
        for(var i = 0; i < pools.length; i++){
          this.fechas = this.fechas.concat(pools[i].cuys.cuyList);
        }
        // Group Years
        this.fechas.forEach(fecha => {
          let year = new Date(fecha.birthday_date).getFullYear().toString();
          if(!this.shedByPeriod.find(e => e == year)){
            this.shedByPeriod.push(year);
          }
        });
        this.shedByPeriod.sort();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  birthRateByAllYears(){
    this.headers = [];
    this.fechas = [];
    this.conteo = [];
    console.log(this.galponId);
    this.userService.birth_rate(this.galponId).subscribe(
      ({data}) => {
        let pools : Pool[] = data['getShedByID']['pools']['poolList'];
        for(var i = 0; i < pools.length; i++){
          this.fechas = this.fechas.concat(pools[i].cuys.cuyList);
        }
        // Group Years
        this.fechas.forEach(fecha => {
          let year = new Date(fecha.birthday_date).getFullYear().toString();
          if(!this.headers.find(e => e == year)){
            this.headers.push(year);
          }
        });
        this.headers.sort();
        // Count Data
        for(var i= 0; i < this.headers.length; i++){
          this.conteo.push(this.fechas.filter(x => {
            let year = new Date(x.birthday_date).getFullYear().toString();
            return year == this.headers[i];
          }).length);
        }
        this.watchStatistics();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  birthRateByAllMonths(){
    this.headers = [];
    this.fechas = [];
    this.conteo = [];
    this.userService.birth_rate(this.galponId).subscribe(
      ({data}) => {
        let pools : Pool[] = data['getShedByID']['pools']['poolList'];
        for(var i = 0; i < pools.length; i++){
          this.fechas = this.fechas.concat(pools[i].cuys.cuyList);
        }
        // Group Months
        this.fechas.forEach(fecha => {
          let mesNumero = (new Date(fecha.birthday_date).getMonth() + 1);
          let month = mesNumero < 10 ? '0' + mesNumero.toString() : mesNumero.toString();
          let year = new Date(fecha.birthday_date).getFullYear();
          let monthOfYear = year.toString() + '/' + month.toString();
          if(!this.headers.find(e => e == monthOfYear)){
            this.headers.push(monthOfYear);
          }
        });
        this.headers.sort();
        // Count Data
        for(var i= 0; i < this.headers.length; i++){
          this.conteo.push(this.fechas.filter(x => {
            let mesNumero = (new Date(x.birthday_date).getMonth() + 1);
            let month = mesNumero < 10 ? '0' + mesNumero.toString() : mesNumero.toString();
            let year = new Date(x.birthday_date).getFullYear();
            let monthOfYear = year.toString() + '/' + month.toString();
            return monthOfYear == this.headers[i];
          }).length);
        }
        this.watchStatistics();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectedPeriodOfTime(periodo: string){
    if(periodo.length == 4){ // Año
      this.headers = [];
      this.fechas = [];
      this.conteo = [];
      this.userService.birth_rate(this.galponId).subscribe(
        ({data}) => {
          let pools : Pool[] = data['getShedByID']['pools']['poolList'];
          for(var i = 0; i < pools.length; i++){
            this.fechas = this.fechas.concat(pools[i].cuys.cuyList);
          }
          // Group Months
          this.fechas.forEach(fecha => {
            let mesNumero = (new Date(fecha.birthday_date).getMonth() + 1);
            let month = mesNumero < 10 ? '0' + mesNumero.toString() : mesNumero.toString();
            let year = new Date(fecha.birthday_date).getFullYear();
            let monthOfYear = year.toString() + '/' + month.toString();
            if(year.toString() == periodo && !this.headers.find(e => e == monthOfYear)){
              this.headers.push(monthOfYear);
            }
          });
          this.headers.sort();
          // Count Data
          for(var i= 0; i < this.headers.length; i++){
            this.conteo.push(this.fechas.filter(x => {
              let mesNumero = (new Date(x.birthday_date).getMonth() + 1);
              let month = mesNumero < 10 ? '0' + mesNumero.toString() : mesNumero.toString();
              let year = new Date(x.birthday_date).getFullYear();
              let monthOfYear = year.toString() + '/' + month.toString();
              return monthOfYear == this.headers[i];
            }).length);
          }
          this.watchStatistics();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if(periodo.length == 7){ // Mes
      this.headers = [];
      this.fechas = [];
      this.conteo = [];
      this.userService.birth_rate(this.galponId).subscribe(
        ({data}) => {
          let pools : Pool[] = data['getShedByID']['pools']['poolList'];
          for(var i = 0; i < pools.length; i++){
            this.fechas = this.fechas.concat(pools[i].cuys.cuyList);
          }
          // Group Months
          this.fechas.forEach(fecha => {
            let numberOfDay = (new Date(fecha.birthday_date)).getDate().toString();
            let dia = numberOfDay.length == 1 ? '0' + numberOfDay : numberOfDay;
            let mesNumero = (new Date(fecha.birthday_date).getMonth() + 1);
            let month = mesNumero < 10 ? '0' + mesNumero.toString() : mesNumero.toString();
            let year = new Date(fecha.birthday_date).getFullYear();
            let monthOfYear = year.toString() + '/' + month.toString();
            if(monthOfYear.toString() == periodo && !this.headers.find(e => e == dia)){
              this.headers.push(dia);
            }
          });
          this.headers.sort();
          // Count Data
          for(var i= 0; i < this.headers.length; i++){
            this.conteo.push(this.fechas.filter(x => {
              let numberOfDay = (new Date(x.birthday_date)).getDate().toString();
              let dia = numberOfDay.length == 1 ? '0' + numberOfDay : numberOfDay;
              let mesNumero = (new Date(x.birthday_date).getMonth() + 1);
              let month = mesNumero < 10 ? '0' + mesNumero.toString() : mesNumero.toString();
              let year = new Date(x.birthday_date).getFullYear();
              let monthOfYear = year.toString() + '/' + month.toString();
              return (monthOfYear == periodo && dia == this.headers[i]);
            }).length);
          }
          this.watchStatistics();
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  watchStatistics(){
    if(this.barChart != null){
      this.barChart.clear();
    }
    this.barChartData[0].data = this.conteo;
    this.canvas = document.getElementById('birthRateChart');
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
