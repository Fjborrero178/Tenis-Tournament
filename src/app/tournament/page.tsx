"use client"

import axios,{AxiosError} from "axios";
import Image from 'next/image';
import { useState, useEffect,ChangeEvent } from 'react';
import { useRouter } from "next/navigation";
interface Tournaments {
  _id: string;
  local: string;
  emaillocal: string;
  visitante: string;
  emailvisitante: string;
  date: string;
  time: string;
  place: string;

}

export default function Tournament (){
  const router = useRouter();
  const [responseData, setResponseData] = useState<Tournaments[]>([]);
  const [ local,setLocal] = useState("");
  const [ visitante,setVisitante] = useState("");
 
 const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    setLocal(event.target.value);
 }
  const handleVisitanteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVisitante(event.target.value);
  };
  const  handlePost = async(id:string) => {
    console.log(id);
    await axios.put(`/api/auth/tournament/${id}`,{
      local:local,
      visitante:visitante,
    
    })
      .then(response => {
        console.log("Match Posted:", response.data);
        router.refresh();
        // Update the state or refetch data as needed
      })
      .catch(error => {
        console.error("Error deleting match:", error);
        // Handle error, show an error message to the user
      });
  };
  try { 
     useEffect(() => {

    axios.get('/api/auth/tournament')
    .then(response => {
        console.log("Data fetched:", response.data);
       (setResponseData(response.data));
       router.refresh()
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            console.log(errorMessage);
          // Handle error, show an error message to the user
        }
    });
    router.refresh();
  }, [router]);}catch(error){}
 
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Tournament</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {responseData.map((tournament)  => (
            <div key={tournament._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-40">
                <Image  
                  src="/tournament.jpg" 
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
                      {!tournament.local &&!tournament.visitante?<div> 
                        <input type="text" 
                        onChange={handleChange} 
                        value={local} 
                        name="local"
                        placeholder="Participante 1"/>
                        <input type="text" 
                      onChange={handleVisitanteChange} 
                      value={visitante} 
                      name="visitante" 
                      placeholder="Participante 2"/>
                      <button className =" bg-blue-600 w-auto hover:bg-blue-800 text-white font-bold py-1  px-1 rounded-full"
                      onClick={() => handlePost(tournament._id)}> Parcticipate</button>
                      </div>: <div> {tournament.local.toUpperCase()} Vs {tournament.visitante.toUpperCase()} </div> } 
                      
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{tournament.place.toUpperCase()}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Day: {tournament.date} Hour: {tournament.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}