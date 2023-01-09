import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
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
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [UserDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fakeUserService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get user', () => {
    component.user$.subscribe((user) => {
      expect(user).toBe(testUser);
    });
  });
});
