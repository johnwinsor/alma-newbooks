import React from "react";
import Image from 'next/image'
import getData from "@/Components/Data"
import Carousel from "@/components/EmblaCarousel";
import './css/embla.css'

export default async function Home() {
  const data = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-screen mx-auto my-2">
        <Carousel loop>
          {data.map((src, i) => {
            return (
              <div className="h-auto flex-[0_0_100%] mx-auto my-2" key={i}>
                <Image
                  src={src.coverURL}
                  width={600}
                  height={800}
                  className="object-contain coverImg mx-auto"
                  alt="alt"
                />
                <span className="mx-auto">Caption title</span>
              </div>
            );
          })}
        </Carousel>
      </div>
    </main>
  )
}
