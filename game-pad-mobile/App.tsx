import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Socket, io } from "socket.io-client";
import RightButtons from "./components/right-buttons";
import { changeScreenOrientation } from "./lib/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { buttonClick, trigger } from "./lib/events";
import Pressable from "./components/pressable";
import Joystick from "./components/joystick";
import Dpad from "./components/dpad";
import { Play, Undo } from "lucide-react-native";

export default function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    changeScreenOrientation();
  }, []);

  useEffect(() => {
    const newSocket = io(`http://${process.env.EXPO_PUBLIC_SERVER_URL}`);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("chat message", (msg) => {
      console.log("Connected to server", msg);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex flex-row justify-around h-full">
        <StatusBar style="light" hidden />
        <View className="flex items-center justify-between h-full space-y-4">
          <View className="flex flex-row space-x-4">
            <Pressable
              classname="rounded-full bg-black p-4 px-14 mr-4"
              onPressIn={() => trigger(socket, "LEFT_TRIGGER", 1)}
              onPressOut={() => trigger(socket, "LEFT_TRIGGER", 0)}
            >
              <Text className="text-white font-bold">LT</Text>
            </Pressable>
            <Pressable
              classname="rounded-full bg-black p-4 px-14"
              onPressIn={() => buttonClick(socket, "LEFT_SHOULDER", true)}
              onPressOut={() => buttonClick(socket, "LEFT_SHOULDER", false)}
            >
              <Text className="text-white font-bold">LB</Text>
            </Pressable>
          </View>
          <View className="flex space-x-10 flex-row justify-between">
            <View className="flex items-center justify-center">
              <Dpad socket={socket} />
            </View>
            <View className="flex items-center space-y-4 justify-center">
              <Pressable
                classname="rounded-full bg-black p-2"
                onPressIn={() => buttonClick(socket, "START", true)}
                onPressOut={() => buttonClick(socket, "START", false)}
              >
                <Play className="text-white" size={20} strokeWidth={2} />
              </Pressable>
              <Pressable
                classname="rounded-full bg-black p-2"
                onPressIn={() => buttonClick(socket, "BACK", true)}
                onPressOut={() => buttonClick(socket, "BACK", false)}
              >
                <Undo className="text-white" size={20} strokeWidth={2} />
              </Pressable>
            </View>
          </View>
          <Joystick socket={socket} axis="ANALOG_LEFT" />
        </View>
        <View className="flex items-center justify-between space-y-4">
          <View className="flex flex-row space-x-4">
            <Pressable
              classname="rounded-full bg-black p-4 px-14 mr-4"
              onPressIn={() => buttonClick(socket, "RIGHT_SHOULDER", true)}
              onPressOut={() => buttonClick(socket, "RIGHT_SHOULDER", false)}
            >
              <Text className="text-white font-bold">RB</Text>
            </Pressable>
            <Pressable
              classname="rounded-full bg-black p-4 px-14"
              onPressIn={() => trigger(socket, "RIGHT_TRIGGER", 1)}
              onPressOut={() => trigger(socket, "RIGHT_TRIGGER", 0)}
            >
              <Text className="text-white font-bold">RT</Text>
            </Pressable>
          </View>
          <RightButtons socket={socket} />
          <Joystick socket={socket} axis="ANALOG_RIGHT" />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
