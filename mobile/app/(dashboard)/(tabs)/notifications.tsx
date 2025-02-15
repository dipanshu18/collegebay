import { NotificationCard } from "@/components/notification-card";
import { ScrollView } from "react-native";

export default function Notifications() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {Array(10)
        .fill("")
        .map((_, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <NotificationCard key={idx} />
        ))}
    </ScrollView>
  );
}
