import { useSession } from 'next-auth/react'
import React from 'react'
import Layout from "src/AppBar"
export default function dashboard() {
  const {data: session} = useSession()
  console.log(session)
  return (
    <Layout>asd</Layout>
  )
}
