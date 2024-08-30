import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";

export default function PostDetails() {
  return (
    <div className="my-5 p-5 pb-44">
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full my-5">
          <ImageCarousel />
        </div>
        <div className="col-span-2 space-y-3 w-full my-10">
          <h1 className="text-2xl font-bold">Product Title</h1>
          <p className="text-sm text-slate-700 dark:text-slate-200 text-wrap">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            aliquam ipsa inventore itaque nihil nam a eligendi, iste, explicabo
            ex officia veniam aliquid illo pariatur culpa ut molestiae
            repellendus vel harum vero quisquam. Pariatur dolore eveniet
            quisquam repudiandae, corrupti cumque ipsa iste. Quae quos repellat
            corporis omnis fugit, quia quas.
          </p>
          <p className="font-extrabold text-xl">$300</p>

          <div className="md:max-w-sm my-10 md:my-16">
            <Button className="w-full">Message seller</Button>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
