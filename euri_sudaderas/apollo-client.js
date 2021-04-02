import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, from } from "@apollo/client";

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const sessionLink = new ApolloLink( ( operation, forward ) => {
	/**
	 * If session data exist in local storage, set value as session header.
	 */
	const session = ( process.browser ) ?  localStorage.getItem( "woo-session" ) : null;

	if ( session ) {
		operation.setContext( ( { headers = {} } ) => ( {
			headers: {
				"woocommerce-session": `Session ${ session }`
			}
		} ) );
	}

  
  /**
   * Afterware operation.
   *
   * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
   */
	return forward( operation ).map( response => {
		/**
		 * Check for session header and update session in local storage accordingly.
		 */
		const context = operation.getContext();
		const { response: { headers } }  = context;
		const session = headers.get( "woocommerce-session" );

		if ( session ) {

			// Remove session data if session destroyed.
			if ( "false" === session ) {

				localStorage.removeItem( "woo-session" );

				// Update session new data if changed.
			} else if ( localStorage.getItem( "woo-session" ) !== session ) {

				localStorage.setItem( "woo-session", headers.get( "woocommerce-session" ) );

			}
		}

		return response;

	} );

} );


const client = new ApolloClient({
  link: from([
    sessionLink,
    new HttpLink({ uri: 'https://wordpress.eurielec.etsit.upm.es/graphql' })
  ]),
  cache: new InMemoryCache()
});

export default client;
