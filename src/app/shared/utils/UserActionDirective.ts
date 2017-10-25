import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserLogin } from '../../core/api/user.service';

@Directive({ selector: '[userAction]' })
export class UserActionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    public _User: UserLogin
  ) {
  }

  @Input() set userAction(roles: String []) {
    var readOnly=true;

    for (var rol of roles){
      console.log("el que vino "+rol);
      if(this._User.getUser().rol===rol){
        readOnly=false;
        break;
      }
    }

    console.log("el rol es"+this._User.getUser().rol);

    console.log("readonly "+readOnly);

    if (readOnly) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }

  }
}
