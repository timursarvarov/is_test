import { createBrowserRouter, useLoaderData } from "react-router-dom";
import FetchUsersScreen, {
	usersLoader,
} from "../components/pages/FetchUsersScreen/FetchUsersScreen";
import HomeScreen from "../components/pages/HomeScreen/HomeScreen";

export const router = createBrowserRouter([
	{
		path: "/",
		loader: () => ({ message: "Hello Data Router!" }),
		Component() {
			const data = useLoaderData() as { message: string };
			return <HomeScreen />;
		},
	},
	{
		path: "/fetch-users",
		loader: usersLoader,
		Component() {
			// const data = useLoaderData();
			return <FetchUsersScreen />;
		},
	},
]);
