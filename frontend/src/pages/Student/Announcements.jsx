import React, { useEffect, useState } from "react";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("https://student-management-system-pm1u.onrender.com/api/announcements");
      if (response.data.success) {
        setAnnouncements(response.data.announcements);
      } else {
        console.error("Failed to fetch announcements");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📢 Announcements</h1>
      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li
              key={a._id}
              className="border border-gray-300 rounded p-4 shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{a.title}</h2>
              <p className="text-gray-700">{a.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on: {new Date(a.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
