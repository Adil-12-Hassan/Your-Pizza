import { useEffect, useState } from 'react';
import { adminMessageService } from '../../services/adminService';

export default function MessagesList() {
    const [messages, setMessages] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => { adminMessageService.list().then(setMessages).catch(() => setError('Unable to load messages.')); }, []);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
        adminMessageService.markRead(id).then(() => setMessages((prev) => prev.map((message) => message.id === id ? { ...message, read: true } : message))).catch(() => setError('Unable to mark message as read.'));
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this message?')) return;
        try { await adminMessageService.remove(id); setMessages((prev) => prev.filter((message) => message.id !== id)); } catch { setError('Unable to delete message.'); }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <div className="space-y-3">
                {messages.length === 0 && (
                    <p className="text-gray-400 text-sm">No messages yet.</p>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <button
                            onClick={() => toggleExpand(msg.id)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left"
                        >
                            <div className="flex items-center gap-3">
                                {!msg.read && (
                                    <span className="w-2 h-2 rounded-full bg-orange-600 flex-shrink-0" />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900">{msg.name}</p>
                                    <p className="text-gray-500 text-xs">{msg.email}</p>
                                </div>
                            </div>
                            <span className="text-gray-400 text-xs">
                                {new Date(msg.receivedAt).toLocaleDateString()}
                            </span>
                        </button>

                        {expandedId === msg.id && (
                            <div className="border-t border-gray-100 px-5 py-4">
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">{msg.message}</p>
                                <div className="flex gap-3">
                                    <a
                                    href={`mailto:${msg.email}`}
                                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                                    >
                                    Reply via Email
                                    </a>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="text-red-500 hover:underline text-xs font-medium"
                                >
                                    Delete
                                </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
