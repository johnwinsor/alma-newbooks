import React from "react";
import Image from 'next/image'
import Carousel from "@/components/EmblaCarousel";
import './css/embla.css'
import { promises as fs } from 'fs';

export default async function Home() {
  const response = await fetch(
    'https://library.mills.edu/data.json',
    {
      method: 'GET',
      headers: {
          'accept': 'application/json',
      },
    }
    
  )
  const data = await response.json()
  
  
  //const jsonString = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
 // const data = JSON.parse(jsonString);
  console.log(data)
  return (
    <main className="flex-none h-screen flex-col items-center justify-between">
      <div className="h-full mx-auto">
        <div className="text-center font-bold pt-4 h-12 text-2xl">New Arrivals</div>
        <Carousel loop>
          {data.map((src:any, i:any) => {
            const callnoStatus = src.callNo.replace(/Unknown/g, "In Processing");
            return (
              <div className="w-auto h-full flex-[0_0_100%] mx-auto" key={i}>
                <div className="relative h-5/6">
                  <Image
                    src={src.coverurl}
                    fill={true}
                    className="mx-auto object-contain"
                    alt="alt"
                  />
                </div>
                <div className="relative caption mx-auto h-1/6">
                  <h1 className="text-center font-bold">{src.title}</h1>
                  <h1 className="text-center">{src.author}</h1>
                  <h1 className="text-center">Call Number: {callnoStatus}</h1>
                  <h1 className="text-center">Received: {src.recDate}</h1>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </main>
  )
}
