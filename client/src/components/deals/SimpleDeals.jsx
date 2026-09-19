import DealCard from './DealCard';

export default function SimpleDeals({ deals }) {
  return (
    <div className="mb-14">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Everyday Deals</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}
