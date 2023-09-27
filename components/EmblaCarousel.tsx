'use client';
// components/Carousel.tsx
// import the hook and options type
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import { PropsWithChildren } from "react";
import '../app/css/embla.css'
import { use } from "react";

// const data = use(getData())

const autoplayOptions = {
  delay: 4000,
}

// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  return (
    <div className="mx-auto embla h-screen" ref={emblaRef}>
      <div className="flex h-full">{children}</div>
    </div>
  );
};
export default Carousel;
