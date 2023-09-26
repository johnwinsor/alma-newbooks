import React from "react";
import Image from 'next/image'
import getData from "@/components/getJson"
import getXml from "@/components/getXml"
import Carousel from "@/components/EmblaCarousel";
import './css/embla.css'

export default async function Home() {
  //const data = await getData()
  //console.log(data)
  const xml = await getXml()
  //console.log(xml)
  return (
    <main className="flex-none min-h-screen flex-col items-center justify-between">
      <div className="h-screen mx-auto my-2">
        <Carousel loop>
          {xml.map((src, i) => {
            return (
              <div className="h-screen w-auto flex-[0_0_100%] mx-auto my-2" key={i}>
                <div className="relative">
                  <Image
                    src={src.olCoverURL}
                    width={600}
                    height={600}
                    className="object-contain coverImg mx-auto"
                    alt="alt"
                  />
                </div>
                <div className="relative caption mx-auto">
                  <h1 className="text-center font-bold">{src.title}</h1>
                  <h1 className="text-center">by {src.author}</h1>
                  <h1 className="text-center">Call Number: {src.callno}</h1>
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
