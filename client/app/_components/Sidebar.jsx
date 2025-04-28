"use client"

import { AlignJustify } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Menu from "../_components/Menu";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from 'next/navigation';

const slideVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const Sidebar = ({ type }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const handleBackClient = () => {
    router.push("/");
  }
  return (
    <>
      <AnimatePresence>
        {!visible && (
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`${
              type === "big" ? "hidden md:block" : "block"
            } h-full z-10`}
          >
            <div className="py-5 bg-gray-100 w-[17rem] rounded-r-3xl shadow-md pr-4 h-full">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center justify-start cursor-pointer font-medium text-sm pl-3" onClick={handleBackClient}>
                  <Image
                    alt="logo"
                    width={30}
                    height={30}
                    src={"/images/logo.png"}
                  />
                  <p className="text-[1.5rem] text-primary">QAirLine</p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <AlignJustify />
                </div>
              </div>
              <Menu />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={` py-5 pl-3 z-10 ${
            type === "big" ? "hidden md:block" : "block"
          }`}
        >
          <AlignJustify
            className="cursor-pointer"
            onClick={() => {
              setVisible(false);
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
