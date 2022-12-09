import React, { useContext } from "react";
import { SelfAvatar } from "../components/Avatar";
import { UserContext } from "../utils/context";
import moment from "moment";
import { parseDate } from "../utils/common";

export const UserPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <div className="lg:grid grid-cols-12 lg:p-40">
      <div className="col-span-4 w-180">
        <SelfAvatar />
      </div>

      <div className="col-span-8 flex flex-col align-middle justify-center">
        <div className="text-xl lg:text-3xl font-semibold ">
          {user.user_name}
        </div>
        <div className="text-xl lg:text-2xl font-light ">
          Joined: {parseDate(user.user_created_at)}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
