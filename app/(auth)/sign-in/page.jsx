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


function SignIn() {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();
  const[loder,setLoder]=useState();

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, []);

  const onSignIn = () => {
    setLoder(true)

    GlobalApi.SignIn(email, password).then(resp => {
      console.log(resp.data.user);
      console.log(resp.data.jwt);
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);
      toast("Sign In Successfully !");
      // toast("Redirecting To Home Page !");
      router.push('/');
      setLoder(false)
    }, (e) => {
      toast(e?.response?.data?.error?.message);
      setLoder(false)
    });
  };

  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200'>
        <Image src='/logo.png' width={200} height={200} alt='create account'/>
        <h2 className='font-bold text-3xl'>Sign In To  Account</h2>
        <h2 className='text-gray-500 '>Enter Your Email And Password To Sign In</h2>

        <div className='w-full flex flex-col gap-5 m-7'>
        
        <Input placeholder='User Email'
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Input type='password' placeholder='Password' 
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button onClick={()=>onSignIn()}
            disabled={!(email && password)}
        >
          {loder?<LoaderIcon className='animate-spin'/>:'Sign In'}</Button>
        <p>Don't Have An Account  
            <Link href={'/create-account'} className='text-blue-500'> Click Here To Create New Account</Link>
        </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
