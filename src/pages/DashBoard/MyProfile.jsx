import React from "react";
import useAuth from "../../hooks/UseAuth/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="m-8 mx-auto">
     <div className="mt-10">
         <img className="size-34 mx-auto rounded-full"
        src={
          user?.photoURL
            ? user.photoURL
            : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
        }
        alt="User Image "
        
      />
     </div>
     <div className="m-6">
         <h1 className="text-center text-2xl">{user.displayName}</h1>
      <h1 className="text-center text-sm">{user.email}</h1>
     </div>
    </div>
  );
};

export default MyProfile;
