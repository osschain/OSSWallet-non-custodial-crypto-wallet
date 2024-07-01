import React, { PropsWithChildren } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button, Text, View } from "react-native";

import HeaderTextUi from "@/components/ui/HeaderTextUi";

// Error logging function that matches the expected type
const logError = async (error: Error, info: React.ErrorInfo) => {
  try {
    console.log(error, "BOUNDARY");
    // await fetch("https://your-logging-api.com/log", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     error: error.message,
    //     stack: error.stack,
    //     componentStack: info.componentStack ?? "", // Handle potential undefined or null
    //     timestamp: new Date().toISOString(),
    //   }),
    // });
  } catch (error) {
    console.log(error);
  }
};

// Fallback component for rendering errors
function FallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <View
      style={{ padding: 20, justifyContent: "center", alignItems: "center" }}
    >
      <HeaderTextUi>Something went wrong!</HeaderTextUi>
      <Text>{error.message}</Text>
      <Button title="Try Again" onPress={resetErrorBoundary} />
    </View>
  );
}

// ErrorBoundaryProvider component with type-safe error boundary
export function ErrorBoundaryProvider({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      fallbackRender={FallbackRender}
      onError={logError}
      onReset={() => {
        // Optional: Implement any global state reset logic here
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
