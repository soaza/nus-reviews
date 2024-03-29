import React, { useState } from "react";
import Image from "next/image";
import HamburgerImage from "../../assets/images/hamburger.svg";
import CloseImage from "../../assets/images/close.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export const MobileNavbar = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleNavigate = (link: string) => {
    setVisible(false);
    router.push(link);
  };

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
        className={` bg-white ${
          visible ? "h-screen p-4 z-50" : "h-0"
        } overflow-hidden absolute top-0 left-0 w-screen`}
      >
        <nav className="flex justify-end py-2.5 ">
          {visible && (
            <Image
              onClick={() => {
                setVisible(false);
              }}
              src={CloseImage}
            />
          )}
        </nav>

        <ul className=" my-48">
          <li className="flex flex-col gap-2">
            <div
              onClick={() => handleNavigate("/leaderboard")}
              className="block text-center bg-white border-black border hover:bg-gray-200 rounded-md cursor-pointer text-base p-2"
            >
              Leaderboard
            </div>

            <div
              onClick={() => handleNavigate("/submit-review")}
              className="block text-center bg-black text-white border-b border-gray-100 md:border-0 hover:bg-gray-700  rounded-md cursor-pointer text-base p-2"
            >
              Submit Review
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
