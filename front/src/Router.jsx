import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import OutletWrapper from "./components/layout";
import Blogs from "./pages/blogs";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import UserDash from "./pages/user";

function Router() {
    const routes = createRoutesFromElements(
        <>
            <Route path="/" element={<OutletWrapper />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user/:username" element={<UserDash />} />
                <Route path="/blogs" element={<Blogs />} />
            </Route>
        </>
    );
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />
}

export default Router;