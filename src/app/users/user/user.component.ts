import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};
  paramsSubscription: Subscription
  constructor(private route: ActivatedRoute) { }
  //fetches route parameters reactively on click even and from url path
  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], //params and snapshot are methods built on the ActiveRoute import
      name: this.route.snapshot.params['name']
    };
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }
  //not necessary to destroy the subscription on route observables (params) but would be if its a custom observable
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
