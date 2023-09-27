import React from "react";
import Recent from "./Recent";

type Props = {
  users: {
    id: string;
    name: string;
    email: string;
    image: string;
  }[];
};

const RecentUsers = ({ users }: Props) => {
  return (
    <div className="space-y-8">
      {users.map((user) => (
        <Recent user={user} />
      ))}
    </div>
  );
};

export default RecentUsers;
