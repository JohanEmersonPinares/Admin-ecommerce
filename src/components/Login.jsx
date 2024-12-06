import axios from 'axios'
import  { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500'>
          <div className='bg-white shadow-xl rounded-lg px-10 py-8 max-w-sm w-full'>
            <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
              <div className='mb-5'>
                <label htmlFor="email" className='block text-sm font-medium text-gray-600 mb-2'>
                  Email Address
                </label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200'
                  type="email"
                  placeholder='youremail@example.com'
                  required
                />
              </div>

              <div className='mb-6'>
                <label htmlFor="password" className='block text-sm font-medium text-gray-600 mb-2'>
                  Password
                </label>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200'
                  type="password"
                  placeholder='Enter your password'
                  required
                />
              </div>

              <button
                type="submit"
                className='w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700 transition duration-200'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      );
}

export default Login
