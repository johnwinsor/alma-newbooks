import React from "react";
import Image from 'next/image'
import getData from "@/Components/Data"
import Carousel from "@/components/EmblaCarousel";

export default async function Home() {
  const data = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* {data.map(d => (
          <div 
            key={d.number}
            >
            <Image 
              src={d.coverURL}
              alt="Book Cover"
              width={100}
              height={24}
              priority
              />
          </div>
        ))} */}



      <div className="lg:w-3/4 mx-auto my-2">
        <Carousel loop>
          {data.map((src, i) => {
            return (
              // 👇 style each individual slide.
              // relative - needed since we use the fill prop from next/image component
              // h-64 - arbitrary height
              // flex[0_0_100%]
              //   - shorthand for flex-grow:0; flex-shrink:0; flex-basis:100%
              //   - we want this slide to not be able to grow or shrink and take up 100% width of the viewport.
              <div className="relative h-96 flex-[0_0_100%]" key={i}>
                {/* use object-cover + fill since we don't know the height and width of the parent */}
                <Image src={src.coverURL} fill className="object-contain" alt="alt" />
              </div>
            );
          })}
        </Carousel>
      </div>


    </main>
  )
}
