import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { BehaviorSubject, of } from 'rxjs';

import { AddEditUserComponent } from './add-edit-user.component';

describe('AddEditUserComponent: Add new user', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;
  const addUser: User = {
    id: 101,
    firstName: 'Test',
    lastName: 'User',
    gender: 'male',
    email: 'atuny0@sohu.com',
    birthDate: '2002-12-25',
  };
  const testUser: User = {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    gender: 'male',
    email: 'atuny0@sohu.com',
    birthDate: '2000-12-25',
  };
  let fakeUserService = {
    getUser: (id: number) => new BehaviorSubject<User>(testUser).asObservable(),
    addUser: (user: User) => new BehaviorSubject<User>(addUser).asObservable(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: null,
              })
            ),
          },
        },
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid first name', () => {
    component.userForm.setValue({
      firstName: '',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Us',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Use',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require valid last name', () => {
    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'T',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Us',
      email: 'valid@mail.de',
      lastName: 'Te',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Use',
      email: 'valid@mail.de',
      lastName: 'Tes',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require valid email', () => {
    component.userForm.setValue({
      firstName: 'User',
      email: '@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'mal',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'invalid@',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'mal',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'mal',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require valid birthday', () => {
    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2023-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '1909-12-31',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '1990-10-08',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require an empty form if no id is in url', () => {
    expect(component.userForm.valid).toEqual(false);

    expect(component.userForm.value).toEqual({
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
    });
  });
});

describe('AddEditUserComponent: Edit user', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;

  const testUser: User = {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    gender: 'male',
    email: 'atuny0@sohu.com',
    birthDate: '2000-12-25',
  };
  let fakeUserService = {
    getUser: (id: number) => new BehaviorSubject<User>(testUser).asObservable(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: '1',
              })
            ),
          },
        },
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require an empty form after reset', () => {
    component.resetForm();
    expect(component.userForm.valid).toEqual(false);
    expect(component.userForm.value).toEqual({
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      email: '',
    });
  });

  it('should require valid first name', () => {
    component.userForm.setValue({
      firstName: '',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Us',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Use',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require valid last name', () => {
    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'T',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Us',
      email: 'valid@mail.de',
      lastName: 'Te',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'Use',
      email: 'valid@mail.de',
      lastName: 'Tes',
      birthDate: '2022-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require valid email', () => {
    component.userForm.setValue({
      firstName: 'User',
      email: '@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'mal',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'invalid@',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'mal',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2022-12-12',
      gender: 'mal',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require valid birthday', () => {
    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '2023-12-12',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '1909-12-31',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(false);

    component.userForm.setValue({
      firstName: 'User',
      email: 'valid@mail.de',
      lastName: 'Test',
      birthDate: '1990-10-08',
      gender: 'male',
    });

    expect(component.userForm.valid).toEqual(true);
  });

  it('should require a not empty form if no id is in url', async () => {
    expect(component.userForm.valid).toEqual(true);

    expect(component.userForm.value).toEqual({
      firstName: 'Terry',
      lastName: 'Medhurst',
      gender: 'male',
      email: 'atuny0@sohu.com',
      birthDate: '2000-12-25',
    });
  });
});
