import { RequestCard } from "@/components/request-card";
import { ScrollView, Text, View } from "react-native";

export default function Requests() {
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
      {Array(5)
        .fill("")
        .map((_, idx) => {
          return (
            <RequestCard
              /* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */
              key={idx}
              type="public"
            />
          );
        })}
    </ScrollView>
  );
}
