import React from "react";
import { useState, useLayoutEffect, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import { supabase } from "@/supabase";
import MobileNavigation from "./MobileNavigation";

type Props = {
  children: any;
};

function Layout({ children }: Props) {
  const router = useRouter();
  const [width, setWidth] = useState<any>(false);
  const { user , setUser} = useUserStore();
  const [loggedIn, setIsLoggedIn] = useState<any>(false);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(false);
    localStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    setIsLoggedIn(user);
  }, [user]);

  const style = {
    width:
      router.asPath === "/login" ? "100%" : width ? `${width - 60}px` : "auto",
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div className="h-full w-full flex">
      {router.asPath === "/login" ? (
        <></>
      ) : (
        <aside className="sticky h-screen top-0 w-[45px] z-10">
          <MobileNavigation 
          handleSignOut={logout}
          />
        </aside>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: {
              opacity: 0,
            },
          }}
        >
          <main
            className={`${
              router.asPath === "/login"
                ? ""
                : "flex-1 px-6 py-10 overflow-y-scroll"
            }`}
            style={style}
          >
            {children}
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Layout;
