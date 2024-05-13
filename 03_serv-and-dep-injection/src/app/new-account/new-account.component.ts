import { AccountsService } from '../shared/accounts.service';
import { LoggingService } from '../shared/logging.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {

  /* This informs Angular that we will need an instance of this LoggingService */
  // constructor(private loggingService: LoggingService,
  //             private accountsService: AccountsService) {}

  // onCreateAccount(accountName: string, accountStatus: string) {
  //   this.accountsService.addAccount(accountName, accountStatus);
  //   this.loggingService.logStatusChange(accountStatus);
  // }

  constructor(private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    )
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // this.accountsService.statusUpdated.emit(accountStatus);
  }
}
