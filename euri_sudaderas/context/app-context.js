import {useState, useEffect, createContext} from 'react';

export const AppContext = createContext([
    {},
    () => {}
]);

export const AppProvider = ( props ) => {

	const [ cart, setCart ] = useState( null );

	useEffect( () => {

		if ( process.browser ) {

			let cart = localStorage.getItem( 'cart' );
			cart = null !== cart ? parseInt(cart) : 0;
			setCart( cart );

		}

	}, [] );

	return (
		<AppContext.Provider value={ [ cart, setCart ] }>
			{ props.children }
		</AppContext.Provider>
	);
};