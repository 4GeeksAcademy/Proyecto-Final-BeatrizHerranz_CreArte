const getState = ({ getStore, setStore }) => {
    return {
        store: {
            favorites: [],
            cart: [],
            user: null,
            error: null,
            loading: false
        },
        actions: {
            // Registro de usuario
            registerUser: async (userData) => {
                try {
                    setStore({ loading: true, error: null });
                    const response = await fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/registrar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData)
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || 'Error en el registro');
                    setStore({ user: data.user });
                    return true;
                } catch (error) {
                    setStore({ error: error.message });
                    return false;
                } finally {
                    setStore({ loading: false });
                }
            },
            // Login de usuario
            loginUser: async (credentials) => {
                try {
                    setStore({ loading: true, error: null });
                    const response = await fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || 'Error en el login');
                    setStore({ user: data.user });
                    return true;
                } catch (error) {
                    setStore({ error: error.message });
                    return false;
                } finally {
                    setStore({ loading: false });
                }
            },
            // Añadir al carrito
            addToCart: async (item) => {
                const store = getStore();
                try {
                    const existingItem = store.cart.find(i => i.id === item.id);
                    let updatedCart;
                    if (existingItem) {
                        updatedCart = store.cart.map(i =>
                            i.id === item.id
                                ? { ...i, cantidad: (i.cantidad || 1) + 1 }
                                : i
                        );
                    } else {
                        updatedCart = [...store.cart, { ...item, cantidad: 1 }];
                    }
                    setStore({ cart: updatedCart });
                    // Persistir en backend si hay usuario
                    if (store.user?.token) {
                        await fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${store.user.token}`
                            },
                            body: JSON.stringify({ cart: updatedCart })
                        });
                    }
                } catch (error) {
                    console.error('Error al actualizar carrito:', error);
                }
            },
            // Actualizar cantidad en carrito
            updateCartQuantity: async (itemId, newQuantity) => {
                const store = getStore();
                try {
                    if (newQuantity < 1) return;
                    const updatedCart = store.cart.map(item =>
                        item.id === itemId
                            ? { ...item, cantidad: parseInt(newQuantity) }
                            : item
                    );
                    setStore({ cart: updatedCart });
                    // Persistir en backend si hay usuario
                    if (store.user?.token) {
                        await fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${store.user.token}`
                            },
                            body: JSON.stringify({ cart: updatedCart })
                        });
                    }
                } catch (error) {
                    console.error('Error al actualizar cantidad:', error);
                }
            },
            // Eliminar del carrito
            removeFromCart: async (itemId) => {
                const store = getStore();
                try {
                    const updatedCart = store.cart.filter(item => item.id !== itemId);
                    setStore({ cart: updatedCart });
                    // Persistir en backend si hay usuario
                    if (store.user?.token) {
                        await fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${store.user.token}`
                            },
                            body: JSON.stringify({ cart: updatedCart })
                        });
                    }
                } catch (error) {
                    console.error('Error al eliminar del carrito:', error);
                }
            },
            // Toggle favoritos (añadir/quitar)
            toggleFavorite: async (item) => {
                const store = getStore();
                try {
                    const isFavorite = store.favorites.some(fav => fav.id === item.id);
                    let updatedFavorites;
                    if (isFavorite) {
                        updatedFavorites = store.favorites.filter(fav => fav.id !== item.id);
                    } else {
                        updatedFavorites = [...store.favorites, item];
                    }
                    setStore({ favorites: updatedFavorites });
                    // Persistir en backend si hay usuario
                    if (store.user?.token) {
                        await fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/favorites', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${store.user.token}`
                            },
                            body: JSON.stringify({ favorites: updatedFavorites })
                        });
                    }
                } catch (error) {
                    console.error('Error al actualizar favoritos:', error);
                }
            },
            // Cargar datos iniciales del usuario
            loadUserData: async () => {
                const store = getStore();
                if (store.user?.token) {
                    try {
                        setStore({ loading: true });
                        const [cartResponse, favoritesResponse] = await Promise.all([
                            fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/cart', {
                                headers: {
                                    'Authorization': `Bearer ${store.user.token}`
                                }
                            }),
                            fetch('https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/favorites', {
                                headers: {
                                    'Authorization': `Bearer ${store.user.token}`
                                }
                            })
                        ]);
                        if (cartResponse.ok) {
                            const cartData = await cartResponse.json();
                            setStore({ cart: cartData.cart });
                        }
                        if (favoritesResponse.ok) {
                            const favoritesData = await favoritesResponse.json();
                            setStore({ favorites: favoritesData.favorites });
                        }
                    } catch (error) {
                        console.error('Error al cargar datos:', error);
                    } finally {
                        setStore({ loading: false });
                    }
                }
            }
        }
    };
};
export default getState;