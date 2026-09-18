export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-[80vh] items-center justify-center bg-gray-900 px-4 text-center text-white">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=85"
                    alt="Fresh Baked Pizza"
                    className="w-full h-full object-cover opacity-40" />
            </div>
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    Hot, Fresh & Delivered Fast 🍕
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                    Homemade pizzas, sizzling deals, and flavour crafted by our expert chefs - right to you door.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="#menu"
                        className="rounded-full bg-orange-600 px-6 py-3 font-semibold transition-colors hover:bg-orange-700">Order Now</a>
                        <a 
                        href="#reserve"
                        className="rounded-full border border-white px-6 py-3 font-semibold transition-colors hover:bg-white hover:text-gray-900"
                        >Reserve a Table</a>
                </div>
            </div>
        </section >
    )
}