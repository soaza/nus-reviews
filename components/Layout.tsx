import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Navbar } from "./Navbar";

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
      <div className="p-4 lg:px-16">
        <Navbar />

        <div>{children}</div>
      </div>
    </div>
  );
};
