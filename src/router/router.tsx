import { createBrowserRouter } from "react-router-dom";
import FetchUsersScreen from "../components/pages/FetchUsersScreen/FetchUsersScreen";
import HomeScreen from "../components/pages/HomeScreen/HomeScreen";
import SavedUsersScreen from "../components/pages/SavedUsersScreen/SavedUsersScreen";
import UserProfileScreen from "../components/pages/UserProfileScreen/UserProfileScreen";

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
	{
		path: "/user",
		Component() {
			return <UserProfileScreen />;
		},
	},
	{
		path: "/user/:email",
		Component() {
			return <UserProfileScreen />;
		},
	},
]);
