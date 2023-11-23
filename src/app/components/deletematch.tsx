
import axios,{AxiosError} from "axios";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Match {
    _id: string;
    local: string;
    emaillocal: string;
    visitante: string;
    emailvisitante: string;
    date: string;
    time: string;
    place: string;
  }

export default function DeleteMatch (){  //Delete Match

      
    const [responseData, setResponseData] =useState<Match[]>([]);
    const [error, setError] = useState();

  useEffect(() => {
    axios.get('/api/auth/match')
      .then(response => {
        //console.log("Data fetched:", response.data);
        (setResponseData(response.data));
      })
      .catch(error => {
        //console.error("Error fetching data:", error);
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            setError(errorMessage);
          // Handle error, show an error message to the user
        }
      });
  }, []);
  
   

  
  const  handleDelete = async(id:string) => {
    console.log("Deleting");
    await axios.delete(`/api/delete/${id}`)
      .then(response => {
        //console.log("Match deleted:", response.data);
        // Update the state or refetch data as needed
      })
      .catch(error => {
        console.error("Error deleting match:", error);
        // Handle error, show an error message to the user
      });
  };
  
  return( 
    <>
  <div className="mx-auto max-w-2xl px-1 py-1 sm:px-6  lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Eliminate Match</h2>
    
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {responseData.map((match)  => (
        
        <div key={match._id} className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-40">
            <Image  
              src="/tenismatch.jpg" 
              className=" object-fill  lg:h-full lg:w-full"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-900">
                <a>
                  {match.local.toUpperCase()}  Vs {match.visitante.toUpperCase()}
                </a>
              </h3>
              <p className="mt-1 text-s text-gray-500">{match.place.toUpperCase()}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">Day: {match.date} Hour: {match.time}</p>
          </div >
          <div > <button className=" bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDelete(match._id)}> Eliminate Match</button></div>
          
        </div>
             
          
        
      ))}
     
    </div>
    
  </div>
  
  </>
)
}