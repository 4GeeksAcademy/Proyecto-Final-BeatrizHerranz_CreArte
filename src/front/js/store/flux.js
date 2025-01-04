const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                { title: "FIRST", background: "white", initial: "white" },
                { title: "SECOND", background: "white", initial: "white" }
            ],
            favorites: [] 
        },
        actions: {
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.error("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            addFavorite: (course) => {
                const store = getStore();
                setStore({
                    favorites: [...store.favorites, course],
                });
            },
            removeFavorite: (courseId) => {
                const store = getStore();
                setStore({
                    favorites: store.favorites.filter(course => course.id !== courseId),
                });
            }
        }
    };
};

export default getState;
