// app/_layout.tsx

import { Stack } from "expo-router";
import Header from "../app/components/Header";

const LOGO = require("../assets/img/Home Dry Forest.png");

export default function RootLayout() {
  return (
    <Stack>

      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="home"
        options={{
          header: () => (
            <Header
              title="Home"
              username="User name"
              logo={LOGO}
            />
          ),
        }}
      />

       <Stack.Screen
        name="reboisement"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="patrouille"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="suivi-pepiniere"
        options={{ headerShown: false }}
      />

    </Stack>
  );
}