import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // Receiving from a PParent into Child component
  // @Input() usersFromHomeComponent: any;
  // Sending from Child to Parent component, emitting events.
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  register() {
    // subscribes to get the response from the service.
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (error) => console.log(error)
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
