import { getPost } from "@/api/queries";
import { COLOR } from "@/constants/COLOR";
import { getValue } from "@/utils/secure-store";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PostDetails() {
  const userId = getValue("uid");
  const { id } = useLocalSearchParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => await getPost(id as string),
  });

  if (isLoading) {
    return <ActivityIndicator color={COLOR.primary} />;
  }
  return (
    <ScrollView style={{ padding: 20 }}>
      <View>
        <Image
          source={{
            uri: post?.images[0],
          }}
          style={{ aspectRatio: 16 / 9, borderRadius: 10 }}
        />
      </View>
      <View style={{ gap: 10, marginVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>{post?.title}</Text>
        <Text style={{ fontSize: 15 }}>{post?.description}</Text>
        <Text style={{ fontSize: 20, fontWeight: 800 }}>Rs. {post?.price}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginVertical: 10,
        }}
      >
        <Image
          source={{
            uri: post?.user.image,
          }}
          width={50}
          height={50}
          style={{ borderRadius: 100 }}
        />

        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {post?.user.name}
          </Text>
          <Text
            style={{
              fontWeight: 400,
            }}
          >
            {post?.user.college}
          </Text>
        </View>
      </View>

      {post?.user.id !== userId && (
        <View>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Message</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLOR.primary,
    paddingVertical: 20,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
