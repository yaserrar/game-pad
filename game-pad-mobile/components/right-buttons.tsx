import { Text, View } from "react-native";
import { Socket } from "socket.io-client";
import { buttonClick } from "../lib/events";
import Pressable from "./pressable";

type Props = {
  socket: Socket | null;
};

const RightButtons = ({ socket }: Props) => {
  return (
    <View className="flex items-center justify-center space-y-0">
      <Pressable
        classname="rounded-full bg-black p-5 px-7"
        onPressIn={() => buttonClick(socket, "Y", true)}
        onPressOut={() => buttonClick(socket, "Y", false)}
      >
        <Text className="text-white font-bold text-xl">Y</Text>
      </Pressable>
      <View className="flex flex-row">
        <Pressable
          onPressIn={() => buttonClick(socket, "X", true)}
          onPressOut={() => buttonClick(socket, "X", false)}
          classname="rounded-full bg-black p-5 px-7 mr-4"
        >
          <Text className="text-white font-bold text-xl">X</Text>
        </Pressable>
        <Pressable
          onPressIn={() => buttonClick(socket, "A", true)}
          onPressOut={() => buttonClick(socket, "A", false)}
          classname="rounded-full bg-black p-5 px-7"
        >
          <Text className="text-white font-bold text-xl">A</Text>
        </Pressable>
      </View>
      <Pressable
        classname="rounded-full bg-black p-5 px-7"
        onPressIn={() => buttonClick(socket, "B", true)}
        onPressOut={() => buttonClick(socket, "B", false)}
      >
        <Text className="text-white font-bold text-xl">B</Text>
      </Pressable>
    </View>
  );
};

export default RightButtons;
