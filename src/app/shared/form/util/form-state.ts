import { BSModalContext } from "angular2-modal/plugins/bootstrap";

export class FormState extends BSModalContext {
  constructor(public edit: string) {
    super();
  }
}

export function toDatePicker(dateString: string){
  dateString = dateString+'T00:00:00';

  var date =new Date(dateString);

  let datePicker = {
    date: {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()},
    formatted:date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
  };
  return datePicker;
}

export function toDatePickerWithTimeZone(dateString: string){

  var date =new Date(dateString);

  let datePicker = {
    date: {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()},
    formatted:date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
  };
  return datePicker;
}


export function getCurrentDate(){
  var date =new Date();

  let datePicker = {
    date: {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()},
    formatted:date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
  };
  return datePicker;
}

export function getEmptyDatePicker(){

  let datePicker = {
    date: {},
    formatted:null
  };
  return datePicker;
}

