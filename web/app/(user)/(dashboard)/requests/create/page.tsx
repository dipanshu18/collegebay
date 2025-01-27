import { CreateRequestForm } from "@/components/create-request-form";

export default function CreateRequest() {
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold text-primary">Create request</h1>

      <div className="my-5 p-5 shadow rounded-md bg-gray-100 max-w-xl">
        <CreateRequestForm />
      </div>
    </div>
  );
}
