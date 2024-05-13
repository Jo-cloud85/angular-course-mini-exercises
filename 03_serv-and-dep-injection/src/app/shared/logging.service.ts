import { Injectable } from "@angular/core";

/* Even though you use @Injectable when you want to inject a service into another service but 
technically you can still add this decorator even if you not doing so. */
@Injectable()
export class LoggingService {
    logStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status);
    }
}