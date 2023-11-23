import {connectDB} from '@/libs/mongodb'    
import Tournament from '@/models/tournaments'
import{NextResponse} from 'next/server'
  
export async function PUT(request:Request,{ params }: { params: { id: string }}) {
     
    await connectDB();
    const id = params.id;
    const{local,visitante} = await request.json();
    
    
    try {
     // Create an object with the updated tournament data
    const tournamentUpdate = {local,visitante}
    
       const  updatedTournament =  await Tournament.findByIdAndUpdate(id,tournamentUpdate)
       //console.log(" updatedTournament" + updatedTournament);
       // Check if the tournament was found and updated
        if(!updatedTournament){
            return NextResponse.json( { message: `Document with ID: ${id} not found` }, { status: 404 });
        }
        // Return a JSON response with the updated tournament data
        return NextResponse.json({data:updatedTournament}, {status:200})
    
      } catch (error) {
        // Log and return an error response in case of an exception
        return NextResponse.json({ data: null }, { status: 500 });
        
      }
    
    

}    