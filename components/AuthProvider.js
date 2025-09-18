"use client"

import {SessionProvider} from "next-auth/react"
 
const authProvider = ({children, session}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}   