'use client'
//  this is client component means it will not render on server javascript ship this to browser then use it 
import React from 'react'
import Link from 'next/link'
import { useSession , signOut} from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'
// above user all the session data available --> check docs

// when ever you see use keyword ussai direct data nhi lia ja skta and that is hook method 


function Navbar() {

    // retrive data from session

    const {data:session} = useSession()
    //from data only bass session active hai ki nhi woo ptta chalta hai

    const user: User = session?.user as User

  return (
    <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
           <a className='text-xl font-bold mb-4 md:mb-0' href="">Mystry Message</a>
           {/* check session now  */}

           {
            session ? (
              <>
              <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
              <Button  className='w-full md:w-auto' onClick={()=> signOut()}>Logout</Button>
              </>
            ) : (
              <Link  href='/sign-in'>
                    <Button className='w-full md:w-auto'>Login</Button>
              </Link>
            )
           }
        </div>
    </nav>
  )
}

export default Navbar