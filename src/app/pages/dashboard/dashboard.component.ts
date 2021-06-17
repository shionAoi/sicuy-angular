import {Component, OnDestroy, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {ROUTES} from '../../sidebar/sidebar.component';
import {Subject, Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {DashboardService} from './services/dashboard.service';
import {UserStore} from '../../services/user.store';
import {User} from '../../../api/graphql';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

    private shedSubscription: Subscription;
    private poolSubscription: Subscription;
    private cuySubscription: Subscription;
    private statisticsSubscription: Subscription;
    private listTitles: any[];
    location: Location;
    private unsubscribe$ = new Subject<void>();
    user: User;

    shed1: CategoryValuesModel = {
        name: 'GALPONES',
        icon: 'nc-box',
        leftTitle: 'Activos',
        leftValue: 0,
        rightTitle: 'Desactivados',
        rightValue: 0,
        iconColor: 'text-success'
    }
    shed2: CategoryValuesModel = {
        name: 'POZAS',
        icon: 'nc-money-coins',
        leftTitle: 'Activos',
        leftValue: 0,
        rightTitle: 'Desactivados',
        rightValue: 0,
        iconColor: 'text-warning'
    }
    shed3: CategoryValuesModel = {
        name: 'CUYES',
        icon: 'nc-vector',
        leftTitle: 'Activos',
        leftValue: 0,
        rightTitle: 'Desactivados',
        rightValue: 0,
        iconColor: 'text-danger'
    }

    canvas: any;
    canvasPie;
    ctx;
    ctxPie;
    chartColor: string;
    barChart;
    barPie;

    barChartLabels = [];
    barChartData = [
        {
            data: [],
            label: 'vivos',
            backgroundColor: 'rgba(155, 238, 177, 1)'
        },
        {
            data: [],
            label: 'muertos',
            backgroundColor: 'rgba(248,152,145,1)'
        },
        {
            data: [],
            label: 'saca',
            backgroundColor: 'rgba(136,232,253,1)'
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

    barPieLabel = ['vivos', 'muertos', 'saca'];

    pieChartData = [
        {
            data: [],
            backgroundColor: [
                'rgba(155, 238, 177, 1)',
                'rgba(248,152,145,1)',
                'rgba(136,232,253,1)'
            ]
        }
    ];

    pieChartOptions = {
        responsive: true,
        legend: {
            position: 'bottom'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    constructor(
        location: Location,
        private userStore: UserStore,
        private dashboardService: DashboardService
    ) {
        this.location = location;
        this.userStore.user$
            .subscribe((user) => {
                this.user = user
            })
    }

    getTitle() {
        let title = this.location.prepareExternalUrl(this.location.path());
        if (title.charAt(0) === '#') {
            title = title.slice(1);
        }
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === title) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        if (this.user.accessLifeCycle.active) {
            this.shedSubscription = this.dashboardService.getShedsFilter(true)
                .pipe().subscribe((shedPage) => {
                    this.shed1.leftValue = shedPage.totalNumSheds;
                });
            this.poolSubscription = this.dashboardService.getPoolsFilter(true)
                .pipe().subscribe((poolPage) => {
                    this.shed2.leftValue = poolPage.totalNumPools;
                });
            this.cuySubscription = this.dashboardService.getCuysFilter(true)
                .pipe().subscribe((cuyPage) => {
                    this.shed3.leftValue = cuyPage.totalNumCuys;
                });
        }
        if (this.user.accessLifeCycle.inactive) {
            this.shedSubscription = this.dashboardService.getShedsFilter(false)
                .pipe().subscribe((shedPage) => {
                    this.shed1.rightValue = shedPage.totalNumSheds;
                });

            this.poolSubscription = this.dashboardService.getPoolsFilter(false)
                .pipe().subscribe((poolPage) => {
                    this.shed2.rightValue = poolPage.totalNumPools;
                });

            this.cuySubscription = this.dashboardService.getCuysFilter(false)
                .pipe().subscribe((cuyPage) => {
                    this.shed3.rightValue = cuyPage.totalNumCuys;
                });
        }

        this.statisticsSubscription = this.dashboardService.getStatisticsTable()
            .pipe().subscribe((statisticPage) => {
                let life, dead, saca
                life = dead = saca = 0
                statisticPage.forEach(element => {
                    this.barChartLabels.push(element.name);
                    this.barChartData[0].data.push(element.alive_cuys);
                    life += element.alive_cuys;
                    this.barChartData[1].data.push(element.dead_cuys);
                    dead += element.dead_cuys;
                    this.barChartData[2].data.push(element.saca_cuys);
                    saca += element.saca_cuys;
                });
                this.pieChartData[0].data.push(life, dead, saca);
            });

        this.canvas = document.getElementById('barChart');
        this.ctx = this.canvas.getContext('2d');
        this.barChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: this.barChartLabels,
                datasets: this.barChartData
            },
            options: this.barChartOptions
        });
        setTimeout(() => {
            this.barChart.update();
        }, 1000);


        this.canvasPie = document.getElementById('paiChart');
        this.ctxPie = this.canvasPie.getContext('2d');
        this.barPie = new Chart(this.ctxPie, {
            type: 'doughnut',
            data: {
                labels: this.barPieLabel,
                datasets: this.pieChartData
            },
            options: this.pieChartOptions
        });
        setTimeout(() => {
            this.barPie.update();
        }, 1000);
    }

    ngOnDestroy() {
        this.shedSubscription.unsubscribe();
        this.poolSubscription.unsubscribe();
        this.cuySubscription.unsubscribe();
        this.statisticsSubscription.unsubscribe();
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}
