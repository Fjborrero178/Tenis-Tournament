import {connectDB} from '@/libs/mongodb'    
import{NextResponse} from 'next/server'
import Tournament from '@/models/tournaments'
 


export  async  function POST(request: Request){ 
        try {                                                   
        // Connect to the MongoDB database
        await connectDB();
         // Extract data from the request body  
        const {local,emaillocal,visitante,emailvisitante,date,time,place} = await request.json();

        //console.log("Soy backend tournament" + local,emaillocal,visitante,emailvisitante,date,time,place);
        // Create a new Tournament instance with the extracted data
        const tournament= new Tournament({ 
        local,
        emaillocal,
        visitante,
        emailvisitante,
        date,
        time,
        place});

        // Save the new tournament to the database
        const savedtournament = await tournament.save();
        // Return a JSON response with the saved tournament data
        return NextResponse.json(savedtournament);

        }catch (error) {
        // Log and return an error response in case of an exception
        console.log("Error in POST API route:", error)
        return NextResponse.error();
        }
}

export  async  function GET() {

            try{ 
        
              await connectDB();
        
              // Retrieve all tournaments from the database
              const tournament = await Tournament.find().lean()
              //console.log(tournament)
              
              // Check if tournaments were found
              if(!tournament){
                return NextResponse.json({
                  message:"Tournament not found"
                },{
                  status:404
                })
              }
               // Return a JSON response with the retrieved tournament data
             return NextResponse.json(tournament);
        
            }catch(error){
              // Log and return an error response in case of an exception
              console.error("Error in GET API route:", error);
              return NextResponse.json({
                message: "Internal Server Error",
              })
            }             
        
}
          
        