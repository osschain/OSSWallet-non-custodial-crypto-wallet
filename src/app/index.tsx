import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

import { useAuth } from "@/providers/AuthProvider";

function Index() {
  const { seed, loading, password, encryptedSeed } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 64 }} />;
  }

  if (encryptedSeed && !password) {
    return <Redirect href="/auth/enter-password" />;
  }

  if (!seed) {
    return <Redirect href="/auth/" />;
  }

  if (seed) {
    return <Redirect href="/(wallet)/" />;
  }
}

export default Index;
