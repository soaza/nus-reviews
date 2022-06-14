import { BigHead } from "@bigheads/core";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../utils/context";
import { supabase } from "../utils/supabase";

export const Avatar = (props: { avatarOption: any }) => {
  const { avatarOption } = props;
  return <BigHead {...(avatarOption as any)} />;
};

export const SelfAvatar = () => {
  const { user } = useContext(UserContext);
  const { data: avatarOption } = useQuery(["user_avatar", user], async () => {
    if (user) {
      const { data, error } = await supabase
        .from("Users")
        .select("user_avatar")
        .eq("user_uuid", user.user_uuid);

      if (error) {
        return;
      }

      return data[0].user_avatar;
    }
  });

  if (avatarOption) {
    return <BigHead {...(avatarOption as any)} />;
  } else {
    return null;
  }
};
