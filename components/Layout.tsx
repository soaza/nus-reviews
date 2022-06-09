import Link from "next/link";
import React from "react";
import { Navbar } from "./Navbar";

export const Layout = (props) => {
  const { children } = props;

  return (
    <div>
      <div className="p-4 lg:px-16">
        <Navbar />

        <div>{children}</div>
      </div>
    </div>
  );
};
