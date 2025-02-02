import React, { useState } from 'react';

export const Tabs = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex space-x-4 border-b mb-4">
        {React.Children.map(children, (child, index) => (
          <button
            className={`px-4 py-2 ${
              activeIndex === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div>{children[activeIndex]}</div>
    </div>
  );
};

export const Tab = ({ children }) => <div>{children}</div>;
