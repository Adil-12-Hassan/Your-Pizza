import { useState } from 'react';
import { contactService } from '../../services/contentService';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await contactService.send(form);
            setSubmitted(true);
            setForm(initialForm);
        } catch (error) {
            window.alert(error.response?.data?.message || 'Unable to send your message. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Get In <span className="text-orange-600">Touch</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">
                Questions, feedback, or just want to say hi? We'd love to hear from you.
            </p>

            <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-sm p-6 md:p-10">
                {/* Left: static info */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">📍 Address</h3>
                        <p className="text-gray-500 text-sm">123 Main Street, Lahore, Punjab, Pakistan</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">📞 Phone</h3>
                        <p className="text-gray-500 text-sm">+92 300 1234567</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">✉️ Email</h3>
                        <p className="text-gray-500 text-sm">hello@pizzashop.com</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">🕒 Hours</h3>
                        <p className="text-gray-500 text-sm">Mon–Sun: 11:00 AM – 11:00 PM</p>
                    </div>
                </div>

                {/* Right: form */}
                <div>
                    {submitted ? (
                        <div className="text-center py-10">
                            <p className="text-4xl mb-2">✅</p>
                            <p className="text-lg font-semibold text-gray-900">Message Sent!</p>
                            <p className="text-gray-500 text-sm mt-1">We'll get back to you soon.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-4 text-orange-600 font-medium hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-full transition-colors"
                            >
                                {submitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}