export default function GalleryItem({ item }) {
    return (
        <div className="relative group overflow-hidden rounded-lg cursor-pointer">
            <img
                src={item.image}
                alt={item.caption}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{item.caption}</p>
            </div>
        </div>
    );
}