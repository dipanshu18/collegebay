import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ImageCarousel({ images }: { images: string[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-mt-1 object-cover h-[300px] lg:h-[700px]">
        {images &&
          images.map((image, index) => (
            <CarouselItem
              key={index}
              className="pt-1 flex justify-center items-center h-full w-full rounded-md"
            >
              <Image
                src={`https://dzgbuobd25m4d.cloudfront.net/${image}`}
                alt="Product image"
                height={1000}
                width={1000}
                quality={100}
                priority
                className="w-full h-full object-cover rounded-md"
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
