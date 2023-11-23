"use client"


import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from 'react'


export default function Login() { //login page 
 
  const [error, setError] = useState("");

  const router = useRouter();

    
  const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{ //submit the data from the form

      event.preventDefault();

      const credentials = new FormData(event.currentTarget);

      try { //SignIn 
        const response = await signIn('credentials',{
          email: credentials.get ("email"),
          password: credentials.get ("password"),
          redirect: false
        });
        if (response?.ok) return router.push("/");
        router.refresh()
        if (response?.error) setError(response.error as string);
        
      } catch (error) {

        console.error('Error submitting form:', error);
        // Handle error, show an error message to the user
      }
    
      
  }
    return (
      
      <div className="flex items-center justify-center h-screen ">
      <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h1 className="">Login </h1>
      {error &&  <p className="text-red-800 text-xs italic text-center" >{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type = "email" 
            placeholder="Example@email.com"  
            name="email"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Password
          </label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type = "password" 
            placeholder="Password"
            name="password"/>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        
          <Link className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" href ="/register">
             Do not have an account?
          </Link>
        </div>
      </form>
    </div>



    )
}