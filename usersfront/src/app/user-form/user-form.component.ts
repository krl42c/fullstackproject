import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { User } from '../util/User';
import { UserType } from '../util/UserType';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  editMode: boolean = false;
  editUser !: User;

  userForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    last_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.email),
    user_type: new FormControl("", Validators.required)
  })

  userTypes: Array<UserType> = new Array<UserType>();

  name_v !: boolean;
  last_name_v !: boolean;
  email_v !: boolean;
  user_type_v !: boolean;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {
    this.getUserTypes();
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.editMode = true;
      this.editUser = this.router.getCurrentNavigation()!.extras.state!["editUser"];
      this.userForm.get("name")?.setValue(this.editUser.name);
      this.userForm.get("last_name")?.setValue(this.editUser.last_name);
      this.userForm.get("email")?.setValue(this.editUser.email);
    }
  }

  ngOnInit(): void {
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(data => {
      this.userTypes = data;
    });
  }

  createUser() {
    let name = this.userForm.get("name")!.value;
    let last_name = this.userForm.get("last_name")!.value;
    let email = this.userForm.get("email")!.value;
    let idUserType = this.userForm.get("user_type")!.value;
    console.log(idUserType + " idusertype");

    let userType: UserType[] = this.userTypes.filter(elem => {
      return elem.id == idUserType;
    });

    if (this.userForm.valid) {
      if (this.editMode) {
        if(userType[0].type == null) {
         // userType[0] = new UserType(4,"Guest");
        }
         this.userService.editUser(new User(this.editUser.id, name, last_name, email, userType[0])).subscribe(data => {

        },
          (error) => {
            this.toastr.error("Error updating user");
          },
          () => {
            this.toastr.success("User updated successfully");
            console.log(userType[0]);
          }
        );
      }
      else {
        this.userService.createUser(new User(0, name, last_name, email, userType[0])).subscribe(data => {
        },
          (error: any) => {
            this.toastr.error("User could not be created");
          },
          () => {
            this.toastr.success("User created")
          });
      }
    } else {
      this.name_v = this.userForm.get("name")!.invalid;
      this.last_name_v = this.userForm.get("last_name")!.invalid;
      this.email_v = this.userForm.get("email")!.invalid; 
      this.user_type_v = this.userForm.get("user_type")!.invalid; 
    }
  }
}
