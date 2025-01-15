import RequestsPage from "./RequestsPage";

export default async function OthersRequest() {
  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold my-5 text-center">
        Products that aren{`'`}t available on posted listings but users need 🥺
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-5">
        <RequestsPage />
      </div>
    </div>
  );
}
