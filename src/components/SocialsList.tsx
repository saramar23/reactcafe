import { SOCIALS } from "../data/socials"
import type { SocialListProps } from "../types"

export const SocialsList = ({ className, itemClassName } : SocialListProps ) => {
    return (
        <nav aria-label="Social Media">
            <ul className={`d-flex flex-wrap gap-2 list-unstyled ${className}`}>
                {SOCIALS.map(social => (
                    <li 
                        key={social.id}
                        className={` ${itemClassName}`}
                    >
                        <a                            
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}                            
                        >
                            {social.icon}                           
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}