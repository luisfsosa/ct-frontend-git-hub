import { Injectable } from "@angular/core";

@Injectable()
export class TemplateService {
  constructor() {}
  public getTemplate(field) {
    let template = {};
    if(field.readOnly){
      template = {
        key: field.key,
        type: "readOnly",
        defaultValue: field.value,
        templateOptions: {
          label: field.label
        }
      };
    }else{
    switch (field.type) {
      case "TEXT":
        template = {
          key: field.key,
          type: "input",
          defaultValue: field.value,
          templateOptions: {
            type: "text",
            label: field.label
          }
        };
        break;

      case "DATE":
        template = {
          key: field.key,
          type: "datepicker",
          defaultValue: field.value,
          templateOptions: {
            label: field.label
          }
        };
        break;

      case "selectorBanco":
        template = {
          key: field.key,
          type: field.type,
          templateOptions: {
            label: field.label
          }
        };
        break;

      case "selectorCuentaContable":
      template = {
        key: field.key,
        type: 'accounting-account-select',
        templateOptions: {
          label: field.label
        }
      };
      break;


      case "repeater":
        template = {
          key: field.key,
          type: field.type,
          defaultValue: [],
          templateOptions: {
            label: field.label,
          },
          fieldArray: field.fields.map(field => this.getTemplate(field))
        };
        break;

      case "selectorCliente":
        template = {
          key: field.key,
          type: field.type,
          templateOptions: {
            label: field.label
          }
        };
        break;

      case "selectorProveedor":
        template = {
          key: field.key,
          type: field.type,
          templateOptions: {
            label: field.label
          }
        };
        break;

      case "CURRENCY":
      template = {
        key: field.key,
        type: "input",
        className: "small-input-numeric",
        templateOptions: {
          type:"number",
          label: field.label
        }
      };
      break;

      case "selectorMoneda":
        template = {
          key: field.key,
          type: field.type,
          templateOptions: {
            label: field.label
          }
        };
        break;

        case "LOV":
        template = {
          key: field.key,
          type: "selectorLov",
          templateOptions: {
            label: field.label,
            field: field,
          }
        };
        break;

      default:
        template = {
          key: field.key,
          type: "input",
          templateOptions: {
            type: "text",
            label: field.label
          }
        };
        break;
    }
  }
    return template;
  }
}
