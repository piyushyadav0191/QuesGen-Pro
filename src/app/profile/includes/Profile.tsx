"use client";
import React, { useState } from "react";

type Props = {
  user: {
    id: number;
    name: string;
    email: string;
    image: string;
    game: {
      id: number;
      topic: string;
      gameType: string;
      Question: {
        id: number;
        question: string;
        answer: string;
      }[];
    }[];
  };
};

const Profile = ({ user }: Props) => {
  const [activeTab, setActiveTab] = useState("about"); // Default to "about" tab

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 h-[90vh] p-6 rounded-lg shadow-md flex dark:bg-gray-900">
      {/* First Column */}
      <div className="flex-shrink-0 w-1/3 ml-8">
        <img
          src={user.image}
          alt={user.name}
          className="rounded-full w-48 h-48 "
        />
      </div>

      {/* Second Column */}
      <div className="ml-6 flex-grow">
        <h1 className="text-3xl font-semibold mb-4 dark:text-gray-200">
          {user.name}'s Profile
        </h1>

        {/* Tabs */}
        <div className="mb-4">
          <button
            className={`${
              activeTab === "about"
                ? "bg-purple-500 hover:bg-purple-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            } px-4 py-2 mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
            onClick={() => handleTabChange("about")}
          >
            About
          </button>
          <button
            className={`${
              activeTab === "questions"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
            } px-4 py-2 rounded-lg dark:text-gray-200`}
            onClick={() => handleTabChange("questions")}
          >
            Questions
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "about" && (
          <div>
            <p className="dark:text-gray-300 text-black">User ID: {user.id}</p>
            <p className="dark:text-gray-300 text-black">Email: {user.email}</p>
          </div>
        )}

        {activeTab === "questions" && (
          <div style={{ maxHeight: "70vh", overflowY: "scroll" }}>
            <h2 className="text-2xl font-semibold mt-4 mb-4 dark:text-gray-200">
              Past Games Played
            </h2>
            <ul className="list-none">
              {user.game.map((game) => (
                <li
                  key={game.id}
                  className="mb-8 border-b border-gray-300 pb-6"
                >
                  <div className="mb-4">
                    <p className="text-xl font-semibold dark:text-gray-200">
                      Topic: {game.topic}
                    </p>
                    <p className="text-gray-600 underline font-semibold">
                      Game Type: {game.gameType}
                    </p>
                    {/* Add other game details here */}
                  </div>

                  <ul className="list-none">
                    {game.Question.map((question) => (
                      <li key={question.id} className="mb-4">
                        <p className="text-lg font-semibold dark:text-gray-200">
                          Question: {question.question}
                        </p>
                        <p className="text-gray-600 dark:text-gray-200">
                          Answer: {question.answer}
                        </p>
                        {/* Display other question details */}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
