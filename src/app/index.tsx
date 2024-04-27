import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

import { useAuth } from "@/providers/AuthProvider";

const Index = () => {
  const { seed, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 64 }} />;
  }

  if (!seed) {
    return <Redirect href="/auth" />;
  }
};

export default Index;
