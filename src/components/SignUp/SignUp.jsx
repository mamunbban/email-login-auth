import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked
        console.log(email, password, terms);

        //reset error message
        setErrorMessage('')
        setSuccess(false);

        if(!terms){
            setErrorMessage('please mark the check box')
            return;
        }

        if (password.length < 6) {
            setErrorMessage('password should be 6 characters or longer');
            return;
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,}$/;
        if (!regex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase, one special character ,one number');
            return;
        }


        //create user email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)
            })

             //verified email
             sendEmailVerification(auth.currentUser)
             .then(()=>{
                 console.log('sent');
             })

            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message);
                setSuccess(false)
            })
           
    }
    return (

        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl text-center py-4 font-bold">Sign Up now!</h1>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'}
                        name='password' placeholder="password" className="input input-bordered" required />

                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-2">
                            
                            <input type="checkbox" name='terms' className="checkbox" />
                            <span className="label-text">accept our condition </span>
                        </label>
                    </div>

                    <button onClick={() => setShowPassword(!showPassword)}
                        className='btn btn-xs absolute right-4 top-12'>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className='text-red-600'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-600'>Sign Up Successfully </p>
            }
            <p>already have an account ? please <Link to='/login'>Login</Link></p>
        </div>

    );
};

export default SignUp;