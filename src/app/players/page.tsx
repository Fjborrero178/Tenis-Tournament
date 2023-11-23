"use client"
import axios,{AxiosError} from "axios";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Player {
  _id: string;
  local: string;
  emaillocal: string;
  visitante: string;
  emailvisitante: string;
  date: string;
  time: string;
  place: string;
}

export default function Players (){//Get all the player for show

  const [responseData, setResponseData] = useState<Player[]>([]);


  useEffect(() => {

    axios.get('/api/auth/match') //component that get the players
    .then(response => {
        console.log("Data fetched:", response.data);
       (setResponseData(response.data));
        console.log("Data fetched:",  response.data)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
          // Handle error, show an error message to the user
        }
    });
  }, []);

    return(
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Players:</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {responseData.map((match)  => (
          <div key={match._id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
              <Image  
                src="./user.svg" 
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
                    {match.local.toUpperCase()} 
                  </a>
                </h3>
              </div>
            </div>
          </div>

          
          
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {responseData.map((match)  => (
          <div key={match._id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
              <Image  
                src="../user.svg" 
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
                    {match.visitante.toUpperCase()} 
                  </a>
                </h3>
              </div>
            </div>
          </div>

          
          
        ))}
      </div>
    </div>
    )
}