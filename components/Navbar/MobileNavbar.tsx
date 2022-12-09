import React, { useState } from "react";
import Image from "next/image";
import HamburgerImage from "../../assets/images/hamburger.svg";
import CloseImage from "../../assets/images/close.svg";
import Link from "next/link";

export const MobileNavbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {!visible && (
        <Image
          onClick={() => {
            setVisible(true);
          }}
          src={HamburgerImage}
        />
      )}

      <div
        style={{ transition: "max-height 0.25s" }}
        className={`p-4 z-50 bg-white ${
          visible ? "max-h-screen" : "max-h-0"
        } overflow-hidden absolute top-0 left-0 w-screen`}
      >
        <nav className="flex justify-end py-2.5 ">
          <Image
            onClick={() => {
              setVisible(false);
            }}
            src={CloseImage}
          />
        </nav>

        <ul className=" my-48">
          <li className="flex flex-col gap-2">
            <a className="block text-center bg-white border-black border hover:bg-gray-200 rounded-md cursor-pointer text-base p-2">
              Leaderboard
            </a>

            <Link href={"/submit-review"}>
              <a className="block text-center bg-black text-white border-b border-gray-100 md:border-0 hover:bg-gray-700  rounded-md cursor-pointer text-base p-2">
                Submit Review
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
