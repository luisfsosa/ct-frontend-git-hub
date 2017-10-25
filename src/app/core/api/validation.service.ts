import {FormGroup} from '@angular/forms';
export class ValidationService {
  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static salvageValue(form: FormGroup, field) {
    let fieldChanges = false;
    return function innerFunction(control) {
      if (!fieldChanges) {
        form.get(field).valueChanges
          .subscribe(() => {
            control.updateValueAndValidity();
          });
        fieldChanges = true;
      }

      if(+control.value<0){
        return { invalidSalvageValue: true };
      }

      if(+control.value>=+form.get(field).value){
        return { invalidSalvageValue: true };
      }

    };
  }
}
