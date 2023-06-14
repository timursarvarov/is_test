import React from "react";
import { Link } from "react-router-dom";

const HomeScreen: React.FC = () => {
	return (
		<div>
			<div>
				<Link to="/fetch-users">Fetch Users</Link>
			</div>
			<div>
				<Link to="/saved-users">Saved Users</Link>
			</div>
		</div>
	);
};

export default HomeScreen;
