// AnnouncementCard.jsx
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low': return 'bg-blue-100 text-blue-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'critical': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'maintenance': return 'bg-purple-100 text-purple-800';
            case 'event': return 'bg-green-100 text-green-800';
            case 'holiday': return 'bg-pink-100 text-pink-800';
            case 'offer': return 'bg-teal-100 text-teal-800';
            case 'emergency': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{announcement.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                    </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{announcement.content}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(announcement.type)}`}>
                        {announcement.type}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {announcement.status}
                    </span>
                </div>
                
                {announcement.startDate && (
                    <div className="text-xs text-gray-500 mb-1">
                        <span className="font-medium">From:</span> {format(new Date(announcement.startDate), 'MMM d, yyyy')}
                        {announcement.endDate && (
                            <>
                                {' '}<span className="font-medium">To:</span> {format(new Date(announcement.endDate), 'MMM d, yyyy')}
                            </>
                        )}
                    </div>
                )}
                
                <div className="text-xs text-gray-400 mt-2">
                    Last updated: {format(new Date(announcement.updatedAt), 'MMM d, yyyy h:mm a')}
                </div>
            </div>
            
            <div className="bg-gray-50 px-5 py-3 flex justify-end gap-3 border-t">
                <button 
                    onClick={() => onEdit(announcement)} 
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                    aria-label="Edit"
                >
                    <FiEdit size={18} />
                </button>
                <button 
                    onClick={() => onDelete(announcement._id)} 
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Delete"
                >
                    <FiTrash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementCard;