import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const AdminAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || message.trim() === "") {
      alert("Please fill in both Title and Message.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/announcements", {
        title,
        message,
      });

      if (response.data.success) {
        alert("✅ Announcement added successfully!");
        setTitle("");
        setMessage("");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
      alert("Failed to add announcement.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main p-8">
        <h1 className="text-3xl font-bold mb-6">Add Announcement</h1>
        <form
          onSubmit={handleAddAnnouncement}
          className="flex flex-col gap-4 max-w-xl"
        >
          <input
            type="text"
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            required
          />

          <textarea
            placeholder="Announcement Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-3 border border-gray-300 rounded h-40"
            required
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            📢 Post Announcement
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAnnouncements;
