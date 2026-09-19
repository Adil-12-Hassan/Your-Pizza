import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { contentService } from '../../services/contentService';
import GalleryItem from './GalleryItem';

export default function GalleryPreview() {
    const [previewItems, setPreviewItems] = useState([]);

    useEffect(() => {
        contentService.getGallery().then((items) => setPreviewItems(items.slice(0, 6))).catch(() => {});
    }, []);

    return (
        <section id="gallery" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Our <span className="text-orange-600">Gallery</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
                A glimpse into our kitchen, our food, and our moments.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {previewItems.map((item) => (
                    <GalleryItem key={item.id} item={item} />
                ))}
            </div>

            <div className="text-center mt-8">
                <Link
                    to="/gallery"
                    className="inline-block border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors px-6 py-2 rounded-full font-semibold"
                >
                    View Full Gallery
                </Link>
            </div>
        </section>
    );
}