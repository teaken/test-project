import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent implements OnInit {


  private GET_BOXES = gql`
  query GetBoxes {
    boxes(free: false, purchasable: true, openable: true) {
      edges {
        node {
          id
          name
          iconUrl
          cost
        }
      }
  }
}
`;


  public loading: boolean = true;
  public boxesResult!: any;
  constructor(private apollo: Apollo) { }


  ngOnInit(): void {
    this.boxesResult = this.apollo.watchQuery<any>({
      query: this.GET_BOXES
    }).valueChanges.pipe(
      map((result: any) => result.data.boxes.edges),
      tap(() => {
        this.loading = false;
      })
    ); 
  }

}
