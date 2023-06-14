import { IUser } from './../shared/interfaces/user.interface';
import { DeepPick } from "ts-deep-pick";

export type IMutateUser = DeepPick<IUser, 'name.first'>;

export type IGenericResponse = {
	status: string;
	message: string;
};

export type IUserResponse = {
	status: string;
	user: IUser;
};

export type IUsersResponse = {
	status: string;
	results: number;
	users: IUser[];
};
