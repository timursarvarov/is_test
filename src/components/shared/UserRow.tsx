import { User } from "../../shared/interfaces/User.interface";
import "./UserRow.css";

interface UserRowProps {
	user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
	const { picture, name, gender, location, phone, email } = user;

	return (
		<div className="user-row">
			<img
				className="user-thumbnail"
				src={picture.thumbnail}
				alt="thumbnail"
			/>
			<span className="user-name">{`${name.title} ${name.first} ${name.last}`}</span>
			<span>{gender}</span>
			<span> {location.country}</span>
			<span> {phone}</span>
			<span> {email}</span>
		</div>
	);
};

export default UserRow;
