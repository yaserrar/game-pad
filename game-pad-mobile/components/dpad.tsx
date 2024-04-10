import React, { useState } from "react";
import { View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Socket } from "socket.io-client";
import { dpad } from "../lib/events";

type Props = {
  socket: Socket | null;
};

const Dpad = ({ socket }: Props) => {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const radius = 50;

  const handleGestureEvent = (event: any) => {
    const { translationX, translationY, state } = event.nativeEvent;
    if (state === State.ACTIVE) {
      const x = translationX / 1;
      const y = translationY / 1;

      const distanceFromCenter = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

      let newX = x;
      let newY = y;

      if (distanceFromCenter > radius) {
        const angle = Math.atan2(y, x);
        newX = radius * Math.cos(angle);
        newY = radius * Math.sin(angle);
      }

      dpad(socket, newX / radius, -newY / radius);
      setJoystickPosition({ x: newX, y: newY });
    } else if (state === State.END || state === State.CANCELLED) {
      dpad(socket, 0, 0);
      setJoystickPosition({ x: 0, y: 0 });
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onCancelled={() => {
        setJoystickPosition({ x: 0, y: 0 });
        dpad(socket, 0, 0);
      }}
      onEnded={() => {
        setJoystickPosition({ x: 0, y: 0 });
        dpad(socket, 0, 0);
      }}
    >
      <View className="flex justify-center items-center h-32 w-32 bg-gray-100 rounded-full">
        <View
          className="bg-black rounded-3xl h-20 w-20"
          style={{
            transform: [
              { translateX: joystickPosition.x },
              { translateY: joystickPosition.y },
              { rotateZ: "45deg" },
            ],
          }}
        />
      </View>
    </PanGestureHandler>
  );
};

export default Dpad;
