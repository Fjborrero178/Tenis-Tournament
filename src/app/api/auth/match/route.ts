import {connectDB} from '@/libs/mongodb'    
import Match from '@/models/match'
import{NextResponse} from 'next/server'

 
export  async  function GET() {
  
    try{ 

      await connectDB();


      const match = await Match.find().lean()
      console.log(match)

      if(!match){
        return NextResponse.json({
          message:"Match not found"
        },{
          status:404
        })
      }
      
     return NextResponse.json(match);

    }catch(error){
      console.error("Error in GET API route:", error);
      return NextResponse.json({
        message: "Internal Server Error",
      })
    }
     

  }
 