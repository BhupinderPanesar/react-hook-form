import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { UserPage } from "../UserPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        { path: ":id", element: <UserPage /> }
    ]
}]);