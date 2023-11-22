import {connectDB} from '@/libs/mongodb'    
import Tournament from '@/models/tournaments'
import{NextResponse} from 'next/server'
  
 


  export  async  function POST(request: Request){ 
        try {                                                   

        await connectDB();

        const {local,emaillocal,visitante,emailvisitante,date,time,place} = await request.json();

        console.log("Soy backend tournament" + local,emaillocal,visitante,emailvisitante,date,time,place);

        const tournament= new Tournament({ 
        local,
        emaillocal,
        visitante,
        emailvisitante,
        date,
        time,
        place});

        const savedtournament = await tournament.save();

        return NextResponse.json(savedtournament);

        }catch (error) {
        console.log("Error in POST API route:", error)
        return NextResponse.error();
        }
        }

    export  async  function GET() {

            try{ 
        
              await connectDB();
        
        
              const tournament = await Tournament.find().lean()
              console.log(tournament)
        
              if(!tournament){
                return NextResponse.json({
                  message:"Tournament not found"
                },{
                  status:404
                })
              }
             return NextResponse.json(tournament);
        
            }catch(error){
              console.error("Error in GET API route:", error);
              return NextResponse.json({
                message: "Internal Server Error",
              })
            }
             
        
          }
          
        