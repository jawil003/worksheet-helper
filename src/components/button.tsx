import React from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

/**
 * An Button React Component.
 * @author Jannik Will
 * @version 0.1
 */
export const Button: React.FC<Props> = ({ children, icon, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      type="button"
      className={
        "py-2 px-4 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg " +
        buttonProps?.className
      }
    >
      {icon}
      {children}
    </button>
  );
};
