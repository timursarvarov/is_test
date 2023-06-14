
export interface User {
	name: {
		title: string;
		first: string;
		last: string;
	};
	gender: string;
	location: {
		country: string;
	};
	email: string;
	phone: string;
	picture: {
		thumbnail: string;
	};
	login: {
		uuid: string;
	};
}