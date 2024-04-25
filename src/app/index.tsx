import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

import { useAuth } from "@/providers/AuthProvider";

const Index = () => {
  const { masterKey, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 64 }} />;
  }

  if (!masterKey) {
    return <Redirect href="/auth" />;
  }
};

export default Index;
