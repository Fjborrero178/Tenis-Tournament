import {connectDB} from '@/libs/mongodb';   
import Match from '@/models/match';
import{NextResponse} from 'next/server';

export  async  function POST(request: Request){ // async function that  is called when the request   
                                                // to the database server side. 
    try {                                                   
    // Database connection
    await connectDB();
     // Extract data from the request body
    const {local,emaillocal,visitante,emailvisitante,date,time,place} = await request.json();

    // Log the received data
    //console.log("Soy backend add" + local,emaillocal,visitante,emailvisitante,date,time,place);

    // Create a new Match instance with the extracted data
    const match= new Match({ 
        local,
        emaillocal,
        visitante,
        emailvisitante,
        date,
        time,
        place});
    
        // Save the new match to the database
        const savedMatch = await match.save();
        
        // Return a JSON response with the saved match data
        return NextResponse.json(savedMatch);

    }catch (error) {
        console.log("Error in POST API route:", error)
        return NextResponse.error();
    }
}