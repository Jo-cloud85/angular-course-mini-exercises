import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  serverElements = [{
    type: 'server', 
    name: 'Testserver', 
    content: 'This is a test server'}];

  /* These methods will only be executed after the button has been clicked and we are already done creating the server. */
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst() {
    this.serverElements[0].name='Changed';
  }

  /* When this method got called, ngFor re-ran and did not render the 1st element therefore
  it was removed from the DOM, and hence the component hook - ngOnDestroy was called. */
  onDestroyFirst() {
    this.serverElements.splice(0,1);
  }
}

