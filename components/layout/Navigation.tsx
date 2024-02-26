import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import LogoutIcon from "../icons/Logout";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

type Props = {
  handleSignOut: () => void;
};

function Navigation({ handleSignOut = () => {} }: Props) {
  const router = useRouter();
  return (
    <>
    <div>
        {/* <DesktopNavigation handleSignOut={handleSignOut} /> */}
        <MobileNavigation handleSignOut={handleSignOut} />
    </div>
    </>
  );
}

export default Navigation;
