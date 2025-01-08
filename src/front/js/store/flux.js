const getState = ({ getStore, setStore }) => {
    return {
        store: {
            favorites: [],
            cart: [],
        },
        actions: {
            // Añadir al carrito 
            addToCart: (item) => {
                const store = getStore();
            
                const itemInCart = store.cart.find((cartItem) => cartItem.id === item.id);

                if (itemInCart) {
          
                    const updatedCart = store.cart.map((cartItem) =>
                        cartItem.id === item.id ? { ...cartItem, cantidad: cartItem.cantidad + 1 } : cartItem
                    );
                    setStore({ cart: updatedCart });
                } else {
               
                    setStore({ cart: [...store.cart, { ...item, cantidad: 1 }] });
                }
                alert(`${item.nombre} añadido al carrito.`);
            },

            // Eliminar del carrito
            removeFromCart: (id) => {
                const store = getStore();
                const updatedCart = store.cart.filter((item) => item.id !== id);
                setStore({ cart: updatedCart });
                alert("Artículo eliminado del carrito.");
            },
            // Añadir a favoritos
            addToFavorites: (item) => {
                const store = getStore();
                if (!store.favorites.some((favItem) => favItem.id === item.id)) {
                    setStore({ favorites: [...store.favorites, item] });
                    alert(`${item.nombre} añadido a favoritos.`);
                } else {
                    alert(`${item.nombre} ya está en favoritos.`);
                }
            },

            // Eliminar de favoritos
            removeFromFavorites: (id) => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter((item) => item.id !== id) });
                alert("Artículo eliminado de favoritos.");
            },
        },
    };
};

export default getState;
