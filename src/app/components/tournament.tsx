import axios,{AxiosError} from "axios"
import { useState, FormEvent} from 'react'

export default function Tournamentadmin(){ //post tournament

    const [error, setError] = useState();


    
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{

      event.preventDefault();

      try {
        const propertiesMatch = new FormData(event.currentTarget);

        const addmatch = await axios.post("/api/auth/tournament", {
          local: propertiesMatch.get("local"),
          visitante: propertiesMatch.get("visitante"),
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

  return ( <div> <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type = "text" placeholder = " Local " name = "local"/>
      <input type = "text" placeholder = " Visitante " name ="visitante"/>
      <input type = "date" placeholder= "Match Day" name = "date"/>
      <input type = "time" placeholder= "Match hour" name = "time"/>
      <input type = "text" placeholder = " Place " name = "place"/>
      <button> ADD Match </button>
  </form>
  
  </div>
  )

}