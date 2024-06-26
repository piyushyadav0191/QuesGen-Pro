"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

const Recent = ({ user }: any) => {
  const { mutate: deleteUser } = useMutation(
    (id: string) => fetch(`/api/users?userId=${id}`, { method: "DELETE" }),
    {
      onSuccess: () => {
        toast.success("User deleted successfully");
      },
      onError: () => {
        toast.error("Error deleting user");
      },
    }
  );

  return (
    <div className="flex items-center scroll-auto" key={user.id}>
      <div className="h-9 w-9 ">
        <img src={user.image} alt={user.name} className="rounded-full" />
      </div>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      <div className="ml-auto">
        <button onClick={() => deleteUser(user.id)} className="mr-3 px-2">
          <Trash2 size={16} color="red" />
        </button>
      </div>
    </div>
  );
};

export default Recent;
