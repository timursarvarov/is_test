import NProgress from "nprogress";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBaseUrl } from "../../../redux/store";
import {
	useGetAllNewUsersQuery,
	useGetOneNewUserQuery,
	useGetOneSavedUserQuery,
	useUpdateUserMutation,
} from "../../../redux/userAPI";
import { IUser } from "../../../shared/interfaces/user.interface";

const UserProfileScreen: FC = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const [editableName, setEditableName] = useState("");
	const [canFetchNew, setCanFetchNew] = useState(false);
	const [canFetchSaved, setCanFetchSaved] = useState(false);
	const [updateUser] = useUpdateUserMutation();

	const handleNameChange = (event: { target: { value: any } }) => {
		setEditableName(event.target.value);
	};
	useGetAllNewUsersQuery;

	const email = location.search.split("=")[1];
	console.log(email);

	const {
		isSuccess: isSuccessOfNew,
		isLoading: loadingOfNew,
		isFetching: isFetchingOfNew,
		error: errorOfNew,
		data: newUser,
	} = useGetOneNewUserQuery(
		{
			email: email!,
		},
		{ skip: !canFetchNew }
	);

	const {
		isSuccess: isSuccessOfSaved,
		isFetching: isFetchingOfSaved,
		isLoading: loadingOfSaved,
		error: errorOfSaved,
		data: savedUser,
	} = useGetOneSavedUserQuery(
		{
			email: email!,
		},
		{ skip: !canFetchSaved }
	);

	const loading =
		loadingOfNew || loadingOfSaved || isFetchingOfSaved || isFetchingOfNew;
	const success = isSuccessOfSaved || isSuccessOfNew;
	const error = errorOfNew || errorOfSaved;
	const dispatch = useDispatch();

	const setUrl = (url: string) => {
		const dispatchUrl = async () => {
			dispatch(setBaseUrl(url));
		};
		dispatchUrl();
	};

	useEffect(() => {
		if (success) {
			NProgress.done();
		}

		if (!success && error) {
			NProgress.done();
		}
		if (errorOfSaved) {
			setUrl(import.meta.env.VITE_FETCH_USERS_URL);
			setCanFetchNew(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	useEffect(() => {
		if (errorOfNew) {
			setUrl(import.meta.env.VITE_FETCH_SAVED_USERS_URL);
			setCanFetchSaved(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorOfNew]);
	useEffect(() => {
		setUrl(import.meta.env.VITE_FETCH_SAVED_USERS_URL);
		setCanFetchSaved(true);
		return () => {
			setUrl(import.meta.env.VITE_FETCH_SAVED_USERS_URL);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (newUser) {
			setUser(newUser);
			setEditableName(newUser.name?.first);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessOfNew]);

	useEffect(() => {
		if (savedUser) {
			setUser(savedUser);
			setEditableName(savedUser.name?.first);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessOfSaved]);

	const handleSave = () => {
		// onSave(editableName);
	};

	const handleDelete = () => {
		// onDelete();
	};

	const handleUpdate = () => {
		if (user) {
			setUrl(import.meta.env.VITE_FETCH_SAVED_USERS_URL);
			const userToUpdate = {
				...user,
				name: { ...user.name, first: editableName },
			};
			updateUser({ email: user.email, user: userToUpdate });
		}
	};

	const handleBack = () => {
		// onBack();
	};

	return (
		<div>
			<img src={user?.picture?.thumbnail} alt="Profile Image" />
			<form>
				<div>
					<label>Gender: </label>
					<span>{user?.gender}</span>
				</div>
				<div>
					<label>Name: </label>

					<input
						type="text"
						value={editableName}
						onChange={handleNameChange}
					/>
				</div>
				<div>
					<label>gender: </label>
					<span>{user?.gender}</span>
				</div>
				<div>
					<label>phone:</label>
					<span>{user?.phone}</span>
				</div>
				<div>
					<label>saved:</label>
					<span>{(!!user?._id).toString()}</span>
				</div>
			</form>
			<div>
				<button onClick={handleUpdate}>Update</button>
				{!!user?._id && (
					<>
						<button onClick={handleDelete}>Delete</button>
					</>
				)}
				<button onClick={handleBack}>Back</button>
			</div>
		</div>
	);
};

export default UserProfileScreen;
