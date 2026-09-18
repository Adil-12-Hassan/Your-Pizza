import ReserveForm from './ReserveForm';

export default function Reserve() {
    return (
        <section id="reserve" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Reserve a <span className="text-orange-600">Table</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
                Book your evening with us in advance.
            </p>
            <ReserveForm />
        </section>
    );
}