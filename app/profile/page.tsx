import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'


export default function ProfilePage () {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me")
    console.log(res.data);
    setData(res.data._id)
    
  }

  const loguot = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("logout success")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "nothing" ? "" : <Link href=
      {`/profile`}>{data}</Link>}</h2>
    </div>
  )
}
