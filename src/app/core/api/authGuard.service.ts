import { Injectable } from "@angular/core";
import { UserLogin } from "./user.service";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  CanActivateChild
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  auth: any = {};

  constructor(public _user: UserLogin, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    //console.log("Informacion de rutas",route.data["roles"]);
    if (this._user.isLogged()) {
      //console.log("Informacion", this._user.getUser().rol);
      console.info("User Is log In::parent", this._user.isLogged());
      return true;
    } else {
      console.info("unauthorized", this._user.isLogged());
      this.router.navigate(["/"]);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    if (this._user.isLogged()) {
      let roles = route.data["roles"] as Array<String>;
      console.log("Infomracion de rutas", roles);
      console.log("Validando", roles.indexOf(this._user.getUser().rol));
      if (roles.indexOf(this._user.getUser().rol) > -1) {
        console.info("User Is log In::child", this._user.isLogged());
        return true;
      } else {
        return false;
      }
    } else {
      console.info("authorized", this._user.isLogged());
      this.router.navigate(["/"]);
    }
  }
}
