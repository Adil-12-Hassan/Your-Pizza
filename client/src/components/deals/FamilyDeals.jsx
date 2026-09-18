import { FAMILY_DEALS } from '../../utils/demoDealsData';
import DealCard from './DealCard';

export default function FamilyDeals() {
    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Family & Huge Deals</h3>
            <div className="grid sm:grid-cols-2 gap-6">
                {FAMILY_DEALS.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                ))}
            </div>
        </div>
    );
}