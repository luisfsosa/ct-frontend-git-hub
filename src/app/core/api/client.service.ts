import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WSClient {
  URL = 'http://52.43.233.63:8080';
  constructor(private http: Http) {}
  operationsBuilder(path) {
    const _URL_ = `${this.URL}${path}`;
    return {
      get: (options?) => this.http.get(_URL_, options),
      post: (body?, options?) => this.http.post(_URL_, body, options),
      put: (body?,options?) => this.http.put(_URL_, body, options),
      remove: (options?) => this.http.delete(_URL_, options),
      removeOptions: (options?) => this.http.delete(_URL_, new RequestOptions({
        body: options
      })),
    };
  }
  Issued = () =>  this.operationsBuilder('/emitidos');
  Recieved = () =>  this.operationsBuilder('/recibidos');
  Indicators = () => this.operationsBuilder('/indicadores');
  Categories = () => this.operationsBuilder('/categorias');
  Operation = () => this.operationsBuilder('/operacion');
  Operations = () => this.operationsBuilder('/generic?operaciones');
  AccountingAccounts = () => this.operationsBuilder('/ctasContables');
  Detail = () => this.operationsBuilder('/detalle');
  Login = () => this.operationsBuilder('/generic?usuarios&');
  Dashboard = () => this.operationsBuilder('/indicadoresdespacho');
  ClientsRFCs = () => this.operationsBuilder('/generic?rfc_cliente');
  Generic = () => this.operationsBuilder('/generic');
  Roster = () => this.operationsBuilder('/nomina');
  ThirdParty = () => this.operationsBuilder('/generic?terceros');
  Currencies = () => this.operationsBuilder('/generic?monedas');
  Banks = () => this.operationsBuilder('/generic?bancos');
  SynchronizedXML = () => this.operationsBuilder('/todos');
  QuoBoard = () => this.operationsBuilder('/quo');
  bankAccounts = () => this.operationsBuilder('/cuentasbancarias');
  GenericBankAccounts = () => this.operationsBuilder('/generic?cuentas_bancarias');
  AccountingPeriod = () => this.operationsBuilder('/periodocontable');
  ListMovements = () => this.operationsBuilder('/listamovimientos');
  FormMovementFormat = () => this.operationsBuilder('/formatomovimiento');
  EquivalenceElements = () => this.operationsBuilder('/generic?equivalencia_elementos');
  EquivalenceCurrency = () => this.operationsBuilder('/generic?equivalencia_monedas');
  RegimeQuo = () => this.operationsBuilder('/generic?regimenes_quo');
  RegimeTax = () => this.operationsBuilder('/generic?regimenes_fiscales');
  EquivalenceRegimeTax = () => this.operationsBuilder('/generic?equivalencia_regimenes');
  ListClients = () => this.operationsBuilder('/generic?asociacion_cuentas&aplicacion_cuenta=CLIENTE');
  ListProveedor = () => this.operationsBuilder('/generic?asociacion_cuentas&aplicacion_cuenta=PROVEEDOR');
  Client = () => this.operationsBuilder('/generic?cliente');
  Users = () => this.operationsBuilder('/generic?usuarios');
  GlobalSettings = () => this.operationsBuilder('/generic?parametros&alcance=GLOBAL');
  DispatchingSettings = () => this.operationsBuilder('/generic?parametros&alcance=DESPACHO');
  RfcSettings = () => this.operationsBuilder('/generic?parametros&alcance=RFC');
  SettingsValidator = () => this.operationsBuilder('/parametros');
  RegimeTaxInformation = () => this.operationsBuilder('/lov?regimenes_fiscales');
  ThirdPartyType = () => this.operationsBuilder('/generic?tipos_terceros');
  PolicyTemplate = () => this.operationsBuilder('/generic?plantillas_polizas');
  PolicyTemplateDetail = () => this.operationsBuilder('/generic?detalle_plantilla_polizas');
  Book = () => this.operationsBuilder('/generic?libros');
  Tax = () => this.operationsBuilder('/generic?impuestos');
  ComplementMovement = () => this.operationsBuilder('/generic?complemento_emulados');
  MovementType = () => this.operationsBuilder('/generic?tipos_emulado');
  MovementTypeDetail = () => this.operationsBuilder('/generic?detalle_tipos_emulado');
  LevelAccounts = () => this.operationsBuilder('/generic?cuentas_contables');
  FixedAssetNew = () => this.operationsBuilder('/activosfijos?nuevos=1');
  FixedAssetOld = () => this.operationsBuilder('/activosfijos?nuevos=0');
  FixedAsset = () => this.operationsBuilder('/activosfijos');
  CategorizedAccountingAccounts = () => this.operationsBuilder('/lov?cuentas_contables_categorizadas');
  Associations = () => this.operationsBuilder('/asociaciones');
  GenPolizaReceived = () => this.operationsBuilder('/genpoliza?tipo_poliza=RECIBIDOS');
  GenPolizaIssued = () => this.operationsBuilder('/genpoliza?tipo_poliza=EMITIDOS');
  Third = () => this.operationsBuilder('/generic?tercero');
  Tercero = () => this.operationsBuilder('/tercero');
  TravelAllowanceNew = () => this.operationsBuilder('/viaticos?nuevos=1');
  TravelAllowanceOld = () => this.operationsBuilder('/viaticos?nuevos=0');
  TravelAllowance = () => this.operationsBuilder('/viaticos');
  Deductions = () => this.operationsBuilder('/deducciones');
  Perceptions = () => this.operationsBuilder('/percepciones');
  OtherPayments = () => this.operationsBuilder('/otrospagos');
  Movement = () => this.operationsBuilder('/movimiento');
  OperationsMov = () => this.operationsBuilder('/operacionesmov');
  GenPolizaPayment = () => this.operationsBuilder('/genpoliza?tipo_poliza=PAGOS');
  GenPolizaCharge = () => this.operationsBuilder('/genpoliza?tipo_poliza=COBROS');
  editInvoice = () => this.operationsBuilder('/editfactura');
}
