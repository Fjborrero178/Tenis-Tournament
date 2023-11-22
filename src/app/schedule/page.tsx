"use client"
import axios,{AxiosError} from "axios";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";


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

export default function Matches (){

const [responseData, setResponseData] = useState<Match[]>([]);
const [error, setError] = useState();
const router =useRouter();

  useEffect(() => {
    axios.get('/api/auth/match')
      .then(response => {
        console.log("Data fetched:", response.data);
       (setResponseData(response.data));
        console.log("Data fetched:",  typeof response.data)
        router.refresh()
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            setError(errorMessage);
          // Handle error, show an error message to the user
        }
      });
  }, [router]);
    
    return(
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Schedule</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {responseData.map((match)  => (
            <div key={match._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
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
                      <span aria-hidden="true" className="absolute inset-0" />
                      {match.local.toUpperCase()}  Vs {match.visitante.toUpperCase()}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{match.place.toUpperCase()}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">Day: {match.date} Hour: {match.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      )
}