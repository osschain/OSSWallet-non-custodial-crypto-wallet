import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

import { useAuth } from "@/providers/AuthProvider";

function Index() {
  const { loading, encryptedMnemonic, mnemonic } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 64 }} />;
  }

  if (encryptedMnemonic && !mnemonic) {
    return <Redirect href="/enter-password" />;
  }

  if (!encryptedMnemonic) {
    return <Redirect href="/auth" />;
  }
}

export default Index;
