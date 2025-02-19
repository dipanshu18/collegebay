import { Link } from "expo-router";
import type { IPost } from "@/api/types";
import { Image, Text, View } from "react-native";
import { formatDistanceToNow } from "date-fns";

export function ListingCard({ post }: { post: IPost }) {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#e9ecef",
      }}
    >
      <Image
        source={{
          uri: post?.images[0],
        }}
        style={{
          aspectRatio: 16 / 9,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <View style={{ padding: 15, gap: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>{post?.title}</Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          {`${post?.description.slice(0, 150)}...`}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          Created{" "}
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}{" "}
        </Text>
      </View>
    </View>
  );
}
