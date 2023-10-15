"use client";

import { DashboardIcon } from "@radix-ui/react-icons";
import {
  CalendarHeart,
  CircuitBoard,
  Home,
  Menu,
  Smile,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Logo from "../Logo";

const Sidebar = () => {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const closeSidebarOnOutsideClick = (event: any) => {
      if (isSidebarOpen) {
        const sidebarElement = document.getElementById("sidebar");

        if (sidebarElement && !sidebarElement.contains(event.target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", closeSidebarOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <AnimatePresence mode="wait">
        {/* Sidebar */}
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 z-10 flex w-80 dark:bg-gray-900"
            id="sidebar"
          >
            {/* Curvy shape */}
            <svg
              className="absolute inset-0 w-full h-full text-white "
              style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
              preserveAspectRatio="none"
              viewBox="0 0 309 800"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
            </svg>
            {/* Sidebar content */}
            <div className="z-10 flex flex-col flex-1 dark:bg-gray-900">
              <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
                {/* Logo */}
                <Link href={"/"} className="px-4 text-2xl font-bold ">
                  QuesGen Pro
                </Link>
                {/* Close btn */}
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-lg focus:outline-none focus:ring"
                >
                  <X className="w-6 h-6" />
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
              <nav className="flex flex-col flex-1 w-64 p-4 mt-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-2 mb-5 px-2 ${
                    pathname === "/dashboard"
                      ? "bg-blue-500 px-6 w-full h-10 rounded-full text-white"
                      : null
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Home className="w-6 h-6 mr-2" />
                  <span>DashBoard</span>
                </Link>

                <Link
                  href="/leaderboard"
                  className={`flex items-center space-x-2 mb-5 px-2 ${
                    pathname === "/leaderboard"
                      ? "bg-blue-500 px-6 w-full h-10 rounded-full text-white"
                      : null
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <CircuitBoard className="w-6 h-6" />
                  <span>Leaderboard</span>
                </Link>
                <Link
                  href="/relax-space"
                  className={`flex items-center space-x-2 mb-5 px-2 ${
                    pathname === "/relax-space"
                      ? "bg-blue-500 px-6 w-full h-10 rounded-full text-white"
                      : null
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Smile className="w-6 h-6" />
                  <span>Relax space</span>
                </Link>
                <Link
                  href="/career-advice"
                  className={`flex items-center space-x-2 mb-5 px-2 ${
                    pathname === "/career-advice"
                      ? "bg-blue-500 px-6 w-full h-10 rounded-full text-white"
                      : null
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <CalendarHeart className="w-6 h-6" />
                  <span>Career Advice</span>
                </Link>
              </nav>
              <div className="flex-shrink-0 p-4">
                <button className="flex items-center space-x-2">
                  <span>Welcome!</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex flex-col items-center justify-center flex-1">
        <button
          onClick={toggleSidebar}
          className="fixed  text-black dark:text-white rounded-lg top-5 left-5"
        >
          <Menu className="w-6 h-6" />
          <span className="sr-only">Open menu</span>
        </button>
        <h1 className="sr-only">Home</h1>
      </main>
    </div>
  );
};

export default Sidebar;
