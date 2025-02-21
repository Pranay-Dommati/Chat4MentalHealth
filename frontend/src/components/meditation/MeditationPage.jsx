import { Play, Pause, Clock, Volume2 } from "lucide-react";
import { useState } from "react";

export default function MeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const meditations = [
    {
      title: "Mindful Breathing",
      duration: "10 min",
      category: "Stress Relief",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60",
      description: "Focus on your breath to reduce stress and anxiety"
    },
    {
      title: "Body Scan Relaxation",
      duration: "15 min",
      category: "Sleep",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
      description: "Progressive relaxation for better sleep"
    },
    {
      title: "Loving-Kindness",
      duration: "12 min",
      category: "Emotional Well-being",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=60",
      description: "Develop compassion for yourself and others"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Featured Session */}
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="relative h-64">
          <img
            src={meditations[0].image}
            alt="Meditation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Daily Featured Session</h3>
              <p className="text-lg opacity-90">{meditations[0].title}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{meditations[0].duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <input
                type="range"
                className="w-24"
                min="0"
                max="100"
                defaultValue="80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meditation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meditations.map((meditation, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={meditation.image}
              alt={meditation.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {meditation.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {meditation.category}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {meditation.duration}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {meditation.description}
              </p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                Start Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}