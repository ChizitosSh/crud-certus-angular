import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {

  private permissions!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserServiceService
  ) { }

  userId!: any;
  role!: string;

  ngOnInit(): void {
    this.userService.currentUserId.subscribe( id => {
      this.userService.getUser(id).subscribe(
        response => {
          this.role = response[0]['role'];
          this.updateView();
      })
    }
    )
  }

  @Input()
  set appRole(val: string) {
    // templateRef hace referencia al componente donde se usará la directiva
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.permissions = val;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): boolean {
    let hasPermission = false;
    if (this.role == 'admin') {
      hasPermission = true;
    }

    return hasPermission;
  }

}
