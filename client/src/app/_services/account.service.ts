import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   baseUrl = environment.apiUrl;
   // Creates Observable for User (buffer), 1 is the size of the buffer.
   private currentUserSource = new ReplaySubject<User>(1);
   currentUser$ = this.currentUserSource.asObservable();

   constructor(private http: HttpClient) {}

   login(model: any) {
      // Uses pipe to enable RxJs functions, such as map to transform data from an Observable.
      return this.http.post(this.baseUrl + 'account/login', model).pipe(
         map((response: User) => {
            const user = response;
            if (user) {
               this.setCurrentUser(user);
            }
         })
      );
   }

   register(model: any) {
      return this.http.post(this.baseUrl + 'account/register', model).pipe(
         map((user: User) => {
            if (user) {
               this.setCurrentUser(user);
            }
         })
      );
   }

   setCurrentUser(user: User) {
      // Stores in the browser local storage
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
   }

   logout() {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
   }
}
