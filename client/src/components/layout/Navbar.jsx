import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Deals', href: '#deals' },
    { label: 'Chefs', href: '#chefs' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Reserve', href: '#reserve' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed left-0 top-0 z-40 w-full bg-white/95 shadow-sm backdrop-blur-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
                <Link to="/" className="text-2xl font-bold text-orange-600">
                    🍕 PizzaShop
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-orange-600 hover:text-orange-600"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-controls="main-menu"
                    >
                        <span></span>
                        <span className="flex w-4 flex-col gap-1" aria-hidden="true">
                            <span className="h-0.5 w-4 bg-current" />
                            <span className="h-0.5 w-4 bg-current" />
                            <span className="h-0.5 w-4 bg-current" />
                        </span>
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div id="main-menu" className="w-full border-t border-gray-200 bg-white">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-1 px-4 py-5 md:px-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="border-b border-gray-100 px-2 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}