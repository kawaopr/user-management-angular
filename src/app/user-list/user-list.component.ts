import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, of } from 'rxjs';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  isMobile = window.innerWidth < environment.mobileWidth ? true : false;
  showDeletedText = false;
  deletedText: string;
  errorObject = null;
  private screenWidth = window.innerWidth;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().pipe(
      catchError((error) => {
        this.errorObject = error.message;
        return of();
      })
    );
    this.isMobile = this.screenWidth < environment.mobileWidth ? true : false;
  }

  /**
   * Listen for changing width (for responsive design) and go to correct url if changing width
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.isMobile = this.screenWidth < environment.mobileWidth ? true : false;
    const url = this.isMobile ? '/user-list' : '/user-list/user-detail/1';
    this.router.navigateByUrl(url);
  }

  /**
   * Deleting user: ask for a deleting confirmation and after the user allow it, delete an user by it's id
   * @param id
   */
  deleteUser(id: number) {
    const confirmResponse = confirm(
      'Are you sure you want to delete the user?'
    );
    if (confirmResponse) {
      this.userService.deleteUser(id).subscribe((user: User) => {
        this.showDeletedText = true;
        if (user.isDeleted) {
          this.deletedText = 'User successfully deleted';
        } else {
          this.deletedText = 'Oops an error ocurred';
        }
        setTimeout(() => {
          this.showDeletedText = false;
        }, 3000);
      });
    }
  }
}
