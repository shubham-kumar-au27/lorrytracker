import React, { useEffect, useState, useRef  } from "react";
import { FaSignOutAlt, FaPlus, FaBars } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(); // Create a ref for the navigation
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("logged out"))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){
        const {uid,email,displayName} = user
       dispatch(addUser({uid:uid, email:email, displayName:displayName}))
      //  navigate('/home')
        
      } else {
       dispatch(removeUser())
       navigate('/')
      }
    });

    return () => unsubscribe();
  }, []);

  // Add an event listener to the document
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-row items-center bg-black">
    {
      user && (
        <div className="flex p-2 items-center justify-between w-full">
        <div>
          <button onClick={handleToggleNav} className="text-white p-2">
            <FaBars />
          </button>
        </div>
        <div className="flex items-center space-x-4">
         
              <button onClick={handleSignOut} className="text-white p-2">
              <FaSignOutAlt />
             </button>

           
          {
            user.displayName === 'admin'?(<div></div>):
            (<Link to ={'/createOrder'}> <button className="text-white p-2">{"Create Order"}</button></Link>)
          
        }
        </div>
      </div>
      )
    }
      </div>
      <div
        ref={navRef}
        className={`absolute left-0 top-0 h-full ${
          isNavOpen ? "w-1/3" : "w-0"
        } overflow-hidden transition-all bg-gradient-to-b from-black z-10`}
      >
        <Nav />
      </div>
    </div>
  );
};

export default Header;
