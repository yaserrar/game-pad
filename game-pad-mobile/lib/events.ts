import { Socket } from "socket.io-client";

export const buttonClick = (
  socket: Socket | null,
  button: Button,
  value: boolean
) => {
  const data: SocketData = {
    inputType: "button",
    button: button,
    v: value,
  };

  if (socket) {
    sendMessage(socket, "button", data);
  }
};

export const joystick = (
  socket: Socket | null,
  axis: "ANALOG_LEFT" | "ANALOG_RIGHT",
  x: number,
  y: number
) => {
  const data: SocketData = {
    inputType: "axis",
    axis: axis,
    x,
    y,
  };

  if (socket) {
    sendMessage(socket, "axis", data);
  }
};

export const trigger = (
  socket: Socket | null,
  axis: "LEFT_TRIGGER" | "RIGHT_TRIGGER",
  value: number
) => {
  const data: SocketData = {
    inputType: "triggerAxis",
    axis: axis,
    value: value,
  };

  if (socket) {
    sendMessage(socket, "triggerAxis", data);
  }
};

export const dpad = (socket: Socket | null, x: number, y: number) => {
  const data: SocketData = {
    inputType: "dpad",
    x,
    y,
  };

  if (socket) {
    sendMessage(socket, "dpad", data);
  }
};

const sendMessage = (
  socket: Socket,
  event: "button" | "axis" | "triggerAxis" | "dpad",
  data: SocketData
) => {
  socket.emit(event, data);
};
