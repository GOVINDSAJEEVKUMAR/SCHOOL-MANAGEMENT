import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalApi from "../GlobalApi";

const Dashboard = () => {
  // States for the counts
  const [counts, setCounts] = useState({
    staff: 0,
    worker: 0,
    book: 0,
    student: 0,
  });

  // State for school achievements
  const [achievements, setAchievements] = useState([
    {
      title: 'First Place in Science Olympiad',
      description: 'Our students secured the first position in the national Science Olympiad.',
      imageUrl: 'https://i.pinimg.com/564x/e7/f0/90/e7f0903336eda9ea6747fe34764a9c93.jpg',
      date: '2024-03-15',
    },
    {
      title: 'Best School Award',
      description: 'Awarded the best school in the region for academic and extracurricular achievements.',
      imageUrl: 'https://i.pinimg.com/736x/cd/10/ce/cd10cebfd3f357810ee5a1280f56b2d7.jpg',
      date: '2023-12-10',
    },
    {
      title: 'School Anniversary',
      description: 'Received a special gift for our school anniversary.',
      imageUrl: 'https://i.pinimg.com/474x/9e/89/65/9e8965cea14e73d6245759b218b0bd3c.jpg',
      date: '2020-11-20',
    },
  ]);

  // Fetch the counts using axios
  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axios.get(`${GlobalApi.baseUrl}/auth/count`);
        
        // Log the API response for debugging purposes
        console.log('API Response:', response.data);

        // Ensure the correct field names in the API response
        setCounts({
          staff: response.data.staff,
          worker: response.data.workers,
          book: response.data.books,
          student: response.data.students,
        });
      } catch (error) {
        console.error('Error fetching count data:', error);
      }
    };

    getCount();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Dashboard Heading */}
      <h1 className="text-4xl font-bold mb-10 text-center">Dashboard Overview</h1>

      {/* Responsive Grid Layout for Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center w-full">
        {/* Staff Count */}
        <div className="bg-blue-100 text-blue-800 p-6 rounded-lg shadow-md text-center min-w-[160px] min-h-[160px] flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Staff</h2>
          <p className="text-4xl">{counts.staff}</p> {/* Display Staff Count */}
        </div>

        {/* Worker Count */}
        <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow-md text-center min-w-[160px] min-h-[160px] flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Workers</h2>
          <p className="text-4xl">{counts.worker}</p> {/* Display Worker Count */}
        </div>

        {/* Book Count */}
        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg shadow-md text-center min-w-[160px] min-h-[160px] flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Books</h2>
          <p className="text-4xl">{counts.book}</p> {/* Display Book Count */}
        </div>

        {/* Student Count */}
        <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-md text-center min-w-[160px] min-h-[160px] flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <p className="text-4xl">{counts.student}</p> {/* Display Student Count */}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">School Achievements</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
              <img
                src={achievement.imageUrl}
                alt={achievement.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
              <p className="text-gray-600 mb-4">{achievement.description}</p>
              <p className="text-gray-400">Date: {achievement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
