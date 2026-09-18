import { DEMO_CHEFS } from '../../utils/demoChefsData';
import ChefCard from './ChefCard';

export default function Chefs() {
    return (
        <section id="chefs" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Meet Our <span className="text-orange-600">Chefs</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
                The talented hands behind every dish.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEMO_CHEFS.map((chef) => (
                    <ChefCard key={chef.id} chef={chef} />
                ))}
            </div>
        </section>
    );
}