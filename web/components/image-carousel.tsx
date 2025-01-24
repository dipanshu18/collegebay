import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function ImageCarousel({ images }: { images: string[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full p-5"
    >
      <CarouselContent className="-mt-1 object-cover h-[300px] lg:h-[500px]">
        {images?.map((image, index) => (
          <CarouselItem
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="flex justify-center items-center h-full w-full rounded-md"
          >
            <Image
              src={image}
              alt="Product image"
              height={600}
              width={600}
              quality={100}
              priority
              className="w-full h-full object-contain rounded-md"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
