import { Component, Input} from '@angular/core';

import { LoggingService } from '../shared/logging.service';
import { AccountsService } from '../shared/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  // constructor(private loggingService: LoggingService,
  //             private accountsService: AccountsService) {}

  // onSetTo(status: string) {
  //   this.accountsService.updateStatus(this.id, status);
  //   this.loggingService.logStatusChange(status);
  // }


  /* So now we are not building any chain of property and event binding. We still
  have cross component communication through a service with the event emitter. */

  constructor(private accountsService: AccountsService) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    /* Since we inject the accountsService here where we set the new status, and 
    then call accountsService.statusUpdated.emit - we are emitting an event I set  
    up in the service. */
    this.accountsService.statusUpdated.emit(status);
  }
}
