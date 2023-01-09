import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;
  isMobile = window.innerWidth <= environment.mobileWidth ? true : false;
  errorObject = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id !== null) {
        this.user$ = this.userService.getUser(parseInt(id)).pipe(
          catchError((err) => {
            this.errorObject = err.message;
            return of();
          })
        );
      }
    });
  }
}
