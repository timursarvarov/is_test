import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import NProgress from "nprogress";
import { IUser } from '../shared/interfaces/user.interface';

//Should be in .env file


const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
	unknown,
	FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
		const baseUrl = (WebApi.getState() as any)?.configuration?.baseUrl ?? import.meta.env.VITE_FETCH_SAVED_USERS_URL;

		console.log(baseUrl)
		const rawBaseQuery = fetchBaseQuery({ baseUrl });
		return rawBaseQuery(args, WebApi, extraOptions);
	};



export const userApiSlice = createApi({
	reducerPath: "UserAPI",
	baseQuery: dynamicBaseQuery,
	tagTypes: ["newUsers", "savedUsers"],
	endpoints: (builder) => ({

		getAllSavedUsers: builder.query<IUser[], { page: number; limit: number }>({
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



		getAllNewUsers: builder.query<IUser[], { page: number; limit: number }>({
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
				return res.results
			},

			keepUnusedDataFor: 5,

			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),

		getOneNewUser: builder.query<IUser, { email: string }>({
			query({ email }) {
				return {
					url: `/?email=${email}`,
				};
			},
			transformResponse: (res: { results: IUser[] }) => {
				return res.results[0]
			},

			keepUnusedDataFor: 5,

			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),

		getOneSavedUser: builder.query<IUser, { email: string }>({
			query({ email }) {
				return {
					url: `/?email=${email}`,
				};
			},
			transformResponse: (res: { results: IUser[] }) => {
				return res.results[0]
			},

			keepUnusedDataFor: 5,

			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),


	}),
});

export const {
	useGetAllSavedUsersQuery,
	useGetAllNewUsersQuery,
	useGetOneSavedUserQuery,
	useGetOneNewUserQuery
} = userApiSlice;