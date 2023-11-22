import bcrypt from 'bcryptjs'
import {connectDB} from '@/libs/mongodb'     
import{NextResponse} from 'next/server'
import User from '@/models/user'

export  async  function POST(request: Request){ // async function that  is called when the request   
                                                // is sent to the server and  the server is connected 
                                                // to the database server side. 
  try {                                                   

    await connectDB();

    const {name,lastName,email,password} = await request.json();
    
    console.log("Soy backend" + name, lastName, email, password);

    const userFound = await User.findOne({email})

     if (userFound){  //user found is  already in the database and is not  allowed  
      return NextResponse.json(
        {message: "Email already exists"},
        {status: 409}
      );
    } 
    const hashedPassword = await bcrypt.hash(password,12); //password encryption 

    const user = new User({name, 
        lastName,
        email,
        password:hashedPassword});
    
    const savedUser = await user.save() // username already  in the database 
    
    return NextResponse.json(savedUser);

  }catch (error) {
        console.log(error)
        return NextResponse.error();
    }
}