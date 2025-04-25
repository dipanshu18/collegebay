import { Link } from "expo-router";
import type { IPost } from "@/api/types";
import { Image, Text, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { COLOR } from "@/constants/COLOR";

export function ListingCard({ post }: { post: IPost }) {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#e9ecef",
      }}
    >
      {!post.isAvailable && (
        <View
          style={{
            position: "absolute",
            right: 0,
            zIndex: 10,
            backgroundColor: COLOR.info,
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "white" }}>
            Sold
          </Text>
        </View>
      )}
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
        <Text style={{ fontSize: 15, fontWeight: "400" }}>
          {post.description.length > 50
            ? `${post?.description.slice(0, 100)}...`
            : post.description}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "400" }}>
          Created{" "}
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}{" "}
        </Text>
      </View>
    </View>
  );
}
