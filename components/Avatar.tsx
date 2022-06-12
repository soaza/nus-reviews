import { BigHead } from "@bigheads/core";
import React, { useEffect, useState } from "react";
import { supabase } from "../pages/_app";

export const Avatar = (props: { avatarOption: any }) => {
  const { avatarOption } = props;
  return <BigHead {...(avatarOption as any)} />;
};

export const SelfAvatar = () => {
  const [avatarOption, setAvatarOption] = useState();

  useEffect(() => {
    const userUuid = localStorage.getItem("userUuid");
    const fetchAvatarSettings = async () => {
      const { data, error } = await supabase
        .from("Users")
        .select("user_avatar")
        .eq("user_uuid", userUuid);

      setAvatarOption(data[0].user_avatar);
    };

    fetchAvatarSettings();
  }, []);

  if (avatarOption) {
    return <BigHead {...(avatarOption as any)} />;
  } else {
    return null;
  }
};
