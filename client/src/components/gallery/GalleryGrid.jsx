import { useEffect, useState } from 'react';
import { contentService } from '../../services/contentService';
import GalleryItem from './GalleryItem';

export default function GalleryGrid() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        contentService.getGallery().then(setItems).catch(() => {});
    }, []);

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
                <GalleryItem key={item.id} item={item} />
            ))}
        </div>
    );
}