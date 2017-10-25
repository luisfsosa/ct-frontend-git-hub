import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { SettingsService } from "../../shared/settings/settings.service";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import { UserLogin, Client } from "../../core/api/user.service";
import { WSClient } from "../../core/api/client.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { createObject } from "../../shared/utils/index";
import { PubSubService } from './../../shared/ngx-pubsub/ngx-pubsub.service';

import { HEADER_EVENTS } from './../../shared/ngx-pubsub/pubsub-actions';


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss", "./header.menu-links.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidebarVisible: true;
  sidebarOffcanvasVisible: boolean;
  RFCS: any;
  currentClient: Client;
  currentDate: Date = new Date();
  public currentYear: any;
  public currentMonth: any;

  public monthList = Array.from(Array(13), (_, i) => i).filter(x => x >= 1);
  public yearList = Array.from(Array(2018), (_, i) => i).filter(x => x >= 2010).reverse();
  public active: boolean;
  constructor(
    public settings: SettingsService,
    public _ws: WSClient,
    public _user: UserLogin,
    public router: Router,
    private pubsub: PubSubService,
  ) {}


  ngOnInit() {
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.pad(this.currentDate.getMonth());
    const initFilter = {
      periodo_fiscal: this.currentMonth,
      ciclo_fiscal: this.currentYear
    };
    this._user.setFiltroFiscal(initFilter);
    this.loadRfcList();
    this.pubsub.subscribe(HEADER_EVENTS.RFC,()=>{
      this.loadRfcList();
    })
    this.active = false;

  }

  loadRfcList() {
    let rfcsAll;
    let rfcs=this._user.getUser().rfcs;
    this.RFCS=[];
    let itemColumn;

    const params: URLSearchParams = new URLSearchParams();
    params.set("cliente_id", this._user.getUser().cliente_id);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this._ws.ClientsRFCs().get(requestOptions).subscribe(data => {
      console.log(data.json());
      rfcsAll=data.json();

      const idx = {
        rfc: rfcsAll.columns.indexOf('rfc')
      }

      if(rfcs){
        rfcsAll.content.forEach(item => {
          if(rfcs.includes(item[idx.rfc])){
            itemColumn= createObject(data.json().columns, [item]);
            this.RFCS.push(itemColumn[0]);
          }
        });
      }else{
        rfcsAll.content.forEach(item => {
          itemColumn= createObject(data.json().columns, [item]);
          this.RFCS.push(itemColumn[0]);
        });
      }

      this._user.setClient(this.RFCS[0]);
      if(this.RFCS.length == 0){
        this.active = false;
      }else{
        this.active = true;
      }
    });
  }


  refresh() {
    console.log('refreshFilters');
    this.pubsub.publish(HEADER_EVENTS.FILTERS);
  }

  public pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  setPeriod(month) {
    const temp = {
      periodo_fiscal: this.pad(month),
      ciclo_fiscal: this.currentYear
    };
    this.currentMonth = this.pad(month);
    this._user.setFiltroFiscal(temp);
    this.refresh();
  }

  setCicle(year) {
    console.log("Year", year);
    const temp = {
      periodo_fiscal: this.currentMonth,
      ciclo_fiscal: year
    };
    this.currentYear = year;
    this._user.setFiltroFiscal(temp);
    this.refresh();
  }

  setClient(client) {
    client.ciclo_fiscal = this.currentDate.getMonth();
    client.periodo_fiscal = this.currentDate.getFullYear();
    this._user.setClient(client);
    this.currentClient = client;
    this.refresh();
    console.log("@@Client", this._user.getClient());
  }

  toggleSidebarOffcanvasVisible() {
    this.settings.app.sidebar.offcanvasVisible = !this.settings.app.sidebar
      .offcanvasVisible;
  }

  toggleSidebar(state = null) {
    //  state === true -> open
    //  state === false -> close
    //  state === null -> toggle
    this.settings.app.sidebar.visible =
      state !== null ? state : !this.settings.app.sidebar.visible;
  }

  ngOnDestroy(){
    console.log('Destroyed header');
    this.pubsub.unsubscribe(HEADER_EVENTS.RFC);
  }
}
