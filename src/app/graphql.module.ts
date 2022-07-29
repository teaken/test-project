import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_FLAGS, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from 'apollo-link';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = 'https://api-staging.csgoroll.com/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri, withCredentials: true }) as any
  const ws = new WebSocketLink({
    uri: `ws://api-staging.csgoroll.com/graphql`,
    options: {
      reconnect: true,
    },
  }) as any;

  const link = split(({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  }, ws, http);

  return {
    link: (link as any),

    credentials: 'include',
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_FLAGS,
      useValue: {
        useMutationLoading: true, // enable it here
      },
    },
    {
      provide: APOLLO_OPTIONS,
      
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
