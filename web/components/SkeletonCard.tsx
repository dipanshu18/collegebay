import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full border border-neutral-100 shadow rounded-md p-5">
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[200px]" />
        <div className="my-5">
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
