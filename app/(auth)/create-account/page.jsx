"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react';




function CreateAccount() {

    const [fullName,setFullName]=useState();
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const router = useRouter();
    const[loder,setLoder]=useState();

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
          router.push('/');
        }
      }, []);

    const onCreateAccount = () => {
      setLoder(true)

        GlobalApi.registerUser(fullName,username, email, password).then(resp => {
            console.log(resp.data.user)
            console.log(resp.data.jwt)
            sessionStorage.setItem('user', JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt', resp.data.jwt);            
            toast("Account Created Successfully ! - Redirecting To Home Page !");
            // toast("Redirecting To Home Page !");
            router.push('/');
            setLoder(false)
        }, (e) => {
          toast(e?.response?.data?.error?.message);
          setLoder(false)
        })
    }
  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200'>
        <img src='/logo.png' width={200} height={200} alt='create account'/>
        <h2 className='font-bold text-3xl'>Create Account</h2>
        <h2 className='text-gray-500 '>Enter Your Email And Password To Create an Account</h2>

        <div className='w-full flex flex-col gap-5 m-7'>
        <Input placeholder='Enter Your Full Name' 
        onChange={(e)=>setFullName(e.target.value)}
        />
        <Input placeholder='User Name' 
        onChange={(e)=>setUsername(e.target.value)}
        />
        <Input placeholder='User Email'
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Input type='password' placeholder='Password' 
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button onClick={()=>onCreateAccount()}
            disabled={!(username && email && password)}
        >{loder?<LoaderIcon className='animate-spin'/>:'Create Account'}</Button>
        <p>Already Have An Account  
            <Link href={'/sign-in'} className='text-blue-500'> Click Here To Sign In</Link>
        </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
