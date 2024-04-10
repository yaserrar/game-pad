import * as Haptics from "expo-haptics";
import { ReactNode, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "../lib/utils";

type Props = {
  classname?: string;
  children: ReactNode;
  onPressIn: () => void;
  onPressOut: () => void;
};

const SHORT_VIBRATION = 30; // Adjust for desired subtlety (milliseconds)

export default function Pressable({
  classname,
  children,
  onPressIn,
  onPressOut,
}: Props) {
  const [isPressed, setPressed] = useState(false);
  const tapGesture = Gesture.LongPress()
    .onBegin(() => {
      Haptics.selectionAsync();
      setPressed(true);
      onPressIn();
    })
    .onEnd(() => {
      setPressed(false);
      onPressOut();
    })
    .minDuration(0.0001)
    .maxDistance(1000);

  return (
    <GestureDetector gesture={tapGesture}>
      <View
        className={cn(
          "rounded-full bg-black p-4 px-6",
          classname,
          isPressed && "opacity-50"
        )}
      >
        {children}
      </View>
    </GestureDetector>
  );
}
