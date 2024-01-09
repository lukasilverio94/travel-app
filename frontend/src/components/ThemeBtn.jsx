import React, { useState } from "react";
import classNames from "classnames";
import useTheme from "../context/theme";

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(false);

  const onChangeBtn = () => {
    setIsSelected(!isSelected);
    isSelected ? lightTheme() : darkTheme();
  };

  return (
    <div
      onClick={onChangeBtn}
      checked={themeMode === "dark"}
      className={classNames(
        "flex  w-12 h-6 bg-gray-600 rounded-full transition-all duration-500",
        {
          "bg-green-500": isSelected,
        }
      )}
    >
      <span
        className={classNames(
          "cursor-pointer w-6 h-6 bg-white shadow-lg rounded-full transition-all duration-500",
          {
            "ml-6": isSelected,
          }
        )}
      ></span>
    </div>
    // <div
    //   className={`bg-gray-500 w-20 mx-auto mt-10 cursor-pointer rounded-3xl toggler ${
    //     isDarkMode ? "dark:bg-green-500" : "dark:bg-blue-500"
    //   }`}
    //   onClick={handleToggleClick}
    // >
    //   <div
    //     className={`bg-white w-10 h-10 scale-75 rounded-3xl transition-transform ${
    //       isDarkMode ? "dark:bg-black" : "dark:bg-gray-300"
    //     }`}
    //   ></div>
    // </div>
  );
}
