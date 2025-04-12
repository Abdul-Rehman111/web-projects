import React from "react";

export default function Button({
    children,
  // These below values are the default values which
  // is set from the frontend you can also overwrite them
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
      // ...rest // This spread operator is used to pass any additional props to the button element
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
            {/* Spread the remaining props to the button element*/}
        </button>
    );
}
