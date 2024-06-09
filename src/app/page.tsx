"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { FormEvent, useRef } from "react";
import { FaUser } from "react-icons/fa";


export default function Home() {


  const hashInpRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //show user inputs
    router.push(`/hash/${hashInpRef?.current?.value}`)
  }




  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex justify-center ">
          <form className="space-y-8 w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <div className='flex justify-center items-center space-x-2'>
              <label htmlFor="hash" className='text-2xl text-black/70'><FaUser /></label>
              <input
                type="text"
                placeholder="inter message to hash"
                id="hash"
                ref={hashInpRef}
                required
                className='w-96 border border-petBlue rounded-lg px-2 outline-none h-10'
              />
            </div>
            <button type="submit" className='w-[26rem] bg-petBlue text-white rounded-lg py-3'>Submit</button>
          </form>
      </div>
    </div>
  );
}
