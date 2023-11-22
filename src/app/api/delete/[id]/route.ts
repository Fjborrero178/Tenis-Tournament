import {connectDB} from '@/libs/mongodb';   
import Match from '@/models/match';
import { NextRequest,NextResponse } from "next/server";

export  async function DELETE(request:NextRequest ,{ params }: { params: { id: string } } ){

    try{
    await connectDB();
        const  id  = params.id;
        
        const deleteMatch = await Match.findByIdAndDelete(id);
        
        // Return the response accordingly
        return NextResponse.json(deleteMatch);
    
    }catch(error){
        console.error("Error in DELETE API route:", error);
        return NextResponse.json(error)
    }
    

}