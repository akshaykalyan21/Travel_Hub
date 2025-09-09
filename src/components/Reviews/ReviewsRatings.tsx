import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Filter } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  category: string;
  verified: boolean;
}

interface ReviewsRatingsProps {
  reviews: Review[];
}

export default function ReviewsRatings({ reviews }: ReviewsRatingsProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const categories = ['all', 'hotels', 'guides', 'activities', 'restaurants', 'transport'];
  
  const filteredReviews = reviews.filter(review => {
    const matchesRating = selectedRating === 0 || review.rating === selectedRating;
    const matchesCategory = selectedCategory === 'all' || review.category === selectedCategory;
    return matchesRating && matchesCategory;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Reviews & Ratings</h3>
          <p className="text-gray-600">Real experiences from fellow travelers</p>
        </div>
        <button
          onClick={() => setShowWriteReview(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Write Review
        </button>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Based on {reviews.length} reviews</p>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="w-8 text-sm font-medium">{rating}★</span>
                <div className="flex-grow bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>

        <div className="flex space-x-2">
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(parseInt(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          >
            <option value={0}>All Ratings</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm capitalize"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? filteredReviews.map(review => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.user}</span>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {review.date} • {review.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.content}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <MessageCircle className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-gray-500">
            No reviews match your current filters
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-xl font-semibold mb-4">Write a Review</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Summarize your experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your detailed experience..."
                />
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Submit Review
                </button>
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}