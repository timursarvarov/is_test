import axios from 'axios';
import { User } from '../shared/interfaces/User.interface';
const FETCH_USERS_URL = import.meta.env.FETCH_USERS_URL || 'https://randomuser.me/api';

export async function fetchUsers(): Promise<User[]> {

	try {
		const url = new URL(FETCH_USERS_URL);
		url.searchParams.set('results', '10');
		const { data } = await axios.get(url.toString());
		// it will be better to use a decoder here
		return data.results;
	} catch (error) {
		console.error(error);
		return [];
	}
}