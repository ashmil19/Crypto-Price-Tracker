import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import axios from '../../helper/axios'

const OtpComponent = ({ path, email }) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')

    const handleOtpVerify = () => {
        if (otp.length !== 4) {
            alert("Fill the OTP")
            return;
        }

        axios.post("/otpVerify", { otp }, {
            withCredentials: true
        })
            .then((res) => {
                path ? navigate(path, { state: { email } }) : navigate('/login')
            })
            .catch((err) => {
                console.log(err.message);
            })
    }


    return (
        <div className='h-screen w-screen bg-otp-bg flex justify-center items-center px-2'>
            <div className='h-60 w-72 bg-white flex flex-col justify-around items-center shadow-2xl rounded-lg '>
                <div className='w-full flex flex-col items-center justify-center gap-2'>
                    <div className='font-semibold text-center'>OTP Verification</div>
                    <div className='text-xs px-2 text-center'>OTP Send to your registered email</div>
                </div>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    inputType='number'
                    shouldAutoFocus
                    inputStyle="[&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] text-4xl  h-13 focus:outline-none focus:shadow-outline border border-gray-500 caret-transparent"
                />
                <div className='w-full flex justify-center items-center gap-2'>
                    <Button variant="contained" className='!bg-gray-900 !font-semibold' onClick={handleOtpVerify}>
                        Verify
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OtpComponent