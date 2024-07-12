import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../helper/axios';

const Register = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
    })

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return passwordRegex.test(password);
    }

    const handleSubmit = () => {
        console.log(values);
        const {
            fullname,
            email,
            password,
            confirmpassword
        } = values;

        if (
            fullname.trim() === "" ||
            email.trim() === "" ||
            password === "" ||
            confirmpassword === ""
        ) {
            alert("fill the form")
            return
        }

        if (!isValidEmail(email.trim())) {
            alert("email not in correct format")
            return
        }

        if (password !== confirmpassword) {
            alert("password does not match")
            return
        }

        const postData = {
            fullname: fullname.trim(),
            email: email.trim(),
            password
        }

        axios
            .post("/register", postData, {
                withCredentials: true,
                credentials: "include"
            })
            .then((res) => {
                navigate("/otp")
                console.log("success")
            })
            .catch((err) => {
                console.log(err.message)
            })

    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='w-full flex flex-col items-center gap-4'>
                <div className='text-2xl font-semibold flex justify-center'>Registration</div>
                <div className='flex flex-col  gap-5 w-3/4 md:w-1/4'>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Full Name"
                        variant="standard"
                        name='fullname'
                        onChange={handleChanges}
                    />
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
                    <TextField
                        id="standard-multiline-flexible"
                        label="Confirm Password"
                        variant="standard"
                        name='confirmpassword'
                        onChange={handleChanges}
                    />
                    <Link to="/login">
                        <div className='w-full underline cursor-pointer'>login</div>
                    </Link>
                    <div className='w-full flex justify-center'>
                        <Button variant="contained" className='!bg-gray-900 !font-semibold' onClick={handleSubmit}>
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register