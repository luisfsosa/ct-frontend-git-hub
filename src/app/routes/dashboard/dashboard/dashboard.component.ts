import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
declare var $: any;
import { Http } from "@angular/http";

import { ColorsService } from "../../../core/colors/colors.service";
import { WSClient } from "../../../core/api/client.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: [
    "./dashboard.component.scss",
    "../../charts/radial/radial.component.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  public dt: Date = new Date();
  tm;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Miles de Pesos"
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Meses"
          }
        }
      ]
    }
  };
  public barChartLabels: string[] = [
    "Ene",
    "Feb",
    "Mar",
    "Abril",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;
  public barChartColors: string[] = ["#44d851", "#ce0000"];

  public barChartData: any[] = [
    {
      data: [650, 590, 800, 810, 560, 550, 400, 790, 200, 500, 600, 4000],
      label: "Ingresos $",
      backgroundColor: "#44d851"
    },
    {
      data: [280, 480, 400, 190, 860, 270, 900, 300, 300, 400, 400, 1000],
      label: "Egresos $",
      backgroundColor: "#ce0000"
    }
  ];

  public barChartOptions2: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Miles de Pesos"
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Días Vencidos"
          }
        }
      ]
    }
  };

  public barChartLabels2: string[] = ["30 >", "< 90"];
  public barChartData2: any[] = [
    { data: [0, 590], label: "x Cobrar", backgroundColor: "#44d851" },
    { data: [280, 100], label: "x Pagar", backgroundColor: "#ce0000" }
  ];

  // lineChart
  public lineChartData: Array<any> = [
    {
      data: [650, 590, 800, 810, 560, 550, 400, 300, 440, 500, 140, 500],
      label: "IVA"
    }
  ];
  public lineChartLabels: Array<any> = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";

  public lineChartDataISR: Array<any> = [
    {
      data: [150, 390, 100, 310, 560, 150, 400, 300, 540, 500, 140, 500],
      label: "ISR"
    }
  ];
  public lineChartLabelsISR: Array<any> = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ];
  public lineChartOptionsISR: any = {
    responsive: true
  };
  public lineChartColorsISR: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegendISR: boolean = true;
  public lineChartTypeISR: string = "line";
  public Indicators: any;
  public showFacturation: boolean = true;
  constructor(
    private colors: ColorsService,
    public http: Http,
    public _WS: WSClient
  ) {


    // init vector Mexico Map
  }

  getChartDataHttp(url) {
    return this.http.get(url).map(data => data.json());
  }

  setData = data => (this.Indicators = data.json());

  ngOnInit() {
    this._WS.Indicators().get().subscribe(data => {
      console.log(data);
      this.setData(data);
    });
  }

  today() {
    this.dt = new Date();
  }

  ngOnDestroy() {
    $(window).off("resize.flot");
  }

  getSparklineOptions(color) {
    return {
      type: "line",
      height: 20,
      width: "70",
      lineWidth: 2,
      fillColor: "transparent",
      spotRadius: 0,
      valueSpots: {
        "0:": this.colors.byName(color)
      },
      lineColor: this.colors.byName(color),
      spotColor: this.colors.byName(color),
      highlightLineColor: this.colors.byName(color)
    };
  }
}
