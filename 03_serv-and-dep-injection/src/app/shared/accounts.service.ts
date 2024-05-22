import { Subject } from 'rxjs';
import { LoggingService } from './logging.service';
import { Injectable } from "@angular/core";

/* You use @Injectable when you want to inject a service into another service but technically 
you can still add this decorator even if you not doing so. */
@Injectable({providedIn: 'root'}) // new syntax
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Test account',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  /* A Subject object returns an Observable which you can subscribe to it like we are using in new-account.component.ts
  or simply just call on next() like in account.component.ts */
  statusUpdated = new Subject<string>();

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status})
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}