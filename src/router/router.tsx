import { createBrowserRouter } from "react-router-dom";
import FetchUsersScreen from "../components/pages/FetchUsersScreen/FetchUsersScreen";
import HomeScreen from "../components/pages/HomeScreen/HomeScreen";
import SavedUsersScreen from "../components/pages/SavedUsersScreen/SavedUsersScreen";

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
	{
		path: "/saved-users",
		Component() {
			return <SavedUsersScreen />;
		},
	},
]);
