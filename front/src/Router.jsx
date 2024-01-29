import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import OutletWrapper from "./components/layout";
import Home from "./pages/home";

function Router() {
    const routes = createRoutesFromElements(
        <>
            <Route path="/" element={<OutletWrapper />}>
                <Route path="/" element={<Home />} />
            </Route>
        </>
    );
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />
}

export default Router;