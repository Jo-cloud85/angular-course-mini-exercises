import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

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
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
