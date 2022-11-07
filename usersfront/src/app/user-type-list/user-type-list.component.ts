import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserType } from '../util/UserType';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-type-list',
  templateUrl: './user-type-list.component.html',
  styleUrls: ['./user-type-list.component.css']
})
export class UserTypeListComponent implements OnInit {

  userTypeList !: Array<UserType>;
  asc_sort: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.getUserTypes();
  }

  ngOnInit(): void {
  }

  getUserTypes() {
    this.userService.getUserTypes().subscribe(data => {
      this.userTypeList = data;
    })
  }

  createUserType() {
    this.router.navigateByUrl("/typeform");
  }

  deleteUserType(userType: UserType) {
    this.userService.deleteUserType(userType).subscribe(data => {

    },
      (error) => {
        this.toastr.error("User type could not be deleted");
      },
      () => {
        this.toastr.warning("User type deleted");
        this.getUserTypes();
      });
  }

  editUserType(userType: UserType) {
    this.router.navigate(['/typeform'], { state: { edit: userType } });
  }

  sortID() {
    if (this.asc_sort) {
      this.userTypeList.sort((a, b) => a.id - b.id);
      this.asc_sort = false;
    } else {
      this.userTypeList.sort((a, b) => b.id - a.id);
      this.asc_sort = true;
    }
  }

  sortType() {
    if (this.asc_sort) {
      this.userTypeList.sort((a, b) => a.type.localeCompare(b.type));
      this.asc_sort = false;
    } else {
      this.userTypeList.sort((a, b) => b.type.localeCompare(a.type));
      this.asc_sort = true;
    }
  }

}
