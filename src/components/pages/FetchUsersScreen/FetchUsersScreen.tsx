import React from "react";
import { defer, useLoaderData } from "react-router-dom";
import { fetchUsers } from "../../../services/conduit";
import { User } from "../../../shared/interfaces/User.interface";
import UserRow from '../../shared/UserRow';

export const usersLoader = async () => {
	const users = await fetchUsers();
	return defer({ users });
};

const FetchUsersScreen: React.FC = () => {
	const data = useLoaderData() as { users: User[] };

	return (
		<>
		<h1>Fetched Users</h1>
			{data?.users?.map((user: User) => (
				<UserRow user={user} key={user.email} />
			))}
		</>
	);
};

export default FetchUsersScreen;
