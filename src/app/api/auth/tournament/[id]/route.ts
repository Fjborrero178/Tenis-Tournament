import {connectDB} from '@/libs/mongodb'    
import Tournament from '@/models/tournaments'
import{NextResponse} from 'next/server'
  
export async function PUT(request:Request,{ params }: { params: { id: string }}) {
     
    await connectDB();
    const id = params.id;
    const{local,visitante} = await request.json();
    
    
    try {
  
    const tournamentUpdate = {local,visitante}
       const  aaa =  await Tournament.findByIdAndUpdate(id,tournamentUpdate)
       console.log(aaa);
        if(!tournamentUpdate){
            return NextResponse.json( { message: `Document with ID: ${id} not found` }, { status: 404 });
        }
        return NextResponse.json({data:tournamentUpdate}, {status:200})
    
      } catch (error) {
        
        return NextResponse.json({ data: null }, { status: 500 });
        
      }
    
    

}    