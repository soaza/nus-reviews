import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { getRandomAvatarOptions } from "../utils/bighead-randomise";

import { createClient } from "@supabase/supabase-js";

import "../styles/index.css";
import { insert } from "formik";

const { v4: uuidv4 } = require("uuid");

const queryClient = new QueryClient({});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const initUser = () => {
    const userUuid = uuidv4();
    localStorage.setItem("userUuid", userUuid);
    const avatarOptions = getRandomAvatarOptions();
    const insertUser = async () => {
      await supabase
        .from("Users")
        .insert([{ user_uuid: userUuid, user_avatar: avatarOptions }]);
    };
    insertUser();
  };

  useEffect(() => {
    // For new users
    if (!localStorage.getItem("userUuid")) {
      initUser();
      // router.push("new-user");
    }
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Muli"
        rel="stylesheet"
      />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
