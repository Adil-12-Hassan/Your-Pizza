export default function ReviewCard({ review }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="text-orange-500 text-sm">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                    </div>
                </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
        </div>
    );
}