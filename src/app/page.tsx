"use client"
import axios,{AxiosError} from "axios"
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Home {
  _id: string;
  local: string;
  emaillocal: string;
  visitante: string;
  emailvisitante: string;
  date: string;
  time: string;
  place: string;
}

export default function HomePage(){

  const [responseData, setResponseData] = useState<Home[]>([]);
  const [error, setError] = useState();
  const router = useRouter();
 



  useEffect(() => {
    axios.get('/api/auth/match')
      .then(response => {
        console.log("Data fetched:", response.data);
       (setResponseData(response.data));
        console.log("Data fetched:",  typeof response.data)
        router.refresh();
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
  }, [router]);


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Match</h2>

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
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
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
                      {!tournament.local || !tournament.visitante? <div> <Link href="/tournament" className="text-teal-600"> Do you want participate?</Link></div> : <div> {tournament.local.toUpperCase()}  Vs {tournament.visitante.toUpperCase()}</div> }
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{tournament.place.toUpperCase()}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">Day: {tournament.date} Hour: {tournament.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-0.5 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Players</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {responseData.map((match)  => (
            <div key={match._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-40">
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
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-40">
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

    </div>
    
  )
}