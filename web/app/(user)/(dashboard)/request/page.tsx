import CreateRequestForm from "./CreateRequestForm";

export default function Request() {
  return (
    <div className="my-5 text-center">
      <h1 className="text-3xl font-semibold">
        Create your request for a product 🙏
      </h1>

      <CreateRequestForm />
    </div>
  );
}
