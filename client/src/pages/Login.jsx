import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='text-2xl font-semibold flex justify-center'>Login</div>
        <div className='flex flex-col  gap-5 w-3/4 md:w-1/4'>
          <TextField
            id="standard-multiline-flexible"
            label="Email"
            variant="standard"
          />
          <TextField
            id="standard-multiline-flexible"
            label="Password"
            variant="standard"
          />
          <Link to="/register">
            <div className='w-full underline cursor-pointer'>register</div>
          </Link>
          <div className='w-full flex justify-center'>
            <Button variant="contained" className='!bg-gray-900 !font-semibold'>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login