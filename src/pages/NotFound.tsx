import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router";
import { MoveLeft } from "lucide-react";
import { PageTitle } from "../components/PageTitle";

export function NotFound() {
    const error = useRouteError();

    return (
        <Container className="text-center mt-5">
            <PageTitle
                className="page-title-block--page page-title-block--center"
                title="Oops!"
                subtitle="Sorry, an unexpected error has occurred."
            />
            <p className="text-muted">
                <i>
                    {isRouteErrorResponse(error)
                        ? `${error.status} ${error.statusText}`
                        : "Unknown Error"}
                </i>
            </p>
            <NavLink to="/">
                <Button className="btn-brand">
                    <MoveLeft /> Back to Store
                </Button>
            </NavLink>
        </Container>
    );
}