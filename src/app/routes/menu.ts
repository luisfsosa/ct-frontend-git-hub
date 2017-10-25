const privatePath = "/private";

const Perfil = {
  name: "Perfil",
  link: "profile",
  iconclass: "ion-person",
  order: 1,
  datos: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR','CONSULTA']}
};

const Dashboard = {
  name: "Inicio",
  link: "dashboard",
  iconclass: "ion-home",
  order: 1,
  datos: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR','CONSULTA','OPERADOR']}
};

const Client = {
  name: "Clientes",
  link: `${privatePath}/client`,
  order: 2,
  iconclass: "fa fa-users",
  datos: {roles:['SUPER_USUARIO']},
  subitems: [
    {
      name: "Clientes Institucionales",
      iconclass: "fa fa-user-circle-o",
      link: `${privatePath}/client/institutional-client`,
    },
    {
      name: "Clientes Beneficiarios",
      iconclass: "fa fa-user-circle",
      link: `${privatePath}/client/beneficiary-client`,
    },
    {
      name: "Cuenta Beneficiario",
      iconclass: "fa fa-home",
      link: `${privatePath}/client/beneficiary-client`,
    },
    {
      name: "Cuenta Institucional",
      iconclass: "fa fa-university",
      link: `${privatePath}/client/beneficiary-client`,
    }
  ]
};

const Loan = {
  name: "Prestamos ",
  link: `${privatePath}/loan`,
  order: 3,
  iconclass: "fa fa-money",
  datos: {roles:['SUPER_USUARIO']},
  subitems: [
    {
      name: "Créditos",
      iconclass: "fa fa-credit-card",
      link: `${privatePath}/loan/credit`,
    },
    {
      name: "Gestión de Cartera",
      iconclass: "fa fa-cc-amex",
      link: `${privatePath}/loan/credit`,
    },
    {
      name: "Gestión de Cobranza",
      iconclass: "fa fa-cc-diners-club",
      link: `${privatePath}/loan/credit`,
    },
    {
      name: "Garantías",
      iconclass: "fa fa-cc-mastercard",
      link: `${privatePath}/loan/credit`,
    }
  ]
};

const Investment = {
  name: "Inversiones ",
  link: `${privatePath}/loan`,
  order: 4,
  iconclass: "fa fa-handshake-o",
  datos: {roles:['SUPER_USUARIO']},
  subitems: [
    {
      name: "Portafolio",
      iconclass: "fa fa-suitcase",
      link: `${privatePath}/loan/credit`,
    }
  ]
};

const Parametros = {
  name: "Parámetros",
  link: `${privatePath}/settings`,
  order: 5,
  iconclass: "fa fa-table",
  datos: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR']}
};


const Configuracion = {
  name: "Configuraciones",
  link: `${privatePath}/configuration`,
  order: 6,
  iconclass: "ion-gear-a",
  datos: {roles:['SUPER_USUARIO']},
  subitems: [
    {
      name: "Crear Usuarios",
      iconclass: "ion-person",
      link: `${privatePath}/configuration/create`,
    }
  ]
};


export const menu = [
  Dashboard,
  Client,
  Loan,
  Investment,
  Parametros,
  Configuracion
];
