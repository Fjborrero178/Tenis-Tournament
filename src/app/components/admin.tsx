import { getServerSession} from "next-auth";
import Link from "next/link";

 async function Admin() {

  
  const session =await getServerSession();
 
  
  if(session?.user?.email === process.env.ADMINUSER){
    console.log("soy admin session")
    
    return(<Link href="/admin"  
    className="text-gray-400 hover:text-black  text-zinc-50"> 
    Admin</Link>);
  }
 
}

export default Admin;