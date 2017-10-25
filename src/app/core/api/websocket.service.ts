import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


export interface WebSocket_interface{
    id: any;
    nombre: string;
    usuario: string;
    id_destino: string;
    message: string;
    type:string;
    status:any;
}


@Injectable()
export class WebsockeClient{
    public _WebSocket : WebSocket_interface;
    ws:$WebSocket;
    id_socket:any;
    constructor() {
    }

    setConnect(wssocket) {this.ws = wssocket};
    getConnectionSocket(){return this.ws};
    getConnect() { 
        return new $WebSocket("ws://45.79.217.14:9001");
        //return new $WebSocket("ws://35.167.239.86:9001");
    };

    setSocketId(wssocketid){this.id_socket = wssocketid};
    getSocketId(){return this.id_socket;};
    setMessageSocket(websocket_a: WebSocket_interface) { this._WebSocket = websocket_a; };
    getMessageSocket() { return this._WebSocket; }
}








//this.ws = new $WebSocket("ws://45.79.217.14:9001");