import { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';

export default function ProfessionalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');

  const professionals = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      speciality: "Psychiatrist",
      rating: 4.8,
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      availability: "Mon-Fri",
      consultationFee: "$100"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      speciality: "Psychologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
      rating: 4.9,
      experience: "12 years",
      availability: "Mon-Sat",
      consultationFee: "$90"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      speciality: "Therapist",
      rating: 4.7,
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
      availability: "Tue-Sat",
      consultationFee: "$85"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      speciality: "Psychiatrist",
      rating: 4.9,
      experience: "20 years",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop",
      availability: "Mon-Thu",
      consultationFee: "$120"
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      speciality: "Psychologist",
      rating: 4.6,
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop",
      availability: "Wed-Sun",
      consultationFee: "$95"
    },
    {
      id: 6,
      name: "Dr. Robert Martinez",
      speciality: "Therapist",
      rating: 4.8,
      experience: "14 years",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
      availability: "Mon-Fri",
      consultationFee: "$88"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search mental health professionals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <select
          value={selectedSpeciality}
          onChange={(e) => setSelectedSpeciality(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="all">All Specialities</option>
          <option value="psychiatrist">Psychiatrist</option>
          <option value="psychologist">Psychologist</option>
          <option value="therapist">Therapist</option>
        </select>
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((professional) => (
          <div
            key={professional.id}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 m-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {professional.rating}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {professional.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                {professional.speciality}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                <span>{professional.experience}</span>
                <span>{professional.availability}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {professional.consultationFee}
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors">
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}