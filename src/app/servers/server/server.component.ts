import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};


  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //uses the service-resolver.service to map the data when the route is loaded using the Data observable returned by the resolver asynchronously ** this is dynamically loaded data rather than what is fetched using query params in the comment below. Like making an HTTP request.
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server']; //'server' comes from the 'resolve' object we added to the app-routing file for when a user navigates to the 'Servers' route
      }
    );
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
