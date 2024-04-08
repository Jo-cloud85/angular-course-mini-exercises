import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    ResolveFn
  } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { ServersService } from '../servers.service';
   
interface Server {
	id: number;
	name: string;
	status: string;
}

// ResolveFn is a generic type and it should wrap whichever item or data field you 
// will get here
export const serverResolver: ResolveFn<Server> = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
): 
	Observable<Server> | Promise<Server> | Server => {
		return inject(ServersService).getServer(+route.params['id']);
	};

	
// Because Resolve is deprecated, you cannot implement the code like below which is according 
// to the lecture
// @Injectable()
// export class ServerResolver implements ResolveFn<Server> {

// 	constructor(private serversService: ServersService) {}

// 	resolve(
// 		route: ActivatedRouteSnapshot,
// 		state: RouterStateSnapshot
// 	): Observable<Server> | Promise<Server> | Server {
// 		return this.serversService.getServer(+route.params['id'])
// 	}
// }