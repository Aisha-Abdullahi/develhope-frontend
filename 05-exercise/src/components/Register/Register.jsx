import React, { useRef, useState } from 'react'
import classes from './Register.module.css'
import logo from '../../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'


export default function Register() {
    const nameRef = useRef()
    const passwordRef =useRef()
    const confirmationRef = useRef()
    const emailRef = useRef()
    const navigate =useNavigate()
    const [loading, setLoading] = useState(false)

    const register = () =>{

        fetch(`${process.env.REACT_APP_API_URL}users/register`, {
            method: 'post',
            body: JSON.stringify({
                email: emailRef.current.value,
                name: nameRef.current.value,
                password: passwordRef.current.value,
                password_confirmation: confirmationRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) =>{
            response.json().then((json) =>{
                if (json.success) {
                    navigate('/login')
                }else{
                    alert ('password too short')
                }
            })
        })
    }

  return (
    <div className="container">
            <div className="row">
                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className={`${classes.register} my-5 p-5`}>
                        <div className={`${classes.logo} mb-4`}>
                            <img src={logo} alt='' />
                        </div>
                        <h1 className={`${classes.title} mb-4`}>Register</h1>
                        <div className='form-field mb-3'>
                            <label htmlFor='email' className='mb-2'>Email Address</label>
                            <input type='email' ref={emailRef} id="email" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='name' className='mb-2'>Name</label>
                            <input type='text' ref={nameRef} id="name" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='password' className='mb-2'>Password</label>
                            <input type='password' ref={passwordRef} id="password" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='password_confirmation' className='mb-2'>Confirm Password</label>
                            <input type='password' ref={confirmationRef} id="password_confirmation" className='form-control' />
                        </div>
                        <div className='row mt-5 align-items-center'>
                            {/* <div className='col-5'>
                                <Link className='' to='/'>Register</Link>
                            </div> */}
                            <div className='col-7'>
                                <button
                                    onClick={register}
                                    type='button'
                                    className='btn btn-primary w-100'
                                    disabled={loading}>
                                        {loading ? 'Please Wait' : 'Register'}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
