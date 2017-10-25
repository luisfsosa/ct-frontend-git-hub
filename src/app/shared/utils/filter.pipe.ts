import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
    name: 'filter'
})
export class DataFilterPipe implements PipeTransform {

transform(items: any, term: any): any {
    if (term === undefined) return items;

    if (items === undefined) return items;

    return items.filter(function(item) {
      for(let property in item){
        if (item[property] === null){
          continue;
        }
        if(item[property].toString().toLowerCase().includes(term.toLowerCase())){
          return true;
        }
      }
      return false;
    });
  }
}
