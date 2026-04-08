import { CircleCheck } from "lucide-react"
import { useRef, useState } from "react"
import { Row, Col, Container, Button } from "react-bootstrap"
import { SocialsList } from "../components/SocialsList"
import { ContactsList } from "../components/ContactsList"
import { validateForm } from "../utilities/validateForm"
import type { FormField } from "../types"

export const Contacts = () => {
    const [error, setError] = useState<Partial<Record<FormField, string>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});

    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const onBlur = (e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>) => {
        const fieldName = e.currentTarget.name as FormField;

        const firstName = firstNameRef.current?.value.trim() ?? "";
        const lastName = lastNameRef.current?.value.trim() ?? "";
        const email = (emailInputRef.current?.value ?? "").toLowerCase().trim();
        const message = textAreaRef.current?.value.trim() ?? "";

        setTouched(prev => ({ ...prev, [fieldName]: true }));

        const result = validateForm({ firstName, lastName, email, message });

        if (result[fieldName]) {
            setError(prev => ({ ...prev, [fieldName]: result[fieldName] }));
        } else {
            setError(prev => {
                const { [fieldName]: _, ...rest } = prev;
                return rest;
            })
        }
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(false);

        const firstName = firstNameRef.current?.value.trim() ?? "";
        const lastName = lastNameRef.current?.value.trim() ?? "";
        const email = (emailInputRef.current?.value ?? "").toLowerCase().trim();
        const message = textAreaRef.current?.value.trim() ?? "";

        const result = validateForm({ firstName, lastName, email, message });

        if (Object.keys(result).length > 0) {
            setError(result);
            setTouched({firstName: true, lastName: true, email: true, message: true});
            return;
        } else {
            setError({});
            e.currentTarget.reset();
            setSubmitted(true);
            setTouched({});
        }
    }

    return (
        <Container className="contacts-page my-5">
            <h1>Contacts</h1>
            <Row xs={1} lg={2} className="g-3">
                <Col className="contacts-col">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-background shadow rounded contacts-card">
                            <div className="g-2 p-4 contacts-card-body">
                                {submitted &&
                                    <span aria-live="polite" className="success-message">
                                        Message submitted successfully!
                                        <CircleCheck size={18} />
                                    </span>
                                }
                                <h2 className="my-3">Send us a message</h2>
                                <p className="my-3">
                                    If you have any question, need help, or want to make a complaint, feel free to reach out to us using this form.
                                    We value your feedback.
                                </p>
                                <div className="mb-3 form-grid">
                                    <div className="field">
                                        <label htmlFor="firstName-input">First name</label>
                                        <input
                                            type="text"
                                            ref={firstNameRef}
                                            className={`form-control${error.firstName ? " is-invalid" : ""}`}
                                            id="firstName-input"
                                            name="firstName"
                                            placeholder="John"
                                            onBlur={onBlur}
                                            aria-label="First Name"
                                            aria-invalid={error.firstName ? true : false}
                                            aria-describedby={error.firstName ? "name-error" : undefined}
                                            required
                                        />
                                        {touched.firstName && error.firstName &&
                                            <span
                                                id="name-error"
                                                className="error-message"
                                                aria-live="polite"
                                            >
                                                {error.firstName}
                                            </span>
                                        }
                                    </div>
                                    <div className="field">
                                        <label htmlFor="lastName-input">Last name</label>
                                        <input
                                            type="text"
                                            ref={lastNameRef}
                                            className={`form-control${error.lastName ? " is-invalid" : ""}`}
                                            id="lastName-input"
                                            name="lastName"
                                            placeholder="Doe"
                                            onBlur={onBlur}
                                            aria-label="Last Name"
                                            aria-invalid={error.lastName ? true : false}
                                            aria-describedby={error.lastName ? "lastname-error" : undefined}
                                            required
                                        />
                                        {touched.lastName && error.lastName &&
                                            <span
                                                id="lastname-error"
                                                className="error-message"
                                                aria-live="polite"
                                            >
                                                {error.lastName}
                                            </span>
                                        }
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email-input">Email</label>
                                    <input
                                        type="email"
                                        ref={emailInputRef}
                                        className={`form-control${error.email ? " is-invalid" : ""}`}
                                        id="email-input"
                                        name="email"
                                        placeholder="Email"
                                        onBlur={onBlur}
                                        aria-label="Email"
                                        aria-invalid={error.email ? true : false}
                                        aria-describedby={error.email ? "email-error" : undefined}
                                        required
                                    />
                                    {touched.email && error.email &&
                                        <span
                                            id="email-error"
                                            className="error-message"
                                            aria-live="polite"
                                        >
                                            {error.email}
                                        </span>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="typeMessage">Your Message</label>
                                    <textarea
                                        className={`form-control${error.message ? " is-invalid" : ""}`}
                                        ref={textAreaRef}
                                        id="typeMessage"
                                        name="message"
                                        placeholder="Your Message"
                                        onBlur={onBlur}
                                        aria-label="Your Message"
                                        aria-invalid={error.message ? true : false}
                                        aria-describedby={error.message ? "textarea-error" : undefined}
                                        required
                                    />
                                    {touched.message && error.message &&
                                        <span
                                            id="textarea-error"
                                            className="error-message"
                                            aria-live="polite"
                                        >
                                            {error.message}
                                        </span>
                                    }
                                </div>
                                <div className="d-flex justify-content-end mt-5">
                                    <Button
                                        variant=""
                                        type="submit"
                                        className="btn-submit btn-circle"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Col>

                <Col className="contacts-us-col">
                    <div className="contacts-background shadow rounded contacts-card">
                        <div className="g-2 p-4 contacts-card-body">
                            <h2 className="my-3">Get in touch</h2>
                            <p className="my-3">
                                We'd love to hear from you.
                            </p>
                            <ContactsList className={"border border-light my-3"} />
                            <hr />
                            <span className="d-block my-4">Connect with us</span>
                            <SocialsList className="contacts-socials" itemClassName="border rounded-circle p-2 shadow" />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}