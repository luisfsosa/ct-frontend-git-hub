import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LockComponent } from './lock/lock.component';
import { RecoverComponent } from './recover/recover.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { SetupComponent } from './setup/setup.component';



// const routes: Routes = [
//     { path: 'login', component: LoginComponent },
//     { path: 'signup', component: SignupComponent },
//     { path: 'lock', component: LockComponent },
//     { path: 'recover', component: RecoverComponent },
// ];

const routes: Routes = [
    //{ path: 'create', component: CreateComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
        LockComponent,
        RecoverComponent,
        WelcomeComponent,
        SetupComponent
    ],
    exports: [
        //RouterModule
        RouterModule,
        LoginComponent,
        SignupComponent,
        LockComponent,
        RecoverComponent,
        WelcomeComponent
    ]
})
export class UserModule { }