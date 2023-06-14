import { createBrowserRouter } from "react-router-dom";
import FetchUsersScreen from "../components/pages/FetchUsersScreen/FetchUsersScreen";
import HomeScreen from "../components/pages/HomeScreen/HomeScreen";

export const router = createBrowserRouter([
	{
		path: "/",
		Component() {
			return <HomeScreen />;
		},
	},
	{
		path: "/fetch-users",
		Component() {
			return <FetchUsersScreen />;
		},
	},
]);
