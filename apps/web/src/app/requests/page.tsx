import { RequestsCard } from "@repo/ui/requestscard";

export default function RequestedItems() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">
        Request by others
      </h1>

      <div className="flex gap-10 flex-wrap items-center justify-center m-10">
        <RequestsCard type="other" />
        <RequestsCard type="other" />
        <RequestsCard type="other" />
        <RequestsCard type="other" />
      </div>
    </div>
  );
}
