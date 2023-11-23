"use client"
import { useEffect } from "react";
import AddMatch from "../components/addmatch";
import DeleteMatch from "../components/deletematch"
import Tournamentadmin from "../components/tournamentadmin"
import { useRouter } from "next/navigation";
import Tournament from "../../app/tournament/page"

 function Admin(){

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