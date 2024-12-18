import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "../pages/login";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{ !store.token ?
						<Link to="/login">
							<button className="btn btn-primary">Log in</button>
					</Link>
					:
					<button onClick={() => actions.logout()} className="btn btn-primary">Log out</button>
					}
				</div>
			</div>
		</nav>
	);
};
