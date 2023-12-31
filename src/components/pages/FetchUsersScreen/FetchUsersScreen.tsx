import NProgress from "nprogress";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBaseUrl } from "../../../redux/store";
import { useGetAllNewUsersQuery } from "../../../redux/userAPI";
import { IUser } from "../../../shared/interfaces/user.interface";
import UserRow from "../../shared/UserRow/UserRow";

const FetchUsersScreen: React.FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const setUrl = async () => {
			dispatch(setBaseUrl(import.meta.env.VITE_FETCH_USERS_URL)); // Dispatch the action to set the baseUrl
		};
		setUrl();
		return () => {
			dispatch(setBaseUrl(import.meta.env.VITE_FETCH_SAVED_USERS_URL));
		};
	}, []);

	const { isLoading, isFetching, isError, isSuccess, error, data } =
		useGetAllNewUsersQuery(
			{ page: 1, limit: 10 },
			{ refetchOnFocus: true, refetchOnReconnect: true }
		);

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (isSuccess) {
			NProgress.done();
		}

		if (isError) {
			console.log(error);
			NProgress.done();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return (
		<>
			{data?.toString()}
			<h1>Fetched Users</h1>
			{data?.map((user: IUser) => (
				<UserRow user={user} key={user.email} />
			))}
		</>
	);
};

export default FetchUsersScreen;
