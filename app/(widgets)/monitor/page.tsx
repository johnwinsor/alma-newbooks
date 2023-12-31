// https://github.com/vercel/app-playground/blob/main/app/ssr/%5Bid%5D/page.tsx
import React from 'react';
import '../css/embla.css';
// import { GetData } from '@/app/(widgets)/data';
// this import moved into this file
import Carousel from '@/components/EmblaCarousel';
import Image from 'next/image'

function shuffle(a: any) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j]; 
    a[j] = x;
      }
      return a;
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(
    'https://library.mills.edu/data.json',
    { cache: 'no-store' },
  );
  const data = await res.json()
  const shuffled = shuffle(data)

  return (
    <main className="flex-none h-screen flex-col items-center justify-between bg-slate-900">
        <div className="h-full mx-auto">
        <div className="text-center font-bold pt-4 h-12 text-2xl text-slate-50">New Arrivals</div>
        <Carousel loop>
          {shuffled.map((src:any, i:any) => {
            let callnoStatus = src.callNo.replace(/Unknown/g, "In Processing");
            if (src.location == "On order") {
              callnoStatus = "In Processing";
            }
            if (src.location != "On order") {
              callnoStatus = src.location + ": " + callnoStatus
            }
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
                  <h1 className="text-center">{callnoStatus}</h1>
                  <h1 className="text-center">Received: {src.recDate}</h1>
                </div>
              </div>
            );
          })}
        </Carousel>
        </div>
        </main>
  );
}