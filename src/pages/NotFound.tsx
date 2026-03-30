import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router";
import { MoveLeft } from "lucide-react";

export function NotFound() {
    const error = useRouteError();
    console.error(error); // for debugging

    return (
        <Container className="text-center mt-5">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="text-muted">
                <i>
                    {isRouteErrorResponse(error)
                        ? `${error.status} ${error.statusText}`
                        : "Unknown Error"}
                </i>
            </p>
            <NavLink to="/">
                <Button variant="primary">
                    <MoveLeft /> Back to Store
                </Button>
            </NavLink>
        </Container>
    );
}