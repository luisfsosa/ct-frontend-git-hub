import { LayoutComponent } from "../layout/layout.component";

import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { LockComponent } from "./user/lock/lock.component";
import { RecoverComponent } from "./user/recover/recover.component";
import { WelcomeComponent } from "./user/welcome/welcome.component";

import { UserLogin } from './../core/api/user.service';
import { SetupComponent } from './user/setup/setup.component';
import { AuthGuard } from './../core/api/authGuard.service';

export const routes = [
  { path: '', component: LoginComponent },
  {
    path: "private",
    component: LayoutComponent,
    canActivateChild: [AuthGuard],

    children: [
      {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
        data: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR','CONSULTA','OPERADOR']},
      },
      {
        path: "client",
        loadChildren: "./client/client.module#ClientModule",
        data: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR']},
      },
      {
        path: "loan",
        loadChildren: "./loan/loan.module#LoanModule",
        data: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR']},
      },
      {
        path: "configuration",
        loadChildren: "./configuration/configuration.module#ConfigurationModule",
        data: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR']},
      },

      {
        path: "profile",
        loadChildren: "./profile/profile.module#ProfileModule",
        data: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR','CONSULTA']},
      },
      {
        path: "settings",
        loadChildren: "./settings/settings.module#SettingsModule",
        data: {roles:['SUPER_USUARIO','CUENTA_MAESTRA','CONTADOR']},
      }
    ]
  },
  { path: "signup", component: SignupComponent },
  { path: "lock", component: LockComponent },
  { path: "recover", component: RecoverComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "setup", component: SetupComponent },

  // Not found
  { path: "**", redirectTo: "/" }
];
