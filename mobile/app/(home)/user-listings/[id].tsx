import { getPost } from "@/api/queries";
import { COLOR } from "@/constants/COLOR";
import { getValue } from "@/utils/secure-store";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import {
  ActivityIndicator,
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

export default function UserListingDetails() {
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

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => await getPost(id as string),
  });

  if (isLoading) {
    return <ActivityIndicator color={COLOR.primary} />;
  }
  return (
    <ScrollView>
      <View style={{ flex: 1, marginVertical: 10 }}>
        <Carousel
          ref={ref}
          width={width}
          height={width / 1.5}
          data={post?.images as string[]}
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
          data={post?.images as string[]}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ gap: 10, marginVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>{post?.title}</Text>
          <Text style={{ fontSize: 15 }}>{post?.description}</Text>
          <Text style={{ fontSize: 20, fontWeight: 800 }}>
            Rs. {post?.price}
          </Text>
        </View>
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
