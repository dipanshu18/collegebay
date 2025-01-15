import YourPostDetailsPage from "./YourPostDetailsPage";

export default function YourPostDetails({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="my-5 p-5">
      <YourPostDetailsPage id={params.id} />
    </div>
  );
}
