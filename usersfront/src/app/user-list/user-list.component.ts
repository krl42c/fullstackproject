import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../util/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList!: Array<User>;
  asc_sort : boolean = false;

  constructor(public userService: UserService, private router : Router, private toastr: ToastrService) {
    this.getUsers();
  }

  ngOnInit(): void {

  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  deleteUser(user : User) {
    this.userService.deleteUser(user).subscribe(data => {
      console.log("Deleted user" + user.id);
      this.toastr.info("User " + user.email + " deleted");
      this.getUsers();
    });
  }

  createUser() {
    this.router.navigateByUrl("/userform");
  }

  editUser(user : User) {
    this.router.navigate(['/userform'], {state: { editUser : user}});
  }

  sortID() {
    if(this.asc_sort) {
      this.userList.sort((a,b) => a.id - b.id);
      this.asc_sort = false;
    } else {
      this.userList.sort((a,b) => b.id - a.id);
      this.asc_sort = true;
    }
  }

  sortName() {
    if(this.asc_sort) {
      this.userList.sort((a,b) => a.name.localeCompare(b.name));
      this.asc_sort = false;
    } else {
      this.userList.sort((a,b) => b.name.localeCompare(a.name));
      this.asc_sort = true;
    }
  }

  sortLastName() {
    if(this.asc_sort) {
      this.userList.sort((a,b) => a.last_name.localeCompare(b.last_name) );
      this.asc_sort = false;
    } else {
      this.userList.sort((a,b) => b.last_name.localeCompare(a.last_name));
      this.asc_sort = true;
    }
  }

  sortEmail() {
    if(this.asc_sort) {
      this.userList.sort((a,b) => a.email.localeCompare(b.email));
      this.asc_sort = false;
    } else {
      this.userList.sort((a,b) => b.email.localeCompare(a.email));
      this.asc_sort = true;
    }
  }
}
