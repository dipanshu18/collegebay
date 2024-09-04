import PostDetailInfo from "./PostDetailInfo";

export default function PostDetails({ params }: { params: { id: string } }) {
  return <PostDetailInfo id={params.id} />;
}
