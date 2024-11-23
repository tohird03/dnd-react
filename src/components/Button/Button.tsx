import React from 'react';

type Props = {
  text?: string;
  color?: 'blue' | 'red' | 'green';
  icon?: React.ReactNode,
  onClick?: () => void;
  style?: Object
};

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
  red: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
  green: 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
};

export const Button = ({ text, color = 'blue', icon, onClick, style }: Props) => {
  const selectedColor = colorClasses[color] || colorClasses.blue;

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`focus:outline-none text-white ${selectedColor} font-medium rounded-lg text-sm px-2 py-2 mb-1`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};
