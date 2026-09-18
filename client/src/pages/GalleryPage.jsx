import GalleryGrid from '../components/gallery/GalleryGrid';

export default function GalleryPage() {
    return (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
                Our <span className="text-orange-600">Gallery</span>
            </h1>
            <p className="text-gray-500 text-center mb-10">
                Every dish, every moment, every memory.
            </p>
            <GalleryGrid />
        </section>
    );
}