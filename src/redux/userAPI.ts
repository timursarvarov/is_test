import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import NProgress from "nprogress";
import { IUser } from "../shared/interfaces/user.interface";
import { IMutateUser, IUserResponse } from "./types";

//Should be in .env file

const dynamicBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, WebApi, extraOptions) => {
	const baseUrl =
		(WebApi.getState() as any)?.configuration?.baseUrl ??
		import.meta.env.VITE_FETCH_SAVED_USERS_URL;

	console.log(baseUrl);
	const rawBaseQuery = fetchBaseQuery({ baseUrl });
	return rawBaseQuery(args, WebApi, extraOptions);
};

export const userApiSlice = createApi({
	reducerPath: "UserAPI",
	baseQuery: dynamicBaseQuery,
	tagTypes: ["newUsers", "savedUsers"],
	endpoints: (builder) => ({
		updateUser: builder.mutation<
			IUserResponse,
			{ email: string; user: IMutateUser }
		>({
			query({ email, user }) {
				return {
					url: `/?email=${email}`,
					method: "PATCH",
					body: user,
				};
			},
			transformResponse: (response: { User: IUserResponse }) =>
				response.User,
			onQueryStarted(arg, api) {
				NProgress.start();
			},
			invalidatesTags: [{ type: "savedUsers", id: "LIST" }],
		}),
		getAllSavedUsers: builder.query<
			IUser[],
			{ page: number; limit: number }
		>({
			query({ page, limit }) {
				return {
					url: `/?page=${page}&limit=${limit}`,
				};
			},
			providesTags: (result) =>
				result
					? [
							...result.map(({ email }) => ({
								type: "savedUsers" as const,
								email,
							})),
							{ type: "savedUsers", id: "LIST" },
					  ]
					: [{ type: "savedUsers", id: "LIST" }],
			transformResponse: (res: { results: IUser[] }) => res.results,

			keepUnusedDataFor: 5,

			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),

		getAllNewUsers: builder.query<IUser[], { page: number; limit: number }>(
			{
				query({ page, limit }) {
					return {
						url: `/?offset=${page}&results=${limit}`,
					};
				},
				providesTags: (result) =>
					result
						? [
								...result.map(({ email }) => ({
									type: "newUsers" as const,
									email,
								})),
								{ type: "newUsers", id: "LIST" },
						  ]
						: [{ type: "newUsers", id: "LIST" }],
				transformResponse: (res: { results: IUser[] }) => {
					return res.results;
				},

				keepUnusedDataFor: 5,

				onQueryStarted(arg, api) {
					NProgress.start();
				},
			}
		),

		getOneNewUser: builder.query<IUser, { email: string }>({
			query({ email }) {
				return {
					url: `/?email=${email}`,
				};
			},
			providesTags: ["newUsers"],
			transformResponse: (res: { results: IUser[] }) => {
				return res.results[0];
			},

			keepUnusedDataFor: 5,

			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),

		getOneSavedUser: builder.query<IUser, { email: string }>({
			query({ email }) {
				return {
					url: `user/${email}`,
				};
			},
			transformResponse: (res: { results: IUser[] }) => {
				return res.results[0];
			},
			providesTags: ["savedUsers"],
			keepUnusedDataFor: 5,

			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),
		deleteUser: builder.mutation<IUserResponse, string>({
			query(id) {
				return {
					url: `/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags: [{ type: "savedUsers", id: "LIST" }],
			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),
	}),
});

export const {
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetAllSavedUsersQuery,
	useGetAllNewUsersQuery,
	useGetOneSavedUserQuery,
	useGetOneNewUserQuery,
} = userApiSlice;
