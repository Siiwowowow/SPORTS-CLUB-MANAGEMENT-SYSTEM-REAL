import React from 'react';
import { format } from 'date-fns';

const NewsCard = ({ news }) => {

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
    <div className="bg-white w-[100%] mx-auto rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
      <div className="p-5">
        {/* Title & Priority */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{news.title}</h3>
          {news.priority && (
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(news.priority)}`}>
              {news.priority}
            </span>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.content}</p>

        {/* Type & Status */}
        <div className="flex flex-wrap gap-2 mb-3">
          {news.type && (
            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(news.type)}`}>
              {news.type}
            </span>
          )}
          {news.status && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              {news.status}
            </span>
          )}
        </div>

        {/* Start & End Date */}
        {news.startDate && (
          <div className="text-xs text-gray-500 mb-1">
            <span className="font-medium">From:</span> {format(new Date(news.startDate), 'MMM d, yyyy')}
            {news.endDate && (
              <>
                {' '}<span className="font-medium">To:</span> {format(new Date(news.endDate), 'MMM d, yyyy')}
              </>
            )}
          </div>
        )}

        {/* Updated At */}
        {news.updatedAt && (
          <div className="text-xs text-gray-400 mt-2">
            Last updated: {format(new Date(news.updatedAt), 'MMM d, yyyy h:mm a')}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
