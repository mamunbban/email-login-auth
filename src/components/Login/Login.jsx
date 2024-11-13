import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef()

    const handleLogin = e =>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //reset status
        setSuccess(false);


        //sign in user 
        signInWithEmailAndPassword(auth, email,password)
        .then(result =>{
            console.log(result.user);
            if(!result.user.emailVerified){
                setErrorMessage('please verify your email address')
            }
            else{
                setSuccess(true)
            }
            setSuccess(true);
        })
        .catch(error => {
            console.log('ERROR', error.message);
        })

    }
    const handleForget =()=>{

        console.log('get the email');
        const email = emailRef.current.value;
        if(!email){
            console.log('plz provide a valid email');
        }
        else{
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert('reset email sent check inbox')
            })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={emailRef} type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password " name='password' placeholder="password" className="input input-bordered" required />
                            <label onClick={handleForget} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        success && <p className='text-green-600'>Succesfully login</p>
                    }
                   

                    <p>new this website please <Link to='/sign-up'>SignUp</Link></p>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;