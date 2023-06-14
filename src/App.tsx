import { RouterProvider } from "react-router-dom";

import "./App.css";
import { router } from "./router/router";

function App() {
	return (
		<RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
	);
}

export default App;
