import { FeaturedSection } from "../components/FeaturedSection"
import { HeroSection } from "../components/HeroSection"
import { Highlights } from "../components/Highlights";
import { itemsData } from "../data/items";

export const Home = () => {

    const FEATURED_IDS = ["p1", "p2", "p3"];
    const featuredData = itemsData.filter(item => FEATURED_IDS.includes(item.id));
    if (!featuredData) return null;

    return ( 
        <>     
            <HeroSection />    
            <FeaturedSection featuredData={featuredData} />
            <Highlights />
        </>     
    )
}