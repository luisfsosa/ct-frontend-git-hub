import { TemplateService } from './api/templates.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import {WSClient} from './api/client.service';
import {WSFile} from './api/file.service';
import {UserLogin} from './api/user.service';
import {AuthGuard} from './api/authGuard.service';
import { ValidationService } from "./api/validation.service";

import { SharedModule } from '../shared/shared.module';
import { MenuService } from './menu/menu.service';
import { TranslatorService } from './translator/translator.service';
import { ColorsService } from './colors/colors.service';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        WSClient,
        WSFile,
        UserLogin,
        AuthGuard,
        MenuService,
        TranslatorService,
        ColorsService,
        ValidationService,
        TemplateService
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
