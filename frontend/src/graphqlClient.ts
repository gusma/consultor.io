// graphqlClient.ts

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

async function graphqlRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const GRAPHQL_URL = 'http://localhost:3001/graphql';

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('GraphQL Error Response:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors.map(e => e.message).join(', '));
    }

    if (!result.data) {
      throw new Error('No data returned from GraphQL server');
    }

    return result.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default graphqlRequest;