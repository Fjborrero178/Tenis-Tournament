import {connectDB} from '@/libs/mongodb';   
import Match from '@/models/match';
import { NextRequest,NextResponse } from "next/server";

export  async function DELETE(request:NextRequest ,{ params }: { params: { id: string } } ){

    try{
    await connectDB();
    // Extract the match ID from the route parameters
        const  id  = params.id;
    
        // Find and delete the match from the database
        const deleteMatch = await Match.findByIdAndDelete(id);
        
        // Return the response accordingly
        return NextResponse.json(deleteMatch);
    
    }catch(error){
        console.error("Error in DELETE API route:", error);
        return NextResponse.json(error)
    }
    

}