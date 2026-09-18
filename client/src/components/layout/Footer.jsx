const QUICK_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Deals', href: '#deals' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reserve', href: '#reserve' },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div>
                    <h3 className="text-white text-xl font-bold mb-3">🍕 PizzaShop</h3>
                    <p className="text-sm text-gray-400">
                        Handmade pizzas, sizzling deals, and flavors crafted with love — delivered fast.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {QUICK_LINKS.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="hover:text-orange-500 transition-colors">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Contact Us</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>123 Main Street, Lahore, Pakistan</li>
                        <li>+92 300 1234567</li>
                        <li>hello@pizzashop.com</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                    <div className="flex items-center gap-4">
                        <a href="https://www.facebook.com" aria-label="Facebook" className="transition-opacity hover:opacity-70">
                            <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" className="h-5 w-5" />
                        </a>
                        <a href="https://www.instagram.com" aria-label="Instagram" className="transition-opacity hover:opacity-70">
                            <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" className="h-5 w-5" />
                        </a>
                        <a href="https://x.com" aria-label="X" className="transition-opacity hover:opacity-70">
                            <img src="https://cdn.simpleicons.org/x/ffffff" alt="" className="h-5 w-5" />
                        </a>
                        <a href="https://www.youtube.com" aria-label="YouTube" className="transition-opacity hover:opacity-70">
                            <img src="https://cdn.simpleicons.org/youtube/ffffff" alt="" className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-xs mt-10 pt-6 border-t border-gray-800">
                © {new Date().getFullYear()} PizzaShop. All rights reserved.
            </div>
        </footer>
    );
}