import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '@models/user';

import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;
  let mockUsers: User[];
  let mockUser: User;
  let mockAddUser: User;
  let httpController: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
    (mockUser = {
      id: 1,
      firstName: 'Terry',
      lastName: 'Medhurst',
      gender: 'male',
      email: 'atuny0@sohu.com',
      birthDate: '2000-12-25',
    }),
      (mockUsers = [
        {
          id: 1,
          firstName: 'Terry',
          lastName: 'Medhurst',
          gender: 'male',
          email: 'atuny0@sohu.com',
          birthDate: '2000-12-25',
        },
        {
          id: 2,
          firstName: 'Sheldon',
          lastName: 'Quigley',
          gender: 'male',
          email: 'hbingley1@plala.or.jp',
          birthDate: '2000-10-12',
        },
        {
          id: 3,
          firstName: 'Terrill',
          lastName: 'Hills',
          gender: 'male',
          email: 'rshawe2@51.la',
          birthDate: '1992-12-30',
        },
      ]);

    mockAddUser = {
      firstName: 'Test',
      lastName: 'User',
      birthDate: '2000-1-2',
      email: 'test@user.de',
      gender: 'male',
      id: 101,
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers and return an array ', () => {
    // 1
    service.getUsers().subscribe((users) => {
      //2
      expect(users).toBeTruthy();
      expect(users).toBeGreaterThan(1);
      expect(users).toBe(mockUsers);
    });

    const mockHttp = httpController.expectOne(apiUrl);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('GET');
  });

  it('should call getUsers and return an error ', () => {
    // 1
    service.getUsers().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(404);
      },
    });

    const mockHttp = httpController.expectOne(apiUrl);
    mockHttp.flush('error request', {
      status: 404,
      statusText: 'Page not found',
    });
  });

  it('should call getUser and return an user ', () => {
    // 1
    service.getUser(1).subscribe((user) => {
      //2
      expect(user).toBeTruthy();
      expect(user).toBe(mockUser);
    });

    const mockHttp = httpController.expectOne(apiUrl + '/1');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('GET');
  });

  it('should call getUser and return an error ', () => {
    // 1
    service.getUser(1).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(404);
      },
    });

    const mockHttp = httpController.expectOne(apiUrl + '/1');
    mockHttp.flush('error request', {
      status: 404,
      statusText: 'Page not found',
    });
  });

  it('should call addUser and return an user ', () => {
    // 1
    service.addUser(mockAddUser).subscribe((user) => {
      //2
      expect(user).toBeTruthy();
      expect(user).toBe(mockAddUser);
    });

    const mockHttp = httpController.expectOne(apiUrl + '/add');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('POST');
  });

  it('should call addUser and return an error ', () => {
    // 1
    service.addUser(mockAddUser).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(404);
      },
    });

    const mockHttp = httpController.expectOne(apiUrl + '/add');
    mockHttp.flush('error request', {
      status: 404,
      statusText: 'Page not found',
    });
  });

  it('should call updateUser and return an user ', () => {
    // 1
    service.updateUser(mockUser).subscribe((user) => {
      //2
      expect(user).toBeTruthy();
      expect(user).toBe(mockUser);
    });

    const mockHttp = httpController.expectOne(apiUrl + '/1');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('PUT');
  });

  it('should call updateUser and return an error ', () => {
    // 1
    service.updateUser(mockUser).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(404);
      },
    });

    const mockHttp = httpController.expectOne(apiUrl + '/1');
    mockHttp.flush('error request', {
      status: 404,
      statusText: 'Page not found',
    });
  });

  it('should call deleteUser and return an user ', () => {
    // 1
    service.deleteUser(1).subscribe((user) => {
      //2
      expect(user).toBeTruthy();
      expect(user).toBe(mockUser);
    });

    const mockHttp = httpController.expectOne(apiUrl + '/1');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('DELETE');
  });

  it('should call deleteUser and return an error ', () => {
    // 1
    service.deleteUser(123).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(404);
        expect(error.statusText).toBe('User with id 123 not found');
      },
    });

    const mockHttp = httpController.expectOne(apiUrl + '/123');
    mockHttp.flush('error request', {
      status: 404,
      statusText: 'User with id 123 not found',
    });
  });
});
