import NProgress from "nprogress";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBaseUrl } from "../../../redux/store";
import {
	useGetAllNewUsersQuery,
	useGetOneNewUserQuery,
	useGetOneSavedUserQuery,
} from "../../../redux/userAPI";
import { IUser } from "../../../shared/interfaces/user.interface";

const UserProfileScreen: FC = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const [editableName, setEditableName] = useState("");

	const handleNameChange = (event: { target: { value: any } }) => {
		setEditableName(event.target.value);
	};
	useGetAllNewUsersQuery;

	const { email } = useParams();

	const {
		isSuccess: isSuccessOfSaved,
		isFetching: isFetchingOfSaved,
		isLoading: loadingOfSaved,
		error: errorOfSaved,
		data: savedUser,
	} = useGetOneSavedUserQuery({
		email: email!,
	});

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
		{ skip: isSuccessOfSaved || loadingOfSaved }
	);

	const loading =
		loadingOfNew || loadingOfSaved || isFetchingOfSaved || isFetchingOfNew;
	const success = isSuccessOfSaved || isSuccessOfNew;
	const error = errorOfNew || errorOfSaved || !errorOfSaved;
	const dispatch = useDispatch();

	const setUrl = (url: string) => {
		const setUrl = async () => {
			dispatch(setBaseUrl(url));
		};
		setUrl();
	};
	useEffect(() => {
		setUrl(import.meta.env.VITE_FETCH_USERS_URL);
		return () => {
			setUrl(import.meta.env.VITE_FETCH_SAVED_USERS_URL);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessOfSaved]);

	useEffect(() => {
		if (success) {
			NProgress.done();
		}

		if (!success && error) {
			console.log(error);
			NProgress.done();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);
	useEffect(() => {
		setUrl(import.meta.env.VITE_FETCH_USERS_URL);
	}, [loading && !savedUser]);

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
		// onUpdate(editableName);
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
					{user?.saved ? (
						<input
							type="text"
							value={editableName}
							onChange={handleNameChange}
						/>
					) : (
						<span>{editableName}</span>
					)}
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
					<span>{user?.saved}</span>
				</div>
			</form>
			<div>
				{user?.saved ? (
					<>
						<button onClick={handleUpdate}>Update</button>
						<button onClick={handleDelete}>Delete</button>
					</>
				) : (
					<button onClick={handleSave}>Save</button>
				)}
				<button onClick={handleBack}>Back</button>
			</div>
		</div>
	);
};

export default UserProfileScreen;
