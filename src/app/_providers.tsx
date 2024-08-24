import { getClient } from "@/apollo/apollo";
import { ApolloProvider } from "@apollo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = getClient();
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
}
