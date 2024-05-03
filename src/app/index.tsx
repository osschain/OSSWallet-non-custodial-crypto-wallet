import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

import { useAuth } from "@/providers/AuthProvider";

function Index() {
  const { loading, encryptedSeed, seed } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 64 }} />;
  }

  if (encryptedSeed && !seed) {
    return <Redirect href="/enter-password" />;
  }

  if (!encryptedSeed) {
    return <Redirect href="/auth/" />;
  }
}

export default Index;
