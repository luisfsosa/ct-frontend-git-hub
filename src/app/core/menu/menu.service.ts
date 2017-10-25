import { Injectable } from '@angular/core';
import { UserLogin } from '../../core/api/user.service';
@Injectable()
export class MenuService {

    preloadMenuItems: Array<any>;
    menuItems: Array<any>;

    constructor(
      public _user: UserLogin
    ) {
        this.menuItems = [];
        this.preloadMenuItems = [];
    }

    addMenu(items: Array<{
        name: string,
        link?: string,
        href?: string,
        imgpath?: string,
        order?: number,
        iconclass?: string,
        label?: any,
        roles?: any,
        subitems?: Array<any>
    }>)     {
        items.forEach((item) => {
            //if(item.roles.indexOf(this._user.getUser().rol) > -1){
            this.preloadMenuItems.push(item);
            //}
            //console.log("Menus roles", item["datos"]);

        });
    }

    getMenu() {
        return this.menuItems;
    }

    getMenuSorted() {
        this.menuItems = [];
        console.log("Menu ordenado", this.preloadMenuItems[0]);
        this.preloadMenuItems.forEach((preloadMenuItem)=> {
          if(preloadMenuItem["datos"]["roles"].indexOf(this._user.getUser().rol) > -1){
            this.menuItems.push(preloadMenuItem);
          }
                //console.log("----preload items", preloadMenuItem["datos"]["roles"].indexOf(this._user.getUser().rol));
        });



        return this.menuItems.sort((a, b) => {
            return a.order - b.order;
        });
    }

}
