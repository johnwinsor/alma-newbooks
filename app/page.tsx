import React from "react";
import Image from 'next/image'
import getData from "@/Components/Data"

export default async function Home() {
  const data = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="my-24 w-full">
      </div>
      <div className="m-2 grid grid-cols-12 gap-2">
        {data.map(d => (
          <div 
            key={d.number}
            className="col-span-6 md:col-span-4 lg:col-span-3 aspect-video w-full bg-gray-100 relative"
            >
              <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-stone-950`}>
              {d.resource_metadata.title}
              </p>
            <Image 
              src={`https://covers.openlibrary.org/b/isbn/${d.resource_metadata.isbn}-M.jpg`}
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
              />
          </div>
        ))}
      </div>
    </main>
  )
}
