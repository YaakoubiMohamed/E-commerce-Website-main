import { Component, OnInit } from '@angular/core';

import { ChartType } from './apex.model';
import { CommandesService } from '../../../core/services/commandes.service';

import {
  linewithDataChart, basicColumChart, columnlabelChart, lineColumAreaChart,
  basicRadialBarChart, simplePieChart, donutChart, barChart, splineAreaChart, dashedLineChart
} from './data';

@Component({
  selector: 'app-apex',
  templateUrl: './apex.component.html',
  styleUrls: ['./apex.component.scss']
})

/**
 * Apex-chart component
 */
export class ApexComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  linewithDataChart: ChartType;
  basicColumChart: ChartType;
  columnlabelChart: ChartType;
  lineColumAreaChart: ChartType;
  basicRadialBarChart: ChartType;
  simplePieChart: ChartType;
  donutChart: ChartType;
  barChart: ChartType;
  splineAreaChart: ChartType;
  dashedLineChart: ChartType;
  user: any;
  commandes: any[] = [];

  constructor(private cmdService: CommandesService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Apex charts', active: true }];


    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.getCommandes(this.user.id)
    /**
     * Fethches the chart data
     */
    this._fetchData();
  }

  getCommandes(id: string) {
    console.log(id);

    this.cmdService.getCommandes(id).subscribe(data => {
      // console.log(data)
      this.commandes = data.map(fav => {
        // console.log(fav);
        return {

          uid: fav.payload.doc.id,

          ...fav.payload.doc.data() as {}
        }
      })
      // this.orders$ = this.commandes
      // console.log(this.commandes);
      let groupKey = 0;
      let groups = this.commandes.reduce(function (r, o) {
        var m = o.date.split(('-'))[1];
        (r[m]) ? r[m].data.push(o) : r[m] = { group: String(groupKey++), data: [o] };
        return r;
      }, {});

      var result = Object.keys(groups).map(function (k) { return groups[k]; });
      // console.log((result));

      result.forEach(element => {
        // console.log(element.data[0].date);
        let date = new Date(element.data[0].date);
        const nameOfMonth = date.toLocaleString('default', {
          month: 'long',
        });
        // console.log(nameOfMonth);
        let sum = 0;

        for (let index = 0; index < element.data.length; index++) {
          sum += element.data[index].total;
        }
        console.log(nameOfMonth, '||', sum);


      })

    })


  }

  /**
   * Fetches the chart data
   */
  private _fetchData() {
    this.linewithDataChart = linewithDataChart;
    this.basicColumChart = basicColumChart;
    this.columnlabelChart = columnlabelChart;
    this.lineColumAreaChart = lineColumAreaChart;
    this.basicRadialBarChart = basicRadialBarChart;
    this.simplePieChart = simplePieChart;
    this.donutChart = donutChart;
    this.barChart = barChart;
    this.splineAreaChart = splineAreaChart;
    this.dashedLineChart = dashedLineChart;
  }
}
