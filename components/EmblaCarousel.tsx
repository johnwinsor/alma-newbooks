'use client';
// components/Carousel.tsx
// import the hook and options type
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import { PropsWithChildren } from "react";
import '../app/css/embla.css'
import '../app/css/sandbox.css'

const autoplayOptions = {
  delay: 4000,
}

// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  return (
    <div className="embla__viewport mx-auto" ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  );
};
export default Carousel;
