"use client"
import axios,{AxiosError} from "axios"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent} from 'react'



export default function Register() {

  const [error, setError] = useState();
  const router = useRouter();
  const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{

      event.preventDefault();

      try {
        const credentials = new FormData(event.currentTarget);

        const signupResponse = await axios.post("/api/auth/signup", {
          name: credentials.get("name"),
          lastName: credentials.get("lastName"),
          email: credentials.get("email"),
          password: credentials.get("password"),
        });

        const response = await signIn('credentials',{
          email: signupResponse.data.email,
          password: credentials.get ("password"),
          redirect: false
        })

        if (response?.ok) return router.push("/");
        router.refresh()
      } catch (error) {
        console.error('Error submitting form:', error);
          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            setError(errorMessage);
          // Handle error, show an error message to the user
        }
      }
      
  }
  {error && <div className=" rgb-error">{error}</div>}
 
  return (

    <div className="flex items-center justify-center h-fit ">
      <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h1 className="">Login </h1>
      {error &&  <p className="text-red-800 text-xs italic text-center" >{error}</p>}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"  >
                Name:
              </label>
              <div >
                <div >
                    <input type = "text" 
                    placeholder="Name" 
                    name="name"
                    className="shadow appearance-none  border py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                    
                  </div>
              </div>     
        </div>
      <div >
          <label className="block text-gray-700 text-sm font-bold mb-2" >
                Last name
          </label>
              <div></div>
        <input type = "text" 
        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Last Name" 
        name="lastName"/>
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
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            type = "password" 
            placeholder="Password"
            name="password"/>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        
        
        </div>
      </form>
    </div>



  )
}