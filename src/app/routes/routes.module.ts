import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Route, PreloadingStrategy } from '@angular/router';

import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from './user/user.module';

import { menu } from './menu';
import { routes } from './routes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

 export class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : Observable.of(null);
  }
}

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader }),
        UserModule
    ],
    declarations: [],
    exports: [
        RouterModule,
    ],
    providers: [AppCustomPreloader]
})
export class RoutesModule {
    constructor(private menuService: MenuService) {
        menuService.addMenu(menu);
    }
}
