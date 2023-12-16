import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()


  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const HandleBtnClick = () => {
    // Validate the form Data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // SignIn SignUp Logic
    if (!isSignInForm) {
      // SignUp logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          // Show success toast for registration
          toast.success('Registration successful!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);

          // Show error toast for registration
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log(userCredential);
          navigate('/home')

          // Show success toast for login
          toast.success('Login successful!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);

          // Show error toast for login
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        {/* <img className='h-screen object-cover' src={BG_URL} alt='logo' /> */}
      </div>
      <form
        className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-75'
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className='text-white font-bold text-3xl py-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            type='text'
            ref={name}
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-300'
          />
        )}
        <input
          type='text'
          ref={email}
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-300'
        />
        <input
          type='password'
          placeholder='Password'
          ref={password}
          className='p-4 my-4 w-full bg-gray-300'
        />
        <p className='text-red-500 font-bold text-lg py-2'>{errormessage}</p>
        <button
          className='p-4 my-4 bg-red-700 w-full rounded-lg'
          onClick={HandleBtnClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        <p
          className='py-4 text-white cursor-pointer'
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? 'New User ? Sign Up Now'
            : 'Already a User ? Sign In Now'}
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
