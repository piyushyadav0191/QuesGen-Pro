import React from "react";

const Recent = ({ user }: any) => {
  return (
    <div className="flex items-center scroll-auto" key={user.id}>
      <div className="h-9 w-9 ">
        <img src={user.image} alt={user.name} className="rounded-full" />
      </div>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
};

export default Recent;
