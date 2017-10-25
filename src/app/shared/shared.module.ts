import { ThirdPartyEditFormComponent } from './form/third-party-form/third-party-edit-form.component';
import { ThirdPartyFormComponent } from './form/third-party-form/third-party-form.component';
import { FormlySelectorTercero } from './components/formlySelectorTercero';
import { FormlyLov } from './components/formlyLov';
import { FormlyReadOnly } from './components/formlyReadOnly';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlySelectorTiposTerceros } from './components/formlySelectorTiposTerceros';
import { RelateThirdFormComponent } from './components/relateThirdForm';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LimitToPipe } from './utils/limitTo.pipe';
import { OperationsFormComponent } from './components/operationsForm/operationsForm';
import { EditFormComponent } from './components/editformuser';
import { FormlyRepeater } from './components/formlyRepeater';
import { FormlySelectorProveedor } from './components/formlySelectorProveedor';
import { FormlySelectorCliente } from './components/formlySelectorCliente';
import { FormlySelectorMoneda } from './components/formlySelectorMoneda';
import { FormlySelectorBancos } from './components/formlySelectorBancos';
import { MovementsForm } from './components/movementsForm/movementsForm';
import { FormlyCurrencySelect } from './components/formlyCurrencySelect';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
//import { AlertModule } from "ngx-bootstrap/alert";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RatingModule } from "ngx-bootstrap/rating";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { SettingsService } from "./settings/settings.service";
import { SettingsComponent } from "./settings/settings.component";
import { FormlyModule } from '@ngx-formly/core';
import { MyDatePickerModule } from "mydatepicker";
import { DataFilterPipe } from "./utils/filter.pipe";
import { SelectModule } from 'ng2-select';
import { WizardModule } from 'ng2-archwizard';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { FormlyDatePicker } from './components/formlyDatePicker';
import { quoBoardTabs } from './components/quoBoardTabs';
import { FormlyBankSelect } from './components/formlyBankSelect';
import { MovementSelector } from './components/movementsForm/movementSelector';
import { QuestionableBooleanPipe} from "./utils/boolean.pipe";
import { IngresoEgresoPipe} from "./utils/ingresoEgreso.pipe";
import { FormlyRegimeTaxSelect } from './components/formlyRegimeTaxSelect';
import { FormlyAccountingAccountSelect } from './components/formlyAccountingAccountSelect';
import { FormlyRegimeQuoSelect } from './components/formlyRegimeQuoSelect';
import { FormlyPolictyTemplateSelect } from './components/formlyPolicyTemplateSelect';
import { FormlyBookSelect } from './components/formlyBookSelect';
import { FormlyComplementMovementSelect } from './components/formlyComplementMovementSelect';
import { FormlyCategorizedAccountingAccountSelect } from './components/formlyCategorizedAccountingAccountSelect';
import { QuoSearchFormComponent } from './components/quoSearchForm';

import { ClientFormComponent } from './form/client-form/client-form.component';
import { ClientEditFormComponent } from './form/client-form/client-edit-form.component';
import { ProviderFormComponent } from './form/provider-form/provider-form.component';
import { ProviderEditFormComponent } from './form/provider-form/provider-edit-form.component';
import { InvoiceDetailFormComponent } from './form/invoice-detail-form/invoice-detail-form.component';
import { InvoiceDetailClasificationFormComponent } from './form/invoice-detail-clasification-form/invoice-detail-clasification-form';
import { InvoiceClasificationFormComponent } from './form/invoice-clasification-form/invoice-clasification-form';
import { XmlViewerFormComponent } from './form/xml-viewer-form/xml-viewer-form.component';
import { EditInvoiceFormComponent } from './form/edit-invoice-form/edit-invoice-form.component';
import { UserActionDirective } from '../shared/utils/UserActionDirective';
import { FormlyFieldMultiSelect } from './components/formlyFieldMultiselect';
import { FormlyRfcMultiSelect } from './components/formlyRfcMultiSelect';


// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    InfiniteScrollModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AccordionModule.forRoot(),
    // AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    //CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    // DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    PopoverModule.forRoot(),
    // RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    MyDatePickerModule,
    SelectModule,
    NgxTypeaheadModule,
    // TypeaheadModule.forRoot(),
    FormlyModule.forRoot({
      types: [
        {name: 'datepicker', component: FormlyDatePicker},
        {name: 'bank-select', component: FormlyBankSelect},
        {name: 'currency-select', component: FormlyCurrencySelect},
        {name: 'selectorBanco', component: FormlySelectorBancos},
        {name: 'selectorMoneda', component: FormlySelectorMoneda},
        {name: 'selectorCliente', component: FormlySelectorCliente},
        {name: 'selectorProveedor', component: FormlySelectorProveedor},
        {name: 'repeater', component: FormlyRepeater},
        {name: 'regime-tax-select', component: FormlyRegimeTaxSelect},
        {name: 'accounting-account-select', component: FormlyAccountingAccountSelect},
        {name: 'regime-quo-select', component: FormlyRegimeQuoSelect},
        {name: 'policy-template-select', component: FormlyPolictyTemplateSelect},
        {name: 'book-select', component: FormlyBookSelect},
        {name: 'complement-movement-select', component: FormlyComplementMovementSelect},
        {name: 'categorized-accounting-account-select', component: FormlyCategorizedAccountingAccountSelect},
        {name: 'tipos-terceros-select', component: FormlySelectorTiposTerceros},
        {name: 'selectorLov', component: FormlyLov},
        {name: 'readOnly', component: FormlyReadOnly},
        {name: 'tercero-select', component: FormlySelectorTercero },
        {name: 'multiSelect', component: FormlyFieldMultiSelect },
        {name: 'rfc-multi-select', component: FormlyRfcMultiSelect },

      ],
      validationMessages: [
        { name: 'required', message: requiredMessage},
        { name: 'invalidEmailAddress', message: 'Invalid Email Address' },
        { name: 'maxlength', message: 'Tamaño máximo Excedido.' },
        { name: 'minlength', message: minLengthMessage},
        { name: 'invalidSalvageValue', message: 'Valor Invalido, debe ser mínimo 0  y No ser Mayor que el valor en Libros.' },
      ],
    }),
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    WizardModule.forRoot()
  ],
  providers: [SettingsService, DataFilterPipe, LimitToPipe,QuestionableBooleanPipe,IngresoEgresoPipe],
  declarations: [
    SettingsComponent,
    DataFilterPipe,
    QuestionableBooleanPipe,
    IngresoEgresoPipe,
    LimitToPipe,
    FormlyDatePicker,
    quoBoardTabs,
    FormlyBankSelect,
    FormlyRegimeTaxSelect,
    FormlyAccountingAccountSelect,
    FormlyCurrencySelect,
    FormlyRegimeQuoSelect,
    FormlyPolictyTemplateSelect,
    FormlyBookSelect,
    FormlyComplementMovementSelect,
    FormlyCategorizedAccountingAccountSelect,
    MovementSelector,
    MovementsForm,
    FormlySelectorBancos,
    FormlySelectorMoneda,
    FormlySelectorCliente,
    FormlySelectorProveedor,
    FormlyRepeater,
    OperationsFormComponent,
    EditFormComponent,
    QuoSearchFormComponent,
    ClientFormComponent,
    ClientEditFormComponent,
    ProviderFormComponent,
    ProviderEditFormComponent,
    InvoiceDetailFormComponent,
    InvoiceDetailClasificationFormComponent,
    RelateThirdFormComponent,
    InvoiceClasificationFormComponent,
    FormlySelectorTiposTerceros,
    FormlyReadOnly,
    FormlyLov,
    FormlySelectorTercero,
    XmlViewerFormComponent,
    EditInvoiceFormComponent,
    ThirdPartyEditFormComponent,
    ThirdPartyFormComponent,
    UserActionDirective,
    FormlyFieldMultiSelect,
    FormlyRfcMultiSelect
  ],
  exports: [
    InfiniteScrollModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    TranslateModule,
    RouterModule,
    AccordionModule,
    //AlertModule,
    ButtonsModule,
    //CarouselModule,
    CollapseModule,
    //DatepickerModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    ProgressbarModule,
    TabsModule,
    TimepickerModule,
    TooltipModule,
    SettingsComponent,
    DataFilterPipe,
    QuestionableBooleanPipe,
    IngresoEgresoPipe,
    LimitToPipe,
    SelectModule,
    FormlyDatePicker,
    WizardModule,
    quoBoardTabs,
    FormlyBankSelect,
    FormlyRegimeTaxSelect,
    FormlyAccountingAccountSelect,
    FormlyCurrencySelect,
    FormlyRegimeQuoSelect,
    FormlyPolictyTemplateSelect,
    FormlyBookSelect,
    FormlyComplementMovementSelect,
    FormlyCategorizedAccountingAccountSelect,
    MovementSelector,
    MovementsForm,
    FormlySelectorBancos,
    FormlySelectorMoneda,
    FormlySelectorCliente,
    FormlySelectorProveedor,
    FormlyRepeater,
    OperationsFormComponent,
    EditFormComponent,
    QuoSearchFormComponent,
    ClientFormComponent,
    ClientEditFormComponent,
    ProviderFormComponent,
    ProviderEditFormComponent,
    InvoiceDetailFormComponent,
    InvoiceDetailClasificationFormComponent,
    RelateThirdFormComponent,
    InvoiceClasificationFormComponent,
    FormlySelectorTiposTerceros,
    FormlyReadOnly,
    FormlyLov,
    FormlySelectorTercero,
    XmlViewerFormComponent,
    EditInvoiceFormComponent,
    ThirdPartyEditFormComponent,
    ThirdPartyFormComponent,
    UserActionDirective,
    FormlyFieldMultiSelect,
    FormlyRfcMultiSelect
  ],
  entryComponents:[
    MovementsForm,
    OperationsFormComponent,
    EditFormComponent,
    QuoSearchFormComponent,
    ClientFormComponent,
    ClientEditFormComponent,
    ProviderFormComponent,
    ProviderEditFormComponent,
    InvoiceDetailFormComponent,
    InvoiceDetailClasificationFormComponent,
    RelateThirdFormComponent,
    InvoiceClasificationFormComponent,
    ThirdPartyFormComponent,
    XmlViewerFormComponent,
    EditInvoiceFormComponent,
    ThirdPartyEditFormComponent,
    ThirdPartyFormComponent,
  ]
})
export // https://github.com/ocombe/ng2-translate/issues/209
class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}

export function requiredMessage(err, field){
  return  `${field.templateOptions.label} es requerido.`;
}

export function minLengthMessage(err){
  return `Debe tener al menos ${err.requiredLength} Caracteres`;
}

