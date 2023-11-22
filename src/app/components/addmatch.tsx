
import axios,{AxiosError} from "axios"
import { useState, FormEvent} from 'react'

export default function AddMatch(){

  const [error, setError] = useState();


    
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{

      event.preventDefault();

      try {
        const propertiesMatch = new FormData(event.currentTarget);

        const addmatch = await axios.post("/api/auth/addmatch", {
          local: propertiesMatch.get("local"),
          emaillocal: propertiesMatch.get("emaillocal"),
          visitante: propertiesMatch.get("visitante"),
          emailvisitante: propertiesMatch.get("emailvisitante"),
          date: propertiesMatch.get("date"),
          time: propertiesMatch.get("time"),
          place: propertiesMatch.get("place"),
        });
          console.log(addmatch);
      
      } catch (error) {
        console.error('Error submitting form:', error);
          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            setError(errorMessage);
          // Handle error, show an error message to the user
        }
      }
      
    }

  return ( 
  <div className="mx-auto max-w-2xl px-1 py-5 sm:px-6  lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">ADD Match</h2>
    <form   className="w-full max-w-sm" onSubmit={handleSubmit}>

   {error &&  <div className="text-red-800 text-xs italic text-center" >{error}</div>}
      <div className="flex items-center">
     <input type = "text"  placeholder = " Local " name = "local" className="border-solid border-2 border-black-600"/>
      <label> <input type = "email" placeholder = " Local@email.com " name = "emaillocal" className="border-solid border-2 border-black-600"/></label>
      <label > <input type = "text" placeholder = " Visitante " name ="visitante" className="border-solid border-2 border-black-600"/></label>
      <label> <input type = "email" placeholder = " Visitante@email.com " name = "emailvisitante" className="border-solid border-2 border-black-600"/></label>
      <label> <input type = "text" placeholder = " Place " name = "place" className="border-solid border-2 border-black-600"/></label>
      <label> <input type = "date" placeholder= "Match Day" name = "date" className="border-solid border-2 border-black-600"/></label>
      <label>  <input type = "time" placeholder= "Match hour" name = "time"className="border-solid border-2 border-black-600"/></label>
      <button className=" bg-blue-600 w-auto hover:bg-blue-800 text-white font-bold py-1  px-1 rounded-full"> +Match </button>
      </div>
  </form>
  </div>)
}