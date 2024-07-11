import { RequestsCard } from "@repo/ui/requestscard";

export default function UserRequests() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">
        Your Requested Items
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
        <RequestsCard type="self" />
        <RequestsCard type="self" />
        <RequestsCard type="self" />
        <RequestsCard type="self" />
      </div>
    </div>
  );
}
