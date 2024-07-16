'use client'
//  this is client component means it will not render on server javascript ship this to browser then use it 
import React from 'react'
import Link from 'next/link'
import { useSession , signOut} from 'next-auth/react'
import {User} from 'next-auth'
// above user all the session data available --> check docs

// when ever you see use keyword ussai direct data nhi lia ja skta and that is hook method 


function Navbar() {

    // retrive data from session

    const {data:session} = useSession()
    //from data only bass session active hai ki nhi woo ptta chalta hai

    const user: User = session?.user

  return (
    <nav>
        <div>
           <a href="">Mystry Message</a>
           
        </div>
    </nav>
  )
}

export default Navbar