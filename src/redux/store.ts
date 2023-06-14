import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userAPI } from "./userAPI";


const configurationSlice = createSlice({
	name: "configuration",
	initialState: {
		baseUrl: "", // Set the initial baseUrl value here
	},
	reducers: {
		setBaseUrl: (state, action) => {
			state.baseUrl = action.payload;
		},
	},
});

export const store = configureStore({
	reducer: {
		configuration: configurationSlice.reducer,
		[userAPI.reducerPath]: userAPI.reducer,
	},
	devTools: process.env.NODE_ENV === "development",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([userAPI.middleware]),
});

setupListeners(store.dispatch);

export const { setBaseUrl } = configurationSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
