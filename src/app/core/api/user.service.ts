import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface User{
    id: any;
    nombre: string;
    usuario: string;
    rol: string;
    email: string;
    cliente_id:string;
    rfcs: string[]
}

export interface Client{
    id: any;
    rfc: string;
    razon_social: string;
    cliente_id: any;
    usuarios: any;
}

export interface FiltroFiscal {
    periodo_fiscal: any;
    ciclo_fiscal: any;
}

export interface Search {
    search: any;
}

@Injectable()
export class UserLogin{
    public _isLogged = false;
    public _user: User;
    public _currentClient: Client;
    public _filtroFiscal: FiltroFiscal;
    public _search: Search;
    public _searchVisibility: false;
    constructor() {
    }

    setSearchVisible(s) { this._searchVisibility = s; }
    getSearchVisible() { return this._searchVisibility; }
    setSearch(q) { this._search = q; }
    getSearch() { return this._search; }

    setUser(user: User) { this._user = user; this._isLogged = true; }
    getUser() { return this._user; }

    setClient(client: Client) { this._currentClient = client; };
    getClient() {return this._currentClient; }

    setFiltroFiscal(filtro:FiltroFiscal) {this._filtroFiscal = filtro; };
    getFiltroFiscal() {return this._filtroFiscal; }

    isLogged(){return this._isLogged;}
}
