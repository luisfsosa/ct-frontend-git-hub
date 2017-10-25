import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ingresoEgreso'
})
export class IngresoEgresoPipe implements PipeTransform {

  transform(value: string): string {
    switch (value){
      case "I":
        return "INGRESO";
      case "E":
        return "EGRESO";
      case "T":
        return "CONTABLE";
      default: return "";
    }
  };
}
