import React from "react";
import Image from 'next/image'
//import getData from "@/components/getJson"
import getXml from "@/components/getXml"
import Carousel from "@/components/EmblaCarousel";
import './css/embla.css'

export default async function Home() {
  //const data = await getData()
  //console.log(data)
  const xml = await getXml()
  //console.log(xml)
  return (
    <main className="flex-none h-screen flex-col items-center justify-between">
      <div className="h-full mx-auto">
        <h1 className="text-center font-bold pt-6 h-12 text-4xl">New Arrivals</h1>
        <Carousel loop>
          {xml.map((src, i) => {
            return (
              <div className="w-auto h-full flex-[0_0_100%] mx-auto" key={i}>
                <div className="relative h-5/6">
                  <Image
                    src={src.olCoverURL}
                    fill={true}
                    className="mx-auto object-contain"
                    alt="alt"
                  />
                </div>
                <div className="relative caption mx-auto h-1/6">
                  <h1 className="text-center font-bold">{src.title}</h1>
                  <h1 className="text-center">{src.author}</h1>
                  <h1 className="text-center">Call Number: {src.callno}</h1>
                  <h1 className="text-center">Received: {src.recDate}</h1>
                </div>
              </div>
            );
          })}
        </Carousel>
        {/* <Carousel loop>
          {data.map((src, i) => {
            return (
              <div className="h-auto flex-[0_0_100%] mx-auto my-2" key={i}>
                <div className="flex flex-col items-center justify-between">
                  <Image
                    src={src.olCoverURL}
                    width={600}
                    height={800}
                    className="object-contain coverImg mx-auto"
                    alt="alt"
                  />
                </div>
                <h1 className="text-center">{src.title}</h1>
                <h1 className="text-center">{src.resource_metadata.author}</h1>
              </div>
            );
          })}
        </Carousel> */}
      </div>
    </main>
  )
}
