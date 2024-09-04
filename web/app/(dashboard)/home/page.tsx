import PostPage from "./PostPage";

export default function Home() {
  return (
    <div className="my-5">
      <div className="bg-slate-500 p-5 rounded-md">
        <h1 className="text-white">Do it later...</h1>
      </div>

      <PostPage />
    </div>
  );
}
