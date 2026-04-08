import type { ContactFormValues, FormField } from "../types";


export function validateForm({ firstName, lastName, email, message }: ContactFormValues) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = emailRegex.test(email);

    const showErrors: Partial<Record<FormField, string>> = {};

    if (firstName === "") {
        showErrors.firstName = "Name is required."
    }

    if (lastName === "") {
        showErrors.lastName = "Last name is required."
    }

    if (email === "") {
        showErrors.email = "Email is required."
    } else if (!validEmail) {
        showErrors.email = "Email format is incorrect."
    }

    if (message === "") {
        showErrors.message = "Please write a message."
    }
    
    return showErrors;
}