import { startChat } from "@/api/mutations";
import { getPost } from "@/api/queries";
import { COLOR } from "@/constants/COLOR";
import { getValue } from "@/utils/secure-store";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  type ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function PostDetails() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const userId = getValue("uid");
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => await getPost(id as string),
  });

  if (isLoading) {
    return <ActivityIndicator color={COLOR.primary} />;
  }

  console.log(data);

  async function handleMessageSeller() {
    setLoading(true);

    try {
      const response = await startChat(data?.post?.seller.id as string);

      if (response?.error) {
        return Alert.alert(response.error);
      }

      if (response?.success === "REDIRECT") {
        return router.push(`/messages/${response.chatId}`);
      }
      return router.push(`/messages/${response?.success}`);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, marginVertical: 10 }}>
        <Carousel
          ref={ref}
          width={width}
          height={width / 1.5}
          data={data?.post?.images as string[]}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: item,
                }}
                style={{
                  marginHorizontal: "auto",
                  height: 350,
                  width,
                  padding: 10,
                  objectFit: "contain",
                }}
              />
            </View>
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={data?.post?.images as string[]}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ gap: 10, marginVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>
            {data?.post?.title}
          </Text>
          <Text style={{ fontSize: 15 }}>{data?.post?.description}</Text>
          <Text style={{ fontSize: 20, fontWeight: 800 }}>
            Rs. {data?.post?.price}
          </Text>
        </View>

        <View
          style={{
            gap: 5,
            marginVertical: 10,
            marginHorizontal: "auto",
          }}
        >
          <Image
            source={{
              uri: data?.post?.seller.image,
            }}
            width={150}
            height={150}
            style={{ borderRadius: 100, marginHorizontal: "auto" }}
          />

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              {data?.post?.seller.name}
            </Text>
            <Text
              style={{
                fontWeight: 400,
              }}
            >
              {data?.post?.seller.college}
            </Text>

            <Text>Avg rating: {data?.sellerStats.averageRating} / 5</Text>
            <Text>
              Total resource sold: {data?.sellerStats.totalSoldWithRating}
            </Text>
          </View>
        </View>

        {data?.post?.seller.id !== userId && data?.post?.isAvailable && (
          <View>
            <Pressable
              style={styles.btn}
              onPress={handleMessageSeller}
              disabled={loading}
            >
              <Text style={styles.btnText}>
                {loading ? "Initializing chat..." : "Message"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
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
