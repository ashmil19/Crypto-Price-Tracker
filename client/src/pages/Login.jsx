import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice'
import axios from '../helper/axios'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = () => {
    const {
      email,
      password,
    } = values;

    if (
      email.trim() === "" ||
      password === ""
    ) {
      alert("fill the form")
      return
    }

    if (!isValidEmail(email.trim())) {
      alert("email not in correct format")
      return
    }


    const postData = {
      email: email.trim(),
      password
    }

    axios
      .post("/login", postData, {
        withCredentials: true,
        credentials: "include"
      })
      .then((res) => {
        const userCredentials = {
          user: res.data.fullname,
          userId: res.data.userId,
          accessToken: res.data.accessToken,
        };
        dispatch(setCredentials(userCredentials))
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }


  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='text-2xl font-semibold flex justify-center'>Login</div>
        <div className='flex flex-col  gap-5 w-3/4 md:w-1/4'>
          <TextField
            id="standard-multiline-flexible"
            label="Email"
            variant="standard"
            name='email'
            onChange={handleChanges}
            />
          <TextField
            id="standard-multiline-flexible"
            label="Password"
            variant="standard"
            name='password'
            onChange={handleChanges}
          />
          <Link to="/register">
            <div className='w-full underline cursor-pointer'>register</div>
          </Link>
          <div className='w-full flex justify-center'>
            <Button variant="contained" className='!bg-gray-900 !font-semibold' onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login