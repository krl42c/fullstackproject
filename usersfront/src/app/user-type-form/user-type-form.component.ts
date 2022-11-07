import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';

import { UserService } from '../user.service';
import { UserType } from '../util/UserType';

@Component({
  selector: 'app-user-type-form',
  templateUrl: './user-type-form.component.html',
  styleUrls: ['./user-type-form.component.css']
})
export class UserTypeFormComponent implements OnInit {

  editMode: boolean = false;
  editUserType !: UserType;

  userTypeForm: FormGroup = new FormGroup({
    type: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.editMode = true;
      this.editUserType = this.router.getCurrentNavigation()?.extras.state!["edit"];
      console.log(this.editUserType);
      this.userTypeForm.get("type")?.setValue(this.editUserType.type);
    }
  }

  ngOnInit(): void {
  }

  createUserType() {
    let err: boolean = false;
    let msg: string = "";
    console.log("Edit mode " + this.editMode);
    if (this.userTypeForm.valid) {

      let type = this.userTypeForm.get("type")?.value;

      if (!this.editMode) {
        let userType: UserType = new UserType(0, type);
        this.userService.createUserType(userType).subscribe(data => {
        }, error => {
          this.toastr.error("User type could not be created");
        },
          () => {
            this.toastr.success("User type created");
          }
        );
      } else {
        console.log("edit mode");
        let userType :UserType = new UserType(this.editUserType.id, type);
        this.userService.editUserType(userType).subscribe(data => {
        }, error => {
          this.toastr.error("User type could not be edited");
        },
        () => {
          this.toastr.success("User type edited successfully");
        });
      }
    }
  }
}
