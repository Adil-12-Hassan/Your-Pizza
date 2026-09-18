import { DEMO_REVIEWS } from '../../utils/demoReviewsData';
import ReviewCard from './ReviewCard';

export default function Reviews() {
    return (
        <section id="reviews" className="w-full bg-orange-50/40 py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                What Our <span className="text-orange-600">Customers Say</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
                Real experiences from real customers.
            </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {DEMO_REVIEWS.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
}