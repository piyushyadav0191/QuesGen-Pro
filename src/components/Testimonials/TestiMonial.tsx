import React from "react";

type Props = {};

const TestiMonial = ({ data }: any) => {
  return (
    <div className="flex flex-wrap justify-center mt-8 mb-16">
      {data.map((user: any) => (
        <div
          key={user.id}
          className="bg-white shadow-lg rounded-[7%] overflow-hidden flex flex-col items-center text-center mx-4 my-4 dark:bg-gray-800"
          style={{ width: "300px", height: "100%" }}
        >
          <img
            src={user.user.image}
            alt={user.name}
            className="w-12 h-12 object-cover rounded-full mt-4"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user.name}
            </h2>
            <p className="text-gray-600 text-sm mt-2 dark:text-gray-300">
              {user.feedback}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestiMonial;
