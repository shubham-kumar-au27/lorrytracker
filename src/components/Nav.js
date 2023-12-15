import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ul className="space-y-4">
        <li>
          <Link
            to="/booking"
            className="block text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Booking
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/construction-site"
            className="block text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Construction Site
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
