import { Link } from "react-router-dom";

import { IUser } from "../../../shared/interfaces/user.interface";
import "./UserRow.css";

interface UserRowProps {
	user: IUser;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
	const { picture, name, gender, location, phone, email } = user;

	return (
		<Link to={`/user/?email=${user.email}`}>
			<div className="user-row">
				<img
					className="user-thumbnail"
					src={picture?.thumbnail}
					alt="thumbnail"
				/>
				<span className="user-name">{`${name?.title} ${name?.first} ${name?.last}`}</span>
				<span>{gender}</span>
				<span> {location?.country}</span>
				<span> {phone}</span>
				<span> {email}</span>
			</div>
		</Link>
	);
};

export default UserRow;
