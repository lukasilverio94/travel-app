import React from "react";

export default function ThemeBtn() {
  return (
    <button
      title="Toggle Theme"
      class="
        w-12 
        h-6 
        rounded-full 
        p-1 
        bg-transparent
        relative 
        transition-colors 
        duration-500 
        ease-in
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-700 
        dark:focus:ring-blue-600 
        focus:border-transparent
      "
    >
      <div
        id="toggle"
        class="
            rounded-full 
            w-4 
            h-4 
            bg-blue-600 
            dark:bg-blue-500 
            relative 
            ml-0 
            dark:ml-6 
            pointer-events-none 
            transition-all 
            duration-300 
            ease-out
        "
      ></div>
    </button>
  );
}
