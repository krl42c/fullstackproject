import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { User} from "./util/User";
import { UserService } from './user.service';
import { UserType } from './util/UserType';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("#getUsers should return array with users", () => {
    service.getUsers().subscribe(data => {
      expect(data).toHaveSize;
    })
  })

  it("#createUser should return ok http response", () => {
    service.createUser(new User(1001, "TestUser", "TestUser", "testuser@test", new UserType(1, "Admin"))).subscribe(data => {
      expect(data).toHaveSize;
    });
  });
});
