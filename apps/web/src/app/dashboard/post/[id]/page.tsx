import ImageCarousel from "@repo/ui/imagecarousel";
import { SecondaryBtn } from "@repo/ui/secondaryBtn";

export default function PostDetails() {
  return (
    <div className="py-12 max-w-5xl mx-auto">
      <div className="">
        <ImageCarousel />
      </div>
      <div>
        <h1 className="font-bold text-3xl my-5">Item Name</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum rerum
          atque repellat dicta harum quod, hic maiores distinctio ex, ratione
          fugiat, sit magnam voluptatum quo.
        </p>
        <h2 className="my-5 font-semibold text-xl">Price: $29.99</h2>
        <h3 className="my-5 font-semibold text-lg">Seller: "Seller name"</h3>
        <SecondaryBtn text="Message" />
      </div>
    </div>
  );
}
