import { login } from "../pages/login";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			/**
			 * Example function to change color
			 */
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Aplication just loaded, synching the session storage token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login out");
				setStore({ token: null });
			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				};

				try {
					const resp = await fetch('https://symmetrical-pancake-4jq4jqgp4w74cjvrx-3001.app.github.dev/api/token', opts);
					if (resp.status !== 200) {
						const errorMessage = await resp.json();
						console.error("Login error:", errorMessage);
						alert("There has been some error: " + errorMessage.message);
						return false;
					}
					

					const data = await resp.json();
					console.log("This came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;

				}
				catch (error) {
					console.error("There has been an error logging in", error);
				}
				
			},

			/**
			 * Get message from backend
			 */
			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				// fetching data from the beckend
				fetch("https://symmetrical-pancake-4jq4jqgp4w74cjvrx-3001.app.github.dev/api/hello", opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading messege from backend", error));
			},
			changeColor: (index, color) => {
				const store = getStore();

				const updatedDemo = store.demo.map((element, i) => {
					if (i === index) {
						return { ...element, background: color };
					}
					return element;
				});

				setStore({ demo: updatedDemo });
			}
		}
	};
};

export default getState;
