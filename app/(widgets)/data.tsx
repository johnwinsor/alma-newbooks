'use client'

import jsonFile from '@/app/data.json';
import Carousel from "@/components/EmblaCarousel";
import Image from 'next/image'

async function getData() {
  const res = await fetch('https://library.mills.edu/data.json', { next: { revalidate: 3600 } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export async function GetData() {
    // const data = jsonFile;
    const data = await getData()

    return (
        <main className="flex-none h-screen flex-col items-center justify-between bg-slate-900">
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