import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'quo-tabs',
    template: `
    <ul class="nav quo-tabs nav-tabs">
        <li role="presentation" routerLinkActive="active"><a [routerLink]="'/private/synchronization'" ><i class="fa fa-refresh" aria-hidden="true"></i> Sincronizados</a></li>
        <li role="presentation" routerLinkActive="active"><a [routerLink]="'/private/received'" ><i class="fa fa-table" aria-hidden="true"></i> Tablero QUO</a></li>
        <li role="presentation" routerLinkActive="active"><a [routerLink]="'/private/payments'" ><i class="fa fa-table" aria-hidden="true"></i> Pagos/Cobros</a></li>
    </ul>
    <quo-search-form></quo-search-form>
    `,
})

export class quoBoardTabs implements OnInit {
    constructor() { }

    ngOnInit() { }
}