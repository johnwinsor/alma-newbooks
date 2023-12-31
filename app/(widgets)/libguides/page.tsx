import React from "react";
import Image from 'next/image'
import Carousel from "@/components/EmblaCarousel";
import '../css/embla.css'

async function getData() {
  const res = await fetch(
    'https://library.mills.edu/data.json',
    { cache: 'no-store' },
  );
  const data = await res.json()

  return data
}

export default async function Home() {
  const data = await getData()
  return (
    <main className="flex-none h-screen flex-col items-center justify-between">
      <div className="h-full mx-auto">
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
