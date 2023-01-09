import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  showSaveUserText = false;
  saveUserText: string;
  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, this.dateValidator.bind(this)]],
    gender: ['', [Validators.required]],
  });
  genders = ['male', 'female'];
  userId: number;
  today = new Date().toISOString().split('T')[0];
  minDate = new Date('1910-01-01').toISOString().split('T')[0];
  dateValue: string;
  title: string;
  errorObject: string;
  private isUpdateUser: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id !== null) {
        this.userId = parseInt(id);
        this.loadUser();
      } else {
        this.isUpdateUser = false;
        this.title = 'Create new user';
      }
    });
  }

  /**
   * Load the user data if the form is used for updating an user. If the url has an id as parameter, then
   * the form is used for updating an user.
   */
  loadUser() {
    this.isUpdateUser = true;
    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.userForm.setValue({
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          email: user.email,
          birthDate: new Date(user.birthDate).toISOString().split('T')[0],
        });
        this.userId = user.id;
        this.title = 'Update user with id: ' + this.userId;
      },
      error: (error) => {
        this.errorObject = error.message;
        return of();
      },
    });
  }

  /**
   * Validator for the birthday in the user form. The birthday should be between today and 1.1.1910.
   * @param control
   * @returns error message if there is an invalid date
   */
  dateValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value) {
      const date = new Date(control.value);
      const today = new Date();
      const minBirthday = new Date(this.minDate);
      if (date > today || date < minBirthday) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  /**
   * Check if it is a new user or update an user and send the data to the api
   */
  saveUser() {
    if (this.userForm.invalid) {
      return;
    }

    const user = this.getUserDataFromForm();

    if (this.isUpdateUser) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

  /**
   * Get the data from the form
   * @returns
   */
  getUserDataFromForm(): User {
    const user: User = {
      id: this.userId,
      firstName: this.userForm.get('firstName')!.value,
      lastName: this.userForm.get('lastName')!.value,
      birthDate: new Date(this.userForm.get('birthDate')!.value).toDateString(),
      gender: this.userForm.get('gender')!.value === 'male' ? 'male' : 'female',
      email: this.userForm.get('email')!.value,
    };
    return user;
  }

  /**
   * Update the data of an existing user and send the updated data to the api. At success it
   * show an message otherwise it shows an error message.
   * @param user
   */
  updateUser(user: User) {
    this.userService.updateUser(user).subscribe({
      next: (response: User) => {
        this.saveUserText = 'User successfully updated';
        this.showSaveUserText = true;

        setTimeout(() => {
          this.showSaveUserText = false;
          this.resetForm();
          this.loadUser();
        }, 3000);
      },
      error: (error: any) => {
        this.errorObject = 'Error on updating: ' + error.message;
        return of();
      },
    });
  }

  /**
   * Send the data of the new user to the api. At success it show an message otherwise an error message
   * @param user
   */
  createUser(user: User) {
    this.userService.addUser(user).subscribe({
      next: (response: User) => {
        this.saveUserText = 'User successfully created';
        this.showSaveUserText = true;
        setTimeout(() => {
          this.showSaveUserText = false;
          this.resetForm();
        }, 3000);
      },
      error: (error: any) => {
        this.errorObject = 'Error on creating: ' + error.message;
        return of();
      },
    });
  }

  /**
   * Reset the form
   */
  resetForm() {
    this.userForm.reset();
  }
}
