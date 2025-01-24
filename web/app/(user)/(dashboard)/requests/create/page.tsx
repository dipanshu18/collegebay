import { CreateRequestForm } from "@/components/create-request-form";

export default function CreateRequest() {
  return (
    <>
      <h1 className="pl-4 text-xl font-bold">Create request</h1>

      <div className="p-4">
        <CreateRequestForm />
      </div>
    </>
  );
}
