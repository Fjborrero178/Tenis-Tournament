import Admin from "../components/admin";   
import {getServerSession} from "next-auth"; 
import Link from "next/link";
import SignOutButton from "./logout"
import Image from 'next/image';
export  async function Navbar (){
    
    const session = await getServerSession();
    console.log(session)

   
    return ( 
            <main >
              <nav className="flex justify-between px-8 items-center py-6 bg-lime-600">
                <div className="flex items-center gap-8">
                  <section className="flex items-center gap-4">
                    <Link href="/" className="text-4xl font-mono">
                    <Image  
                src="/logo.jpeg" 
                className=" object-fill  lg:h-full lg:w-full"
                width={50}
                height={100}
                alt="Picture of the author"
              />
                    </Link>
                  </section>
    
                        <Link href="/schedule"  className="  text-zinc-50 hover:text-black" >Schedule</Link>
                        <Link href="/tournament"  className="  text-zinc-50 hover:text-black" >Tournaments</Link>
                        <Link href="/players"  className=" text-zinc-50 hover:text-black" >Players</Link>
                    

                </div>
        
                
        
                <section className="flex items-center gap-4">
                {session? ( 

                        <>
                        <Admin/> 

                        <SignOutButton/> 
                        </>

                        ) : (

                        <Link href="/login"> Sign In </Link>

                        )}


            </section>
              </nav>
              
            </main>
          );
        
}