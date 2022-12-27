import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SelfAvatar } from "./Avatar";
import { Navbar } from "./Navbar/Navbar";

export const Layout = (props) => {
  const { children } = props;
  const { asPath } = useRouter();

  const standalonePaths = ["/new-user", "/new-user/complete"];

  if (standalonePaths.includes(asPath)) {
    return (
      <div className="p-4 lg:px-16">
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div>
      <Link href={"/user"}>
        <div className="cursor-pointer fixed bottom-0 right-0 w-16">
          <SelfAvatar />
        </div>
      </Link>

      <div className=" p-2 text-center font-medium bg-black text-white">
        ❗️ Currently, there are a lack of reviews on the platform,especially
        for GE-coded modules,we would appreciate new reviews which can be
        submitted{" "}
        <span className="font-bold underline">
          <Link href={"/submit-review"}>here</Link>
        </span>
        !
      </div>

      <div className="p-4 lg:px-16">
        <Navbar />

        <div>{children}</div>

        {/* <div className=" bottom-0 left-0 fixed text-center w-full text-gray-400">
          Photos from{" "}
          <a
            target="_blank"
            href="https://opendoodles.com/"
            className="underline"
          >
            https://opendoodles.com/
          </a>
        </div> */}
      </div>
    </div>
  );
};
