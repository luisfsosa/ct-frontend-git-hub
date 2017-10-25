import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WSFile {
  URL = 'http://35.167.239.86:8001';
  constructor(private http: Http) {}
  operationsBuilder(path) {
    const _URL_ = `${this.URL}${path}`;
    return {
      get: (options?) => this.http.get(_URL_, options),
      post: (body?, options?) => this.http.post(_URL_, body, options),
      put: (body?,options?) => this.http.put(_URL_, body, options),
      remove: (options?) => this.http.delete(_URL_, options),
    };
  }
  PostFile = () => this.operationsBuilder('/postfile');

}
