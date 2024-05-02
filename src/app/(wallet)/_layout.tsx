import { Tabs, router } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const { seed, seedLoading } = useAuth();

  if (!seed && !seedLoading) {
    router.push("/auth/");
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
