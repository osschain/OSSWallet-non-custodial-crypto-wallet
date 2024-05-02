import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { useAuth } from "@/providers/AuthProvider";

function Index() {
  const { seed, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 64 }} />;
  }

  if (!seed) {
    return <Redirect href="/auth/" />;
  }

  if (seed) {
    return <Redirect href="/(wallet)/" />;
  }
}

export default Index;
