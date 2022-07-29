import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
})
export class DetailedComponent implements OnInit {
  private errorCodes = {
    balanceIsNotEnough: 'Amount is greater than available user balance',
    cannotPurchase: 'You cannot purchase more of this box for the next 24 hours'
  }
  private OPEN_BOX: any = gql`
    mutation OpenBox($input: OpenBoxInput!) {
      openBox(input: $input) {
        boxOpenings {
          id
          itemVariant {
            id
            name
            value
          }
        }
      }
    }
`;



  commentsQuery!: QueryRef<any>;
  constructor(private activatedRoute: ActivatedRoute, private apollo: Apollo) {
  }

  private boxId!: string;
  private cost!: any;
  public boxDetails!: any;
  public errorCode!: string;
  public toggleLoader$: BehaviorSubject<any> = new BehaviorSubject<boolean>(true);

  queryRef!: QueryRef<any>;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.boxId = params.id;
    });
    this.getBoxDetails()
    this.queryRef = this.apollo.watchQuery({
      query: this.OPEN_BOX
    })
  }
  
  // Using subscription to get realtime data

  getBoxDetails() {
    this.apollo.mutate({
      mutation: this.OPEN_BOX,
      variables: {
        input: {
          boxId: this.boxId,
          amount: 1
        }
      }
    }).pipe(
      catchError((err) => {
        console.log(err);
        this.errorCode = "Please try another box"
        return throwError(err);
      })).subscribe((result: any) => {
        console.log(result)
        if (result.data?.openBox) {
          this.boxDetails = result.data.openBox.boxOpenings[0]
          console.log(this.boxDetails)
        }
        this.toggleLoader$.next(result.loading)
      })
  }

  showErrorCode(error: string) {
    switch (error) {
      case this.errorCodes.balanceIsNotEnough:
        this.errorCode = "You dont have enough balance"
        break;
      case this.errorCodes.cannotPurchase:
        this.errorCode = "You cannot purchase more of this box for the next 24 hours"
        break;

      default:
        break;
    }
  }
}
