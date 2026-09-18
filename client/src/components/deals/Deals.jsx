import SimpleDeals from './SimpleDeals';
import FamilyDeals from './FamilyDeals';

export default function Deals() {
    return (
        <section id="deals" className="w-full bg-orange-50/40 py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Best <span className="text-orange-600">Deals</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
                Save more when you order smart.
            </p>

                <SimpleDeals />
                <FamilyDeals />
            </div>
        </section>
    );
}