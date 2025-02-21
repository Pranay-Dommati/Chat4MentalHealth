import { Users, MessageCircle, Heart, Share2 } from "lucide-react";

export default function CommunityPage() {
  const posts = [
    {
      id: 1,
      author: "Sarah M.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "Just completed my first meditation session! Feeling much calmer and focused.",
      likes: 24,
      comments: 5,
      time: "2h ago"
    },
    {
      id: 2,
      author: "John D.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      content: "Anxiety management tip: Try the 5-4-3-2-1 grounding technique. It really helps!",
      likes: 32,
      comments: 8,
      time: "4h ago"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Community Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Users className="w-8 h-8 text-blue-500" />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Community Support
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Connect with others, share experiences, and support each other on your mental health journey.
        </p>
      </div>

      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <textarea 
          placeholder="Share your thoughts..."
          className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={post.avatar} 
                alt={post.author} 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {post.author}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.time}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {post.content}
            </p>
            <div className="flex gap-4 text-gray-500 dark:text-gray-400">
              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <Heart className="w-5 h-5" /> {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" /> {post.comments}
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <Share2 className="w-5 h-5" /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}