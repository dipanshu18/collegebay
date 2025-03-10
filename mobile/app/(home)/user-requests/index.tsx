import { getProfile } from "@/api/queries";
import { RequestCard } from "@/components/request-card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function UserRequests() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["requests"],
    queryFn: getProfile,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 10,
        flex: 1,
        gap: 10,
        marginBottom: 10,
      }}
    >
      {data?.requests && data.requests.length > 0 ? (
        data.requests.map((item) => {
          return <RequestCard key={item.id} type="user" request={item} />;
        })
      ) : (
        <Text style={{ fontSize: 15, fontWeight: 500, textAlign: "center" }}>
          No requests made yet
        </Text>
      )}
    </ScrollView>
  );
}
