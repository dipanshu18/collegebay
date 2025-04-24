import { deleteRequest, upVoteRequest } from "@/api/mutations";
import type { IUserRequest } from "@/api/types";
import { queryClient } from "@/app/_layout";
import { COLOR } from "@/constants/COLOR";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { router } from "expo-router";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export function RequestCard({
  request,
  type,
}: {
  request: IUserRequest;
  type: "user" | "public";
}) {
  const upvoteMutation = useMutation({
    mutationKey: ["upvote", request.id],
    mutationFn: () => upVoteRequest(request.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });

  const deleteRequestMutation = useMutation({
    mutationKey: ["delete-request", request.id],
    mutationFn: () => deleteRequest(request.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });

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
      <View style={{ padding: 15, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "800" }}>
            {request?.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable
              style={[
                styles.button,
                { flexDirection: "row", alignItems: "center", gap: 5 },
              ]}
              onPress={() => upvoteMutation.mutate()}
            >
              <Text style={styles.buttonText}>{request._count.upVotes}</Text>
              <FontAwesome size={24} name="chevron-up" color={"white"} />
            </Pressable>
          </View>
        </View>
        <Text style={{ fontSize: 12, fontWeight: "500" }}>
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
              <Text style={{ fontWeight: "900" }}>{request?.user?.name}</Text>
              <Text style={{ fontWeight: "500" }}>
                {request?.user?.college}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "400" }}>
          Created{" "}
          {formatDistanceToNow(new Date(request?.createdAt), {
            addSuffix: true,
          })}{" "}
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
            onPress={() => {
              Alert.alert("Are you sure want to delete this request?", "", [
                {
                  text: "Cancel",
                  onPress: () => {},
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    deleteRequestMutation.mutate();
                  },
                },
              ]);
            }}
          >
            <Feather size={24} name="trash" color={"white"} />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
              Delete
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: COLOR.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
  },
});
