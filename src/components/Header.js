import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addUser, removeUser } from '../utils/userSlice';





const Header = () => {

  // const dispatch = useDispatch();

  // const navigate = useNavigate();
  // const user = useSelector(store => store.user);
  const handleSignOut = ()=>{
    signOut(auth).then(() => {console.log('logged out')}).catch((error) => {
      // An error happened.
      console.log(error)
      // navigate("/error");
    });
  }
  useEffect(()=>{
    // user? console.log(user) : console.log('user Not Found')
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
        if (user) {
          // const {uid,email,displayName,photoURL} = user;
          

          // dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
          console.log(user.email)
          // navigate('/browse')
    
        } else {
          // User is signed out
          // dispatch(removeUser())
          console.log('loggedout')
          // navigate('/')
        }
      });
      //unsubscribe when component unmounts------
      return () => unsubscribe();


},[])


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col
     md:flex-row justify-between
     bg-black '>
         
        {
          <div className='flex p-2 justify-between'>
            
          <button onClick={handleSignOut} className='font-bold text-white'>{'SignOut'}</button>

          <button className='font-bold text-white' >Create Order</button>
        </div>
        }

    </div>
  )
}

export default Header
