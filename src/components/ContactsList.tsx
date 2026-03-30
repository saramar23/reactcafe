import { CONTACTS } from "../data/contacts"

export const ContactsList = ({ className }: { className: string }) => {
    return (
        <>
            {CONTACTS.map((item) => (
                <a href={item.link}
                    className={`${className} text-decoration-none contact-info-text contact-info-row rounded shadow p-3 mb-2`}
                    key={item.id}
                >
                    <span>
                        {item.icon}
                    </span>
                    <span>
                        <strong>{item.label}:</strong>
                    </span>
                    <span>
                        {item.value}
                    </span>
                </a>
            ))}
        </>
    )
}