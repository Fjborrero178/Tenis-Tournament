import bcrypt from 'bcryptjs'
import {connectDB} from '@/libs/mongodb'     
import{NextResponse} from 'next/server'
import User from '@/models/user'

export  async  function POST(request: Request){ // async function that  is called when the request   
                                                // is sent to the server and  the server is connected 
                                                // to the database server side. 
  try {                                                   
    // Connect to the MongoDB database
    await connectDB();

    // Extract data from the request body
    const {name,lastName,email,password} = await request.json();
    
    //console.log("Soy backend" + name, lastName, email, password);

    const userFound = await User.findOne({email})

     if (userFound){   // User with the same email already exists
      return NextResponse.json(
        {message: "Email already exists"},
        {status: 409}
      );
    } 
    // encrypt the provided password
    const hashedPassword = await bcrypt.hash(password,12); //password encryption 

    // Create a new User instance with the extracted data and encrypted password
    const user = new User({name, 
        lastName,
        email,
        password:hashedPassword});
    
    const savedUser = await user.save() // Save the new user to the database
    return NextResponse.json(savedUser);

  }catch (error) {
      // Log and return an error response in case of an exception
        console.log(error)
        return NextResponse.error();
    }
}