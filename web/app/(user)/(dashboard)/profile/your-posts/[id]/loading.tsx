import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="my-20 p-5 min-w-full flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-10">
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[100px]" />
        <div className="my-5">
          <Skeleton className="h-8 w-full mt-10" />
        </div>
      </div>
    </div>
  );
}
