import { Http } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';
const xml2json = require("simple-xml2json/lib/xml2json.js");

@Component({
  selector: "app-setup",
  templateUrl: "./setup.component.html",
  styleUrls: ["./setup.component.scss"]
})
export class SetupComponent implements OnInit {
  personalDataForm: FormGroup = new FormGroup({});
  personalDataFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: "apellidoPa",
          type: "input",
          templateOptions: {
            label: "Apellido paterno",
            placeholder: "Ingresar apellido paterno",
            required: true
          },
          validators: {
            validation: Validators.maxLength(8)
          },
          validation: {
            show: true
          },
          expressionProperties: {
            "validation.show": "model.checked === true ? true: null"
          }
        },

        {
          key: "apellidoMa",
          type: "input",
          templateOptions: {
            label: "Apellido Materno",
            placeholder: "Ingresar apellido materno",
            required: true
          },
          validators: {
            validation: Validators.maxLength(8)
          },
          validation: {
            show: true
          },
          expressionProperties: {
            "validation.show": "model.checked === true ? true: null"
          }
        },

        {
          key: "Nombre",
          type: "input",
          templateOptions: {
            label: "Nombre",
            placeholder: "Ingresar Nombre Completo",
            required: true
          },
          validators: {
            validation: Validators.maxLength(8)
          },
          validation: {
            show: true
          },
          expressionProperties: {
            "validation.show": "model.checked === true ? true: null"
          }
        },

        {
          key: "birthday",
          type: "datepicker",
          templateOptions: {
            label: "Fecha de nacimiento",
            placeholder: "fecha de nacimiento",
            required: true
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: "negocio",
          type: "select",
          defaultValue: "",
          templateOptions: {
            options: [
              {
                label: "Despacho",
                value: "ADMIN"
              },
              {
                label: "Contador Independiente",
                value: "contador"
              },
              {
                label: "Empresa",
                value: "empresa"
              },

              {
                label: "Otro",
                value: "otro"
              }
            ],
            label: "Giro de negocio",
            placeholder: "Seleccionar Negocio"
          }
        },

        {
          key: "puesto",
          type: "select",
          defaultValue: "",
          templateOptions: {
            label: "Puesto",
            placeholder: "Puesto",
            options: [
              {
                label: "Socio",
                value: "SOCIO"
              },
              {
                label: "Director",
                value: "DIRECTOR"
              },
              {
                label: "Gerente",
                value: "GERENTE"
              },
              {
                label: "Contador",
                value: "CONTADOR"
              },
              {
                label: "Auxiliar",
                value: "AUXILIAR"
              },
              {
                label: "Otro",
                value: "otro"
              }
            ]
          }
        }
      ]
    }
  ];

  personalData: any = {};

  importedXMLData = [];
  fiscalDataForm: FormGroup = new FormGroup({});
  fiscalDataFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          className: "col-md-6",
          key: "rfc",
          type: "input",
          templateOptions: {
            label: "RFC",
            placeholder: "Ingresar RFC",
            required: true
          }
        },

        // {
        //   className:"col-md-6",
        //   key: 'persona',
        //   type: 'radio',
        //   templateOptions: {
        //     label: 'Persona *',
        //     options: [{
        //       key: 'FISICA',
        //       value: 'Fisica',
        //     }, {
        //       key: 'MORAL',
        //       value: 'Moral',
        //     }]
        //   },
        // },

        {
          className: "section-label",
          template: '<div class="clearfix"></div><hr/>'
        },

        {
          className: "col-md-12",
          key: "razonSocial",
          type: "input",
          templateOptions: {
            label: "Razón Social/Nombre Fiscal",
            placeholder: "Ingresar nombre razón social",
            required: true
          },
          validators: {
            validation: Validators.maxLength(8)
          },
          validation: {
            show: false
          },
          expressionProperties: {
            "validation.show":
              "(model.rfc && model.rfc.length == 12) ? true: false"
          }
        },

        {
          className: "col-md-12",
          key: "nombreComercial",
          type: "input",
          templateOptions: {
            label: "Nombre Comercial",
            placeholder: "Ingresar nombre comercial",
            required: true
          },
          validation: {
            show: true
          },
          expressionProperties: {
            "validation.show":
              "(model.rfc && model.rfc.length == 12) ? true: null"
          }
        },

        {
          className: "col-md-6",
          key: "email",
          type: "input",
          templateOptions: {
            type: "email",
            label: "Correo Electrónico",
            placeholder: "nombre@empresa.com",
            required: true
          }
        },

        {
          className: "col-md-6",
          key: "telefono",
          type: "input",
          templateOptions: {
            type: "tel",
            label: "Télefono",
            placeholder: "Télefono"
          }
        },

        {
          className: "section-label",
          template: '<div class="clearfix"></div><hr/>'
        },

        {
          className: "col-md-6",
          key: "codigoPostal",
          type: "input",
          templateOptions: {
            label: "Código Postal",
            placeholder: "Código Postal"
          }
        },

        {
          className: "col-md-6",
          key: "estado",
          type: "input",
          templateOptions: {
            label: "Estado",
            placeholder: "Estado"
          }
        },
        {
          className: "col-md-6",
          key: "ciudad",
          type: "input",
          templateOptions: {
            label: "Ciudad",
            placeholder: "Ciudad"
          }
        },

        {
          className: "col-md-6",
          key: "calle",
          type: "input",
          templateOptions: {
            label: "Calle",
            placeholder: "Calle"
          }
        },

        {
          className: "col-md-6",
          key: "colonia",
          type: "input",
          templateOptions: {
            label: "Colonia",
            placeholder: "Colonia"
          }
        }
      ]
    }
  ];

  fiscalData: any = {};

  paymentDataForm: FormGroup = new FormGroup({});
  paymentDataFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          className: "col-md-6",
          key: "tarjeta",
          type: "input",
          templateOptions: {
            label: "Número de tarjeta *",
            placeholder: "Ingresar núnero de tarjeta",
            required: true
          },
          validators: {
            validation: Validators.maxLength(8)
          },
          validation: {
            show: true
          },
          expressionProperties: {
            "validation.show": "model.checked === true ? true: null"
          }
        },

        {
          className: "col-md-8",
          key: "fechaVencimiento",
          type: "input",
          templateOptions: {
            label: "Fecha de vencimiento *"
          }
        },

        {
          className: "col-md-4",
          key: "cvv",
          type: "input",
          templateOptions: {
            label: "CVV *"
          }
        },

        {
          className: "col-md-4",
          key: "promo",
          type: "input",
          templateOptions: {
            label: "Código de promoción"
          }
        }
      ]
    }
  ];

  paymentData: any = {};
  videosHelp: any = [];

  constructor(public _http: Http) {}

  ngOnInit() {
    this._http
      .get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=contabilidad&maxResults=6&type=video&key=AIzaSyAY5IVDwPMbEVssbhjFZaXqQquEtUjY9xk"
      )
      .subscribe(response => {
        console.log(response.json());
        this.videosHelp = response.json();
      });
  }

  finishFunction() {
    alert("hello");
  }

  nextIsValid() {
    return false;
  }

  submitUser(user) {
    console.log(user);
  }

  onChangeFile($event) {
    console.log($event.target);
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      const parsedXML = xml2json.parser(myReader.result);
      // you can perform an action with readed data here
      console.log(parsedXML);
      console.log(parsedXML["cfdi%3acomprobante"]["cfdi%3aemisor"]["rfc"]);
      this.importedXMLData = [];
      this.importedXMLData.push(
        parsedXML["cfdi%3acomprobante"]["cfdi%3aemisor"]
      );
      this.importedXMLData.push(
        parsedXML["cfdi%3acomprobante"]["cfdi%3areceptor"]
      );

      // this.fiscalDataForm.get('rfc').setValue(parsedXML['cfdi%3acomprobante']["cfdi%3aemisor"]["rfc"])
      // this.fiscalDataForm.get('razonSocial').setValue(parsedXML['cfdi%3acomprobante']["cfdi%3aemisor"]["nombre"])
    };
    myReader.readAsText(file);
  }

  clearFiscalDataForm() {
    this.fiscalDataForm.get("rfc").setValue("");
    this.fiscalDataForm.get("razonSocial").setValue("");
    this.fiscalDataForm.get("codigoPostal").setValue("");
    this.fiscalDataForm.get("estado").setValue("");
    this.fiscalDataForm.get("ciudad").setValue('');
  }

  selectRFC(item) {
    console.log(item);
    this.clearFiscalDataForm();

    this.fiscalDataForm.get("rfc").setValue(item["rfc"]);
    this.fiscalDataForm.get("razonSocial").setValue(item["nombre"]);

    if (item["cfdi%3adomicilio"] && item["cfdi%3adomicilio"]["codigopostal"]) {
      this.fiscalDataForm
        .get("codigoPostal")
        .setValue(item["cfdi%3adomicilio"]["codigopostal"]);
    }

    if (
      item["cfdi%3adomiciliofiscal"] &&
      item["cfdi%3adomiciliofiscal"]["codigopostal"]
    ) {
      this.fiscalDataForm
        .get("codigoPostal")
        .setValue(item["cfdi%3adomiciliofiscal"]["codigopostal"]);
    }

    if (item["cfdi%3adomicilio"] && item["cfdi%3adomicilio"]["estado"]) {
      this.fiscalDataForm
        .get("estado")
        .setValue(item["cfdi%3adomicilio"]["estado"]);
    }

    if (
      item["cfdi%3adomiciliofiscal"] &&
      item["cfdi%3adomiciliofiscal"]["estado"]
    ) {
      this.fiscalDataForm
        .get("estado")
        .setValue(item["cfdi%3adomiciliofiscal"]["estado"]);
    }

    if (item["cfdi%3adomicilio"] && item["cfdi%3adomicilio"]["calle"]) {
      this.fiscalDataForm
        .get("calle")
        .setValue(item["cfdi%3adomicilio"]["calle"]);
    }

    if (
      item["cfdi%3adomiciliofiscal"] &&
      item["cfdi%3adomiciliofiscal"]["calle"]
    ) {
      this.fiscalDataForm
        .get("calle")
        .setValue(item["cfdi%3adomiciliofiscal"]["calle"]);
    }

    if (item["cfdi%3adomicilio"] && item["cfdi%3adomicilio"]["colonia"]) {
      this.fiscalDataForm
        .get("colonia")
        .setValue(item["cfdi%3adomicilio"]["colonia"]);
    }

    if (
      item["cfdi%3adomiciliofiscal"] &&
      item["cfdi%3adomiciliofiscal"]["calle"]
    ) {
      this.fiscalDataForm
        .get("colonia")
        .setValue(item["cfdi%3adomiciliofiscal"]["colonia"]);
    }

    if (
      item["cfdi%3adomiciliofiscal"] &&
      item["cfdi%3adomiciliofiscal"]["municipio"]
    ) {
      this.fiscalDataForm
        .get("ciudad")
        .setValue(item["cfdi%3adomiciliofiscal"]["municipio"]);
    }

  }

  getVimeoVideos(){
    return {
      "total": 3,
      "page": 1,
      "per_page": 25,
      "paging": {
          "next": null,
          "previous": null,
          "first": "/users/quocontabilita/videos?page=1",
          "last": "/users/quocontabilita/videos?page=1"
      },
      "data": [
          {
              "uri": "/videos/232392013",
              "name": "Test Video - QUO",
              "description": null,
              "link": "https://vimeo.com/232392013",
              "duration": 9,
              "width": 1280,
              "language": "es",
              "height": 624,
              "embed": {
                  "html": "<iframe src=\"https://player.vimeo.com/video/232392013?badge=0&autopause=0&player_id=0\" width=\"1280\" height=\"624\" frameborder=\"0\" title=\"Test Video - QUO\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
              },
              "created_time": "2017-09-04T21:02:21+00:00",
              "modified_time": "2017-09-04T21:03:31+00:00",
              "release_time": "2017-09-04T21:02:21+00:00",
              "content_rating": [
                  "safe"
              ],
              "license": null,
              "privacy": {
                  "view": "anybody",
                  "embed": "public",
                  "download": true,
                  "add": true,
                  "comments": "anybody"
              },
              "pictures": {
                  "uri": "/videos/232392013/pictures/653438132",
                  "active": true,
                  "type": "custom",
                  "sizes": [
                      {
                          "width": 100,
                          "height": 75,
                          "link": "https://i.vimeocdn.com/video/653438132_100x75.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653438132_100x75.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 200,
                          "height": 150,
                          "link": "https://i.vimeocdn.com/video/653438132_200x150.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653438132_200x150.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 295,
                          "height": 166,
                          "link": "https://i.vimeocdn.com/video/653438132_295x166.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653438132_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 640,
                          "height": 312,
                          "link": "https://i.vimeocdn.com/video/653438132_640x312.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653438132_640x312.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 960,
                          "height": 468,
                          "link": "https://i.vimeocdn.com/video/653438132_960x468.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653438132_960x468.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 1280,
                          "height": 624,
                          "link": "https://i.vimeocdn.com/video/653438132_1280x624.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653438132_1280x624.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      }
                  ],
                  "resource_key": "903b0b373e081604667942c081a44c9450e5f491"
              },
              "tags": [],
              "stats": {
                  "plays": null
              },
              "metadata": {
                  "connections": {
                      "comments": {
                          "uri": "/videos/232392013/comments",
                          "options": [
                              "GET"
                          ],
                          "total": 0
                      },
                      "credits": {
                          "uri": "/videos/232392013/credits",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 1
                      },
                      "likes": {
                          "uri": "/videos/232392013/likes",
                          "options": [
                              "GET"
                          ],
                          "total": 0
                      },
                      "pictures": {
                          "uri": "/videos/232392013/pictures",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 1
                      },
                      "texttracks": {
                          "uri": "/videos/232392013/texttracks",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 0
                      },
                      "related": {
                          "uri": "/users/quocontabilita/videos?offset=1",
                          "options": [
                              "GET"
                          ]
                      }
                  },
                  "interactions": null
              },
              "user": {
                  "uri": "/users/70308283",
                  "name": "Quo Contabilita",
                  "link": "https://vimeo.com/quocontabilita",
                  "location": null,
                  "bio": null,
                  "created_time": "2017-08-23T20:04:54+00:00",
                  "account": "basic",
                  "pictures": {
                      "uri": "/users/70308283/pictures/20882101",
                      "active": true,
                      "type": "custom",
                      "sizes": [
                          {
                              "width": 30,
                              "height": 30,
                              "link": "https://i.vimeocdn.com/portrait/20882101_30x30"
                          },
                          {
                              "width": 75,
                              "height": 75,
                              "link": "https://i.vimeocdn.com/portrait/20882101_75x75"
                          },
                          {
                              "width": 100,
                              "height": 100,
                              "link": "https://i.vimeocdn.com/portrait/20882101_100x100"
                          },
                          {
                              "width": 300,
                              "height": 300,
                              "link": "https://i.vimeocdn.com/portrait/20882101_300x300"
                          }
                      ],
                      "resource_key": "a37d917e46a10629a3dbf17202d16b70bc690284"
                  },
                  "websites": [],
                  "metadata": {
                      "connections": {
                          "activities": {
                              "uri": "/users/70308283/activities",
                              "options": [
                                  "GET"
                              ]
                          },
                          "albums": {
                              "uri": "/users/70308283/albums",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "appearances": {
                              "uri": "/users/70308283/appearances",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "categories": {
                              "uri": "/users/70308283/categories",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "channels": {
                              "uri": "/users/70308283/channels",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "feed": {
                              "uri": "/users/70308283/feed",
                              "options": [
                                  "GET"
                              ]
                          },
                          "followers": {
                              "uri": "/users/70308283/followers",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "following": {
                              "uri": "/users/70308283/following",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "groups": {
                              "uri": "/users/70308283/groups",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "likes": {
                              "uri": "/users/70308283/likes",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "moderated_channels": {
                              "uri": "/users/70308283/channels?filter=moderated",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "portfolios": {
                              "uri": "/users/70308283/portfolios",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "videos": {
                              "uri": "/users/70308283/videos",
                              "options": [
                                  "GET"
                              ],
                              "total": 3
                          },
                          "watchlater": {
                              "uri": "/users/70308283/watchlater",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "shared": {
                              "uri": "/users/70308283/shared/videos",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "pictures": {
                              "uri": "/users/70308283/pictures",
                              "options": [
                                  "GET",
                                  "POST"
                              ],
                              "total": 1
                          }
                      }
                  },
                  "resource_key": "c84baf9c1f6cadb9a0a9c11364e20b69f7d0d0e9",
                  "preferences": {
                      "videos": {
                          "privacy": null
                      }
                  }
              },
              "app": null,
              "status": "available",
              "resource_key": "8888d8b817352e97e4b975e93065736f1024da1b",
              "embed_presets": null
          },
          {
              "uri": "/videos/232380025",
              "name": "Enfoques de la Contabilidad",
              "description": "Existen 3 enfoques de la contabilidad. Mira el video y conoce cada unos de ellos.\n\nSíguenos en www.superconta.mx\nFacebook.com/supercontaoficial",
              "link": "https://vimeo.com/232380025",
              "duration": 71,
              "width": 1920,
              "language": "es-MX",
              "height": 1080,
              "embed": {
                  "html": "<iframe src=\"https://player.vimeo.com/video/232380025?badge=0&autopause=0&player_id=0\" width=\"1920\" height=\"1080\" frameborder=\"0\" title=\"Enfoques de la Contabilidad\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
              },
              "created_time": "2017-09-04T19:12:43+00:00",
              "modified_time": "2017-09-04T19:18:43+00:00",
              "release_time": "2017-09-04T19:12:43+00:00",
              "content_rating": [
                  "safe"
              ],
              "license": null,
              "privacy": {
                  "view": "anybody",
                  "embed": "public",
                  "download": true,
                  "add": true,
                  "comments": "anybody"
              },
              "pictures": {
                  "uri": "/videos/232380025/pictures/653423902",
                  "active": true,
                  "type": "custom",
                  "sizes": [
                      {
                          "width": 100,
                          "height": 75,
                          "link": "https://i.vimeocdn.com/video/653423902_100x75.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653423902_100x75.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 200,
                          "height": 150,
                          "link": "https://i.vimeocdn.com/video/653423902_200x150.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653423902_200x150.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 295,
                          "height": 166,
                          "link": "https://i.vimeocdn.com/video/653423902_295x166.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653423902_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 640,
                          "height": 360,
                          "link": "https://i.vimeocdn.com/video/653423902_640x360.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653423902_640x360.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 960,
                          "height": 540,
                          "link": "https://i.vimeocdn.com/video/653423902_960x540.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653423902_960x540.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 1280,
                          "height": 720,
                          "link": "https://i.vimeocdn.com/video/653423902_1280x720.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653423902_1280x720.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      }
                  ],
                  "resource_key": "78501b3c951fa6a54dd7e382b920d8ae0022ae6b"
              },
              "tags": [
                  {
                      "uri": "/tags/contabilidad",
                      "name": "contabilidad",
                      "tag": "contabilidad",
                      "canonical": "contabilidad",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/contabilidad/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 1029
                              }
                          }
                      },
                      "resource_key": "c50631b585b7fc136dd5000b8ae0fd6835bdda20"
                  },
                  {
                      "uri": "/tags/enfoquesdelacontabilidad",
                      "name": "enfoques de la contabilidad",
                      "tag": "enfoques de la contabilidad",
                      "canonical": "enfoquesdelacontabilidad",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/enfoquesdelacontabilidad/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 1
                              }
                          }
                      },
                      "resource_key": "55736ccfd7c0b280d221c823940c48e0d0092e03"
                  },
                  {
                      "uri": "/tags/contabilidadadministrativa",
                      "name": "contabilidad administrativa",
                      "tag": "contabilidad administrativa",
                      "canonical": "contabilidadadministrativa",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/contabilidadadministrativa/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 1
                              }
                          }
                      },
                      "resource_key": "6667c3df29c60426a265fabe58cb34ef7466ee79"
                  },
                  {
                      "uri": "/tags/contabilidadfinanciera",
                      "name": "contabilidad financiera",
                      "tag": "contabilidad financiera",
                      "canonical": "contabilidadfinanciera",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/contabilidadfinanciera/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 6
                              }
                          }
                      },
                      "resource_key": "96fa37e2eb2f5480e639dbfbbf444205aa916615"
                  },
                  {
                      "uri": "/tags/contabilidadcostos",
                      "name": "contabilidad costos",
                      "tag": "contabilidad costos",
                      "canonical": "contabilidadcostos",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/contabilidadcostos/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 1
                              }
                          }
                      },
                      "resource_key": "e5120ac90d5219239087608780676d07ba9bf7e6"
                  }
              ],
              "stats": {
                  "plays": null
              },
              "metadata": {
                  "connections": {
                      "comments": {
                          "uri": "/videos/232380025/comments",
                          "options": [
                              "GET"
                          ],
                          "total": 0
                      },
                      "credits": {
                          "uri": "/videos/232380025/credits",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 1
                      },
                      "likes": {
                          "uri": "/videos/232380025/likes",
                          "options": [
                              "GET"
                          ],
                          "total": 0
                      },
                      "pictures": {
                          "uri": "/videos/232380025/pictures",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 1
                      },
                      "texttracks": {
                          "uri": "/videos/232380025/texttracks",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 0
                      },
                      "related": {
                          "uri": "/users/quocontabilita/videos?offset=2",
                          "options": [
                              "GET"
                          ]
                      }
                  },
                  "interactions": null
              },
              "user": {
                  "uri": "/users/70308283",
                  "name": "Quo Contabilita",
                  "link": "https://vimeo.com/quocontabilita",
                  "location": null,
                  "bio": null,
                  "created_time": "2017-08-23T20:04:54+00:00",
                  "account": "basic",
                  "pictures": {
                      "uri": "/users/70308283/pictures/20882101",
                      "active": true,
                      "type": "custom",
                      "sizes": [
                          {
                              "width": 30,
                              "height": 30,
                              "link": "https://i.vimeocdn.com/portrait/20882101_30x30"
                          },
                          {
                              "width": 75,
                              "height": 75,
                              "link": "https://i.vimeocdn.com/portrait/20882101_75x75"
                          },
                          {
                              "width": 100,
                              "height": 100,
                              "link": "https://i.vimeocdn.com/portrait/20882101_100x100"
                          },
                          {
                              "width": 300,
                              "height": 300,
                              "link": "https://i.vimeocdn.com/portrait/20882101_300x300"
                          }
                      ],
                      "resource_key": "a37d917e46a10629a3dbf17202d16b70bc690284"
                  },
                  "websites": [],
                  "metadata": {
                      "connections": {
                          "activities": {
                              "uri": "/users/70308283/activities",
                              "options": [
                                  "GET"
                              ]
                          },
                          "albums": {
                              "uri": "/users/70308283/albums",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "appearances": {
                              "uri": "/users/70308283/appearances",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "categories": {
                              "uri": "/users/70308283/categories",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "channels": {
                              "uri": "/users/70308283/channels",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "feed": {
                              "uri": "/users/70308283/feed",
                              "options": [
                                  "GET"
                              ]
                          },
                          "followers": {
                              "uri": "/users/70308283/followers",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "following": {
                              "uri": "/users/70308283/following",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "groups": {
                              "uri": "/users/70308283/groups",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "likes": {
                              "uri": "/users/70308283/likes",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "moderated_channels": {
                              "uri": "/users/70308283/channels?filter=moderated",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "portfolios": {
                              "uri": "/users/70308283/portfolios",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "videos": {
                              "uri": "/users/70308283/videos",
                              "options": [
                                  "GET"
                              ],
                              "total": 3
                          },
                          "watchlater": {
                              "uri": "/users/70308283/watchlater",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "shared": {
                              "uri": "/users/70308283/shared/videos",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "pictures": {
                              "uri": "/users/70308283/pictures",
                              "options": [
                                  "GET",
                                  "POST"
                              ],
                              "total": 1
                          }
                      }
                  },
                  "resource_key": "c84baf9c1f6cadb9a0a9c11364e20b69f7d0d0e9",
                  "preferences": {
                      "videos": {
                          "privacy": null
                      }
                  }
              },
              "app": null,
              "status": "available",
              "resource_key": "baf44925290c10a13af9fd273142d01cb8d5bfb3",
              "embed_presets": null
          },
          {
              "uri": "/videos/232378858",
              "name": "Línea del Tiempo",
              "description": "Descubre los momentos clave en la historia de la contabilidad hasta llegar a nuestros días.\n\nSíguenos en el blog www.superconta.com y en facebook.com/supercontaoficial",
              "link": "https://vimeo.com/232378858",
              "duration": 76,
              "width": 1920,
              "language": "es-MX",
              "height": 1080,
              "embed": {
                  "html": "<iframe src=\"https://player.vimeo.com/video/232378858?badge=0&autopause=0&player_id=0\" width=\"1920\" height=\"1080\" frameborder=\"0\" title=\"Línea del Tiempo\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
              },
              "created_time": "2017-09-04T19:02:29+00:00",
              "modified_time": "2017-09-04T19:06:34+00:00",
              "release_time": "2017-09-04T19:02:29+00:00",
              "content_rating": [
                  "safe"
              ],
              "license": null,
              "privacy": {
                  "view": "anybody",
                  "embed": "public",
                  "download": true,
                  "add": true,
                  "comments": "anybody"
              },
              "pictures": {
                  "uri": "/videos/232378858/pictures/653422201",
                  "active": true,
                  "type": "custom",
                  "sizes": [
                      {
                          "width": 100,
                          "height": 75,
                          "link": "https://i.vimeocdn.com/video/653422201_100x75.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653422201_100x75.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 200,
                          "height": 150,
                          "link": "https://i.vimeocdn.com/video/653422201_200x150.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653422201_200x150.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 295,
                          "height": 166,
                          "link": "https://i.vimeocdn.com/video/653422201_295x166.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653422201_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 640,
                          "height": 360,
                          "link": "https://i.vimeocdn.com/video/653422201_640x360.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653422201_640x360.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 960,
                          "height": 540,
                          "link": "https://i.vimeocdn.com/video/653422201_960x540.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653422201_960x540.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      },
                      {
                          "width": 1280,
                          "height": 720,
                          "link": "https://i.vimeocdn.com/video/653422201_1280x720.jpg?r=pad",
                          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F653422201_1280x720.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
                      }
                  ],
                  "resource_key": "a7461ef06b66145983cb37605682d4d1ad49d2e7"
              },
              "tags": [
                  {
                      "uri": "/tags/contabilidad",
                      "name": "Contabilidad",
                      "tag": "Contabilidad",
                      "canonical": "contabilidad",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/contabilidad/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 1029
                              }
                          }
                      },
                      "resource_key": "4e2868b6d6e2d3119a49738cef3faa81dd8259db"
                  },
                  {
                      "uri": "/tags/historiadelacontabilidad",
                      "name": "historia de la contabilidad",
                      "tag": "historia de la contabilidad",
                      "canonical": "historiadelacontabilidad",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/historiadelacontabilidad/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 1
                              }
                          }
                      },
                      "resource_key": "b1d05774f9246c32b7405e83a2138afd9788f9ab"
                  },
                  {
                      "uri": "/tags/hitosdelacontabilidad",
                      "name": "hitos de la contabilidad",
                      "tag": "hitos de la contabilidad",
                      "canonical": "hitosdelacontabilidad",
                      "metadata": {
                          "connections": {
                              "videos": {
                                  "uri": "/tags/hitosdelacontabilidad/videos",
                                  "options": [
                                      "GET"
                                  ],
                                  "total": 1
                              }
                          }
                      },
                      "resource_key": "680a22859f31d9adcc9ff890a6e049203d4d9821"
                  }
              ],
              "stats": {
                  "plays": null
              },
              "metadata": {
                  "connections": {
                      "comments": {
                          "uri": "/videos/232378858/comments",
                          "options": [
                              "GET"
                          ],
                          "total": 0
                      },
                      "credits": {
                          "uri": "/videos/232378858/credits",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 1
                      },
                      "likes": {
                          "uri": "/videos/232378858/likes",
                          "options": [
                              "GET"
                          ],
                          "total": 0
                      },
                      "pictures": {
                          "uri": "/videos/232378858/pictures",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 1
                      },
                      "texttracks": {
                          "uri": "/videos/232378858/texttracks",
                          "options": [
                              "GET",
                              "POST"
                          ],
                          "total": 0
                      },
                      "related": null
                  },
                  "interactions": null
              },
              "user": {
                  "uri": "/users/70308283",
                  "name": "Quo Contabilita",
                  "link": "https://vimeo.com/quocontabilita",
                  "location": null,
                  "bio": null,
                  "created_time": "2017-08-23T20:04:54+00:00",
                  "account": "basic",
                  "pictures": {
                      "uri": "/users/70308283/pictures/20882101",
                      "active": true,
                      "type": "custom",
                      "sizes": [
                          {
                              "width": 30,
                              "height": 30,
                              "link": "https://i.vimeocdn.com/portrait/20882101_30x30"
                          },
                          {
                              "width": 75,
                              "height": 75,
                              "link": "https://i.vimeocdn.com/portrait/20882101_75x75"
                          },
                          {
                              "width": 100,
                              "height": 100,
                              "link": "https://i.vimeocdn.com/portrait/20882101_100x100"
                          },
                          {
                              "width": 300,
                              "height": 300,
                              "link": "https://i.vimeocdn.com/portrait/20882101_300x300"
                          }
                      ],
                      "resource_key": "a37d917e46a10629a3dbf17202d16b70bc690284"
                  },
                  "websites": [],
                  "metadata": {
                      "connections": {
                          "activities": {
                              "uri": "/users/70308283/activities",
                              "options": [
                                  "GET"
                              ]
                          },
                          "albums": {
                              "uri": "/users/70308283/albums",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "appearances": {
                              "uri": "/users/70308283/appearances",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "categories": {
                              "uri": "/users/70308283/categories",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "channels": {
                              "uri": "/users/70308283/channels",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "feed": {
                              "uri": "/users/70308283/feed",
                              "options": [
                                  "GET"
                              ]
                          },
                          "followers": {
                              "uri": "/users/70308283/followers",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "following": {
                              "uri": "/users/70308283/following",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "groups": {
                              "uri": "/users/70308283/groups",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "likes": {
                              "uri": "/users/70308283/likes",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "moderated_channels": {
                              "uri": "/users/70308283/channels?filter=moderated",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "portfolios": {
                              "uri": "/users/70308283/portfolios",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "videos": {
                              "uri": "/users/70308283/videos",
                              "options": [
                                  "GET"
                              ],
                              "total": 3
                          },
                          "watchlater": {
                              "uri": "/users/70308283/watchlater",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "shared": {
                              "uri": "/users/70308283/shared/videos",
                              "options": [
                                  "GET"
                              ],
                              "total": 0
                          },
                          "pictures": {
                              "uri": "/users/70308283/pictures",
                              "options": [
                                  "GET",
                                  "POST"
                              ],
                              "total": 1
                          }
                      }
                  },
                  "resource_key": "c84baf9c1f6cadb9a0a9c11364e20b69f7d0d0e9",
                  "preferences": {
                      "videos": {
                          "privacy": null
                      }
                  }
              },
              "app": null,
              "status": "available",
              "resource_key": "35db1b4822c1cec04a0b1afae8521bfde9302c11",
              "embed_presets": null
          }
      ]
  }
  }
}
