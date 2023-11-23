import {connectDB} from '@/libs/mongodb'    
import Match from '@/models/match'
import{NextResponse} from 'next/server'

 
export  async  function GET() {
  
    try{ 
      // Connect to the MongoDB database
      await connectDB();

       // Retrieve all matches from the database
      const match = await Match.find().lean()
      //console.log(match)

       // Check if matches were found
      if(!match){
        return NextResponse.json({
          message:"Match not found"
        },{
          status:404
        })
      }
    // Return a JSON response with the retrieved match data
     return NextResponse.json(match);

    }catch(error){
       // Log and return an error response in case of an exception
      console.error("Error in GET API route:", error);
      return NextResponse.json({
        message: "Internal Server Error",
      })
    }
     

  }
 