import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layouts/RootLayout";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";
import { Menu } from "../pages/Menu";
import { Contacts } from "../pages/Contacts";
import { About } from "../pages/About";

const basename =
    import.meta.env.BASE_URL.replace(/\/$/, "") === ""
        ? undefined
        : import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "menu",
                    element: <Menu />,
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "contacts",
                    element: <Contacts />,
                },
            ],
        },
    ],
    basename ? { basename } : {},
);