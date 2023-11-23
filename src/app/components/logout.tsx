"use client"
import Link from "next/link";
import { MouseEvent } from 'react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignOutButton() { //Log out
  const router = useRouter();

  const handleSignOut = async (event:MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await signOut();
    router.refresh();
  };

  return (
    <Link href="/" 
    onClick={handleSignOut} 
    className="hidden lg:block  text-gray-400 hover:text-black text-zinc-50">
        Log Out
    </Link>
  );
}