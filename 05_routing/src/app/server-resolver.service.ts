import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    ResolveFn
  } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { ServersService } from './servers/servers.service';
   
  interface Server {
    id: number;
    name: string;
    status: string;
  }
   
  export const serverResolver: ResolveFn<Server> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
    Observable<Server> | Promise<Server> | Server => {
    return inject(ServersService).getServer(+route.params['id']);
  };