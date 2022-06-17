import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { getRandomAvatarOptions } from "../utils/bighead-randomise";
import { supabase } from "../utils/supabase";
import { generateUniqueUserName } from "../utils/common";
import { UserContext } from "../utils/context";
import { IUser } from "../utils/interface";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";

const { v4: uuidv4 } = require("uuid");

const queryClient = new QueryClient({});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const initUser = () => {
    const userUuid = uuidv4();
    localStorage.setItem("userUuid", userUuid);
    // setUserUuid(userUuid);
    const avatarOptions = getRandomAvatarOptions();
    const insertUser = async () => {
      const data = await supabase.from("Users").insert([
        {
          user_uuid: userUuid,
          user_avatar: avatarOptions,
          user_name: generateUniqueUserName(),
        },
      ]);
      setUser(data[0]);
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
      const fetchUser = async () => {
        const { data } = await supabase
          .from("Users")
          .select()
          .eq("user_uuid", userUuid);
        setUser(data[0]);
      };
      fetchUser();
    }
  }, []);

  const [user, setUser] = useState<IUser>();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Muli"
        rel="stylesheet"
      />
      <Head>
        <title> {"NUSReviews"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <ToastContainer />
    </>
  );
};

export default MyApp;
