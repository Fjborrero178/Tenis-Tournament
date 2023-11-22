"client side"
import axios,{AxiosError} from "axios"
import { useState, FormEvent} from 'react'
import { useRouter } from "next/navigation";
export default function Tournamentadmin(){

    const [error, setError] = useState();
    const router =useRouter()

    
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{

      event.preventDefault();

      try {
        const propertiesMatch = new FormData(event.currentTarget);

        const addmatch = await axios.post("/api/auth/tournament", {
          local: propertiesMatch.get("local"),
          emaillocal: propertiesMatch.get("emaillocal"),
          visitante: propertiesMatch.get("visitante"),
          emailvisitante: propertiesMatch.get("emailvisitante"),
          date: propertiesMatch.get("date"),
          time: propertiesMatch.get("time"),
          place: propertiesMatch.get("place"),
        });
          console.log(addmatch);
        router.refresh();
      } catch (error) {
        console.error('Error submitting form:', error);
        router.refresh();
          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            setError(errorMessage);
          // Handle error, show an error message to the user
        }
      }
      
    }

  return ( <div className="mx-auto max-w-2xl px-1 py-10 sm:px-6  lg:max-w-7xl lg:px-8"> <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">ADD Tournament</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type = "text" className="border-solid border-2 border-black-600"placeholder = " Local " name = "local"/>
      <input type = "text" className="border-solid border-2 border-black-600"placeholder = " Visitante " name ="visitante"/>
      <input type = "date" className="border-solid border-2 border-black-600"placeholder= "Match Day" name = "date"/>
      <input type = "time" className="border-solid border-2 border-black-600"placeholder= "Match hour" name = "time"/>
      <input type = "text" className="border-solid border-2 border-black-600"placeholder = " Place " name = "place"/>
      <button className=" bg-blue-600 w-auto hover:bg-blue-800 text-white font-bold py-1  px-1 rounded-full"> +Tournament </button>
  </form>
  
  </div>
  )

}