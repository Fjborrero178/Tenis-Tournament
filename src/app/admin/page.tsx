"use client"
import { useEffect } from "react";
import AddMatch from "../components/addmatch";
import DeleteMatch from "../components/deletematch"
import Tournamentadmin from "../components/tournamentadmin"
import { useRouter } from "next/navigation";
import Tournament from "../../app/tournament/page"

 function Admin(){
    const router = useRouter();
    // Assuming "useClient" is a state or variable you want to watch for changes
  const useClient = true; // replace with your actual state or variable

  useEffect(() => {
    // This code will run whenever "useClient" changes
    // You can add the logic or actions you want to perform on change here
    console.log("useClient changed:", useClient);
  }, [useClient]); 
    return(
    <section className="mx-auto max-w-2xl px-1 py-10 sm:px-6  lg:max-w-7xl lg:px-8"> 
    <h1 className="text-2xl font-bold tracking-tight text-gray-900"> Admin </h1>
    <div><AddMatch/> </div>
    <div><DeleteMatch/> </div>
    <div><Tournamentadmin/> </div>
    <div> <Tournament/></div>
    </section>
     
    
    
    )
}
export default  Admin