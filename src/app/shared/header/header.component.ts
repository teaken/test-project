import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, Query, QueryRef } from 'apollo-angular';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private CURRENT_USER = gql`
      query {
        currentUser {
          id
          name
          wallets {
            id
            amount
            currency
          }
      }
    }
  `
  private WALLET_SUBSCRIPTION = gql`
  subscription OnUpdateWallet {
    updateWallet {
      wallet {
        id
        amount
        name
      }
    }
  }
  `


  private querySubscription$!: Subscription;
  public currentUser: any;
  public userBalance: number = 0;
  public currentUserQuery!: QueryRef<any>;
  public currentUserDetails!: any;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    this.currentUserQuery = this.apollo.watchQuery<any>({
      query: this.CURRENT_USER
    })

    this.currentUserQuery.valueChanges.pipe(
      map((result: any) => result.data.currentUser)
    ).subscribe((val) => {
      this.sumUserBalance(val.wallets)
      this.currentUserDetails = val;
    })

    this.subscribeWalet()
  }

  sumUserBalance(balanceArray: any) {
    for (let index = 0; index < balanceArray.length; index++) {
      const balance = balanceArray[index];
      this.userBalance += balance.amount
    }
  }
  subscribeWalet() {
    this.currentUserQuery.subscribeToMore({
      document: this.WALLET_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData.data);
      }
    })
  }

  ngOnDestroy(): void {
    this.querySubscription$.unsubscribe()
  }

}
