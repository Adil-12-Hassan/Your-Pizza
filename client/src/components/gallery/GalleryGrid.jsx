import { DEMO_GALLERY_ITEMS } from '../../utils/demoGalleryData';
import GalleryItem from './GalleryItem';

export default function GalleryGrid() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_GALLERY_ITEMS.map((item) => (
                <GalleryItem key={item.id} item={item} />
            ))}
        </div>
    );
}