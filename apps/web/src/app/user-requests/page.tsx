import { RequestsCard } from "@repo/ui/requestscard";

export default function UserRequests() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">
        Your Requested Items
      </h1>

      <div className="flex gap-10 flex-wrap items-center justify-center m-10">
        <RequestsCard type="self" />
        <RequestsCard type="self" />
        <RequestsCard type="self" />
        <RequestsCard type="self" />
      </div>
    </div>
  );
}
