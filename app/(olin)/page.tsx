import React from "react";
import {Button} from '@nextui-org/button';

export default function Home() {
  return (
    <main>
      <div>
        <Button>Click me</Button>
      </div>
      <h1 className="text-5xl font-bold text-gray-900 leading-[1.4] mb-5">
        Demo project
      </h1>
      <p className="text-2xl text-gray-700">
        Nested layouts in Next.js
      </p>
    </main>
  );
}
