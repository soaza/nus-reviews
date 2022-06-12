import React, { createContext, useEffect, useMemo, useState } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { getRandomAvatarOptions } from "../utils/bighead-randomise";
import { supabase } from "../utils/supabase";
import { generateUniqueUserName } from "../utils/common";
import { UserContext } from "../utils/context";

import "../styles/index.css";

const { v4: uuidv4 } = require("uuid");

const queryClient = new QueryClient({});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const initUser = () => {
    const userUuid = uuidv4();
    localStorage.setItem("userUuid", userUuid);
    setUserUuid(userUuid);
    const avatarOptions = getRandomAvatarOptions();
    const insertUser = async () => {
      await supabase.from("Users").insert([
        {
          user_uuid: userUuid,
          user_avatar: avatarOptions,
          user_name: generateUniqueUserName(),
        },
      ]);
    };
    insertUser();
  };

  useEffect(() => {
    // For new users
    if (!localStorage.getItem("userUuid")) {
      initUser();
      // router.push("new-user");
    } else {
      const userUuid = localStorage.getItem("userUuid");
      setUserUuid(userUuid);
    }
  }, []);

  const [userUuid, setUserUuid] = useState("");

  const contextValue = useMemo(() => ({ userUuid, setUserUuid }), [userUuid]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Muli"
        rel="stylesheet"
      />
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={contextValue}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
