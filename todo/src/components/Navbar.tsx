import React, { useState, useEffect } from "react";

interface NavbarProps {
  onOpenModal: () => void;
}

function Navbar({ onOpenModal }: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;

      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      localStorage.setItem("isDarkMode", JSON.stringify(newMode));

      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-row w-full h-[150px] items-center justify-between px-20">
      <p className="text-4xl font-[400] select-none text-black dark:text-white">
        Tasks
      </p>

      <div className="flex flex-row w-[200px] justify-end gap-5">
        <div
          className="h-[60px] w-[60px] bg-gray-300 dark:bg-[#535353] rounded-full flex justify-center items-center cursor-pointer"
          onClick={onOpenModal}
        >
          {isDarkMode ? (
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5.25v13.5"></path>
              <path d="M18.75 12H5.25"></path>
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5.25v13.5"></path>
              <path d="M18.75 12H5.25"></path>
            </svg>
          )}
        </div>

        <div
          className="h-[60px] w-[60px] bg-gray-300 dark:bg-[#535353] rounded-full flex justify-center items-center cursor-pointer"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <svg
              width="26"
              height="26"
              fill="#ffffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5.531A1.031 1.031 0 0 1 10.969 4.5V2.25a1.031 1.031 0 1 1 2.062 0V4.5A1.031 1.031 0 0 1 12 5.531Z"></path>
              <path d="M12 22.781a1.031 1.031 0 0 1-1.031-1.031V19.5a1.031 1.031 0 1 1 2.062 0v2.25A1.031 1.031 0 0 1 12 22.781Z"></path>
              <path d="M17.303 7.73a1.032 1.032 0 0 1-.73-1.76l1.591-1.592a1.031 1.031 0 0 1 1.458 1.459l-1.59 1.59a1.027 1.027 0 0 1-.73.303Z"></path>
              <path d="M5.105 19.929a1.03 1.03 0 0 1-.729-1.76l1.591-1.592a1.031 1.031 0 1 1 1.459 1.459l-1.591 1.59a1.03 1.03 0 0 1-.73.303Z"></path>
              <path d="M21.75 13.031H19.5a1.031 1.031 0 1 1 0-2.062h2.25a1.031 1.031 0 1 1 0 2.062Z"></path>
              <path d="M4.5 13.031H2.25a1.031 1.031 0 1 1 0-2.062H4.5a1.031 1.031 0 1 1 0 2.062Z"></path>
              <path d="M18.894 19.925a1.027 1.027 0 0 1-.73-.302l-1.59-1.591a1.03 1.03 0 0 1 1.458-1.458l1.591 1.59a1.031 1.031 0 0 1-.729 1.761Z"></path>
              <path d="M6.696 7.73a1.026 1.026 0 0 1-.729-.302l-1.59-1.591a1.031 1.031 0 0 1 1.458-1.459l1.59 1.591a1.031 1.031 0 0 1-.729 1.76Z"></path>
              <path d="M12 16.781A4.782 4.782 0 1 1 16.781 12 4.787 4.787 0 0 1 12 16.781Z"></path>
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              fill="#000000"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.375 22.5A10.875 10.875 0 0 1 1.5 11.625c0-4.406 2.531-8.357 6.45-10.063a.75.75 0 0 1 .988.988c-.45 1.033-.688 2.356-.688 3.825 0 5.17 4.206 9.375 9.375 9.375 1.47 0 2.792-.238 3.826-.688a.751.751 0 0 1 .987.988c-1.706 3.919-5.657 6.45-10.063 6.45Z"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
