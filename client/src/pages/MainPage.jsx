import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Menu from '../components/menu/Menu';
import Deals from '../components/deals/Deals';
import Chefs from '../components/chefs/Chefs';
import GalleryPreview from '../components/gallery/GalleryPreview';
import Reviews from '../components/reviews/Reviews';
import Reserve from '../components/reserve/Reserve';
import Contact from '../components/contact/Contact';

export default function MainPage() {
    return (
        <>
            <Hero />
            <About />
            <Menu />
            <Deals />
            <Chefs />
            <GalleryPreview />
            <Reviews />
            <Reserve />
            <Contact />
        </>
    );
}