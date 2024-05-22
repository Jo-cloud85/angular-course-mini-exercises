import { Subscription } from 'rxjs';
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

  private sub: Subscription;

  constructor(private accountsService: AccountsService,
              private loggingService: LoggingService) {
    this.sub = this.accountsService.statusUpdated.subscribe({
      next: (status: string) => alert('New Status: ' + status),
      error: (err: string) => alert('Error with adding new server' + err),
      complete: () => this.sub.unsubscribe()
    })
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}
