import React from "react";
import { useState, useLayoutEffect } from "react";
import Navigation from "./Navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

type Props = {
  children: any;
};

function Layout({ children }: Props) {
  const router = useRouter();
  const [width, setWidth] = useState<any>(false);

  const style = {
    width: width ? `${width - 200}px` : "auto",
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
    <div className="h-full w-full flex justify-between">
      <div className="fixed bg-white h-screen w-[200px]">
        <Navigation />
      </div>
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
            className={`ml-[200px] flex-1 container px-6 py-10 overflow-hidden`}
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
