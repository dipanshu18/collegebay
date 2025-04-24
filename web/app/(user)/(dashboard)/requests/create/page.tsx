import { CreateRequestForm } from "@/components/create-request-form";

export default function CreateRequest() {
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold text-primary">Create request</h1>

      <div className="my-5 p-10 shadow rounded-md mb-20 lg:mb-0 bg-gray-50 max-w-2xl">
        <CreateRequestForm />
      </div>
    </div>
  );
}
