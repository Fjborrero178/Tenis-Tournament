import {connectDB} from '@/libs/mongodb';   
import Match from '@/models/match';
import{NextResponse} from 'next/server';

export  async  function POST(request: Request){ // async function that  is called when the request   
                                                // to the database server side. 
    try {                                                   
    
    await connectDB();

    const {local,emaillocal,visitante,emailvisitante,date,time,place} = await request.json();
    
    console.log("Soy backend add" + local,emaillocal,visitante,emailvisitante,date,time,place);

    const match= new Match({ 
        local,
        emaillocal,
        visitante,
        emailvisitante,
        date,
        time,
        place});
    
        const savedMatch = await match.save();
    
        return NextResponse.json(savedMatch);

    }catch (error) {
        console.log("Error in POST API route:", error)
        return NextResponse.error();
    }
}