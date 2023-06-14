import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import NProgress from "nprogress";
import { IUser } from '../shared/interfaces/user.interface';

//Should be in .env file
const BASEURL = "http://localhost:3000/api/users";

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
	unknown,
	FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
		console.log(WebApi.getState())
		const baseUrl = (WebApi.getState() as any)?.configuration?.baseUrl ?? BASEURL;
		const rawBaseQuery = fetchBaseQuery({ baseUrl });
		return rawBaseQuery(args, WebApi, extraOptions);
	};



export const userAPI = createApi({
	reducerPath: "UserAPI",
	baseQuery: dynamicBaseQuery,
	tagTypes: ["Users"],
	endpoints: (builder) => ({

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
							type: "Users" as const,
							email,
						})),
						{ type: "Users", id: "LIST" },
					]
					: [{ type: "Users", id: "LIST" }],
			transformResponse: (res: { results: IUser[] }) => {
				console.log(res)
				return res.results
			},

			keepUnusedDataFor: 5,

			onQueryStarted(arg, api) {
				NProgress.start();
			},
		}),


	}),
});

export const {
	useGetAllNewUsersQuery
} = userAPI;
