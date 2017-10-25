import { FormlyDatePicker } from './shared/components/formlyDatePicker';
import { PubSubService } from './shared/ngx-pubsub/ngx-pubsub.service';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule, Http } from "@angular/http";
import {
  TranslateService,
  TranslateModule,
  TranslateLoader
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from "./app.component";

import { CoreModule } from "./core/core.module";
import { LayoutModule } from "./layout/layout.module";
import { SharedModule } from "./shared/shared.module";
import { RoutesModule } from "./routes/routes.module";
import { WebsockeClient } from "./core/api/websocket.service";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormlyModule, FormlyFieldConfig, Field, FieldWrapper} from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgLoadingBarModule } from 'ng-loading-bar';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { ToastrModule } from 'ngx-toastr';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { LaddaModule } from 'angular2-ladda';
import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpModule,    
    BrowserModule,
    CoreModule,
    LaddaModule,
    LayoutModule,
    SlimLoadingBarModule.forRoot(),
    SharedModule.forRoot(),
    RoutesModule,    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgLoadingBarModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    ImgFallbackModule
  ],
  providers: [PubSubService,WebsockeClient,SlimLoadingBarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
