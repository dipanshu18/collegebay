import { getRequests } from "@/api/queries";
import { RequestCard } from "@/components/request-card";
import { COLOR } from "@/constants/COLOR";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function Requests() {
  const {
    data: requests,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator color={COLOR.primary} />;
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
      {requests && requests.length > 0 ? (
        requests.map((item) => {
          return <RequestCard key={item.id} type="public" request={item} />;
        })
      ) : (
        <Text>No requests made yet</Text>
      )}
    </ScrollView>
  );
}
