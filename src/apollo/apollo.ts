import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import ws from "ws";

export const getClient = (): ApolloClient<NormalizedCacheObject> => {
  type ClientOptionsWithReconnect = {
    url: string;
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": string;
      };
    };
    webSocketImpl:
      | typeof ws
      | {
          new (
            url: string | URL,
            protocols?: string | string[] | undefined
          ): WebSocket;
          readonly CLOSED: number;
          readonly CLOSING: number;
          readonly CONNECTING: number;
          readonly OPEN: number;
        };
    reconnect: boolean;
  };

  const httpLink = new HttpLink({
    uri: `https://${process.env.NEXT_PUBLIC_HASURA_URL}`,
    headers: {
      "x-hasura-admin-secret":
        process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `wss://${process}`,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
      },
      reconnect: true,
      webSocketImpl: typeof window === "undefined" ? ws : WebSocket,
    } as ClientOptionsWithReconnect)
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};
