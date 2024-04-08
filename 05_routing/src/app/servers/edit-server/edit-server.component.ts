import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-edit-server',
	templateUrl: './edit-server.component.html',
	styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
	server: {id: number, name: string, status: string};
	serverName = '';
	serverStatus = '';
	allowEdit = false;
	changesSaved = false;

	constructor(private serversService: ServersService,
							private route: ActivatedRoute,
							private router: Router) { }

	ngOnInit() {
		/* This is only run or updated at the time this component is created. So if there is a chance 
		of changing your queryParam from the page you're currently on you might not want to use this 
		approach because it won't be reactive, it won't display or allow you to react to any changes 
		which have after this component has been loaded. */
		console.log(this.route.snapshot.queryParams);
		console.log(this.route.snapshot.fragment);

		/* The alternative of course, is to use the route and have queryParam and fragment as an 
		observable and subscribe to them respectively. This will allow you to react to react to 
		change in query parameters. */
		this.route.queryParams
			.subscribe(
				(queryParams: Params) => {
					this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
				}
		);
		this.route.fragment.subscribe();

		// Rmb the '+' is the convert the string to number
		const id = +this.route.snapshot.params['id'];
		this.server = this.serversService.getServer(id);
		// Subscribe route params to update the id if params change
		this.route.params
		.subscribe(
			(params: Params) => {
				this.server = this.serversService.getServer(+params['id']);
			}
	)
		this.serverName = this.server.name;
		this.serverStatus = this.server.status;
	}

	onUpdateServer() {
		this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
		this.changesSaved = true;
		this.router.navigate(['../'], { relativeTo: this.route });
	}

	/* We now provide the logic on deciding whether we are allowed to leave or not. This logic will be
	run whenever the canDeactivateGuard is checked by the @angular/router. */
	canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.allowEdit) {
			return true;
		}
		
		if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) 
				&& !this.changesSaved) {
			return confirm('Do you want to discard the changes?');
		} else {
			return true;
		}
	}
}
