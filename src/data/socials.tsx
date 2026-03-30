import { InstagramIcon, TwitterIcon, YoutubeIcon } from "../components/Icons"
import type { SocialsType } from "../types"

export const SOCIALS: SocialsType[] = 
[
    {   id: "Twitter", 
        icon: <TwitterIcon />, 
        label: "Open our X profile on a new tab", 
        link: "https://x.com/" 
    },
    {   id: "Youtube", 
        icon: <YoutubeIcon />, 
        label: "Open our Youtube channel on a new tab", 
        link: "https://www.youtube.com/" 
    },
    {   id: "Instagram", 
        icon: <InstagramIcon />, 
        label: "Open our Instagram profile on a new tab", 
        link: "https://www.instagram.com/" 
    }
]