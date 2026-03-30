import { Mail, Phone, MessageSquareText } from "lucide-react";
import type { ContactsType } from "../types";

export const CONTACTS: ContactsType[] = [
    {
        id: 'email',
        icon: <Mail className=""  aria-hidden="true" />,
        label: 'Email',
        value: 'example@gmail.com',
        link: "mailto:example@gmail.com"
    },
    {
        id: 'phone',
        icon: <Phone className="" aria-hidden="true" />,
        label: 'Phone',
        value: '+1 900 152 1623',
        link: "tel:+19001521623"
    },
    {
        id: 'text',
        icon: <MessageSquareText className="" aria-hidden="true" />,
        label: 'Text',
        value: '+1 900 152 1111',
        link: "sms:+19001521623"
    },
]