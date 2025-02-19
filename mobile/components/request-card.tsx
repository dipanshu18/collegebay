import type { IUserRequest } from "@/api/types";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

export function RequestCard({
  request,
  type,
}: {
  request: IUserRequest;
  type: "user" | "public";
}) {
  return (
    <View
      style={{
        width: "100%",
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "#e9ecef",
      }}
    >
      <Image
        source={{
          uri: request?.image,
        }}
        style={{
          aspectRatio: 16 / 9,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <View style={{ padding: 15, gap: 5 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>
            {request?.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>4</Text>
            <FontAwesome size={24} name="chevron-up" />
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "400" }}>
          {request?.description}
        </Text>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={{
                uri: request?.user?.image,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "900" }}>
                {request?.user?.name}
              </Text>
              <Text style={{ fontWeight: "500" }}>
                {request?.user?.college}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "300" }}>
          {request?.createdAt.toString()}
        </Text>

        {type === "user" && (
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              justifyContent: "center",
              marginVertical: 10,
              paddingVertical: 5,
              backgroundColor: "#c1121f",
              borderRadius: 10,
            }}
          >
            <Feather size={24} name="trash" color={"white"} />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "800" }}>
              Delete
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
