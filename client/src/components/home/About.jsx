const STATS = [
    { label: "Years of Experience", value: '4+' },
    { label: "Pizzas Served", value: '50K+' },
    { label: "Happy Customers", value: '20K+' },
    { label: "Signature", value: '30+' },
];
export default function About() {
    return (
        <section id="about" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                        About <span className="text-orange-600">Us</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        For over 8 years, we've been crafting authentic, wood-fired pizzas
                        using fresh, locally-sourced ingredients. Every pie is made by hand,
                        topped with passion, and baked to perfection.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        From our kitchen to your table, we bring the taste of Italy with a
                        modern twist — because great food brings people together.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-orange-50 rounded-xl p-6 text-center shadow-sm"
                        >
                            <p className="text-3xl font-bold text-orange-600">{stat.value}</p>
                            <p className="text-gray-600 mt-1 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}