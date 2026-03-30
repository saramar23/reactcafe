import { CircleCheck } from "lucide-react"
import { useRef, useState } from "react"
import { Row, Col, Container, Button } from "react-bootstrap"

import { SocialsList } from "../components/SocialsList";
import { ContactsList } from "../components/ContactsList";

export const Contacts = () => {
    const [ error, setError ] = useState<Record<string, string>>({});
    const [ submitted, setSubmitted ] = useState(false);

    const firstName = useRef<HTMLInputElement | null>(null);
    const lastName = useRef<HTMLInputElement | null>(null);
    const emailInput = useRef<HTMLInputElement | null>(null);
    const textArea = useRef<HTMLTextAreaElement| null>(null);
    
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const fName = firstName.current?.value.trim();
        const lName = lastName.current?.value.trim();
        const email = (emailInput.current?.value ?? "").toLowerCase().trim();
        const message = textArea.current?.value.trim();
        const validEmail = emailRegex.test(email);

        const showErrors: Record<string, string> = {};

        if (fName === "") {
            showErrors.firstName = "Name is required."
        }

        if (lName === "") {
            showErrors.lastName = "Last name is required."
        }

        if (email === "") {
            showErrors.emailInput = "Email is required."
        } else if (!validEmail) {
            showErrors.emailInput = "Email format is incorrect."
        }

        if (message === "") {
            showErrors.textArea = "Please write a message."
        }

        if (Object.keys(showErrors).length > 0) {
            setError(showErrors);
            return;
        } else {
            setError({});
            e.currentTarget.reset();
            setSubmitted(true);
        }
    }

    
    return (
        <Container className="contacts-page my-5">
            <h1>Contacts</h1>            
                <Row xs={1} lg={2} className="g-3">
                    <Col className="contacts-col">
                        <form onSubmit={handleSubmit}>
                            <div className="form-background shadow rounded contacts-card">
                                <div className="g-2 p-4 contacts-card-body">
                                    {submitted && 
                                        <span aria-live="polite" className="success-message">
                                            Message submitted successfully! 
                                            <CircleCheck size={18}/>
                                        </span>    
                                    }
                                    <h2 className="my-3">Send us a message</h2>
                                    <p className="my-3">
                                        If you have any question, need help, or want to make a complaint, feel free to reach out to us using this form.
                                        We value your feedback.
                                    </p>
                                    <div className="mb-3 form-grid">
                                        <div className="field">
                                            <label htmlFor="fName-input">First name</label>
                                                <input 
                                                    type="text" 
                                                    ref={firstName}
                                                    className={`form-control ${error.firstName} ? "is-invalid" : ""`}
                                                    id="fName-input" 
                                                    placeholder="John" 
                                                    aria-label="First Name" 
                                                    aria-invalid={`${error.firstName ? "true" : "false"}`}
                                                    aria-describedby="name-error"  
                                                    required
                                                />                                            
                                                {error.firstName && 
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
                                            <label htmlFor="lName-input">Last name</label>
                                            <input 
                                                type="text" 
                                                ref={lastName}
                                                className={`form-control ${error.firstName} ? "is-invalid" : ""`}
                                                id="lName-input" 
                                                placeholder="Doe" 
                                                aria-label="Last Name" 
                                                aria-invalid={`${error.lastName ? "true" : "false"}`}  
                                                aria-describedby="lastname-error"      
                                                required                                  
                                            />                                    
                                            {error.lastName && 
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
                                            ref={emailInput}
                                            className={`form-control ${error.firstName} ? "is-invalid" : ""`}
                                            id="email-input" 
                                            placeholder="Email" 
                                            aria-label="Email" 
                                            aria-invalid={`${error.emailInput ? "true" : "false"}`}   
                                            aria-describedby="email-error" 
                                            required                                        
                                        />                                    
                                        {error.emailInput && 
                                            <span 
                                                id="email-error"
                                                className="error-message"                                            
                                                aria-live="polite"
                                            >
                                                {error.emailInput}
                                            </span>
                                        }
                                    </div>                                
                                    <div className="mb-3">
                                        <label htmlFor="typeMessage">Your Message</label>
                                        <textarea 
                                            className={`form-control ${error.firstName} ? "is-invalid" : ""`}                                            
                                            ref={textArea}
                                            id="typeMessage" 
                                            placeholder="Your Message" 
                                            aria-label="Your Message"                                         
                                            aria-invalid={`${error.textArea ? "true" : "false"}`}
                                            aria-describedby="textarea-error"   
                                            required
                                        />
                                        {error.textArea && 
                                            <span 
                                                id="textarea-error"
                                                className="error-message"
                                                aria-live="polite"
                                            >
                                                {error.textArea}
                                            </span>
                                        }
                                    </div>                                
                                    <div className="d-flex justify-content-end mt-5">
                                        <Button                                     
                                            variant="" 
                                            type="submit" 
                                            className="btn-submit btn-circle "                                                                               
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
                                <ContactsList className={"border border-light my-3"}/>
                                <hr />
                                <span className="d-block my-4">Connect with us</span>                                                                 
                                <SocialsList className="contacts-socials" itemClassName="border rounded-circle p-2 shadow"/>                                
                            </div>
                        </div>                        
                    </Col>                    
                </Row>            
        </Container>
    )
}