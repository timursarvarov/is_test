import NProgress from "nprogress";
import React, { useEffect } from "react";
import { useGetAllSavedUsersQuery } from "../../../redux/userAPI";
import { IUser } from "../../../shared/interfaces/user.interface";
import UserRow from "../../shared/UserRow";

//Should be in a .env file

const FetchUsersScreen: React.FC = () => {
	const { isLoading, isFetching, isError, isSuccess, error, data } =
		useGetAllSavedUsersQuery(
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
			<h1>Saved Users</h1>
			{data?.map((user: IUser) => (
				<UserRow user={user} key={user.email} />
			))}
		</>
	);
};

export default FetchUsersScreen;
