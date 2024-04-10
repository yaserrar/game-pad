import express from "express";
import http from "http";
import ViGEmClient from "vigemclient";
import { Server } from "socket.io";
import { Button, SocketData } from "./types";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  let client = new ViGEmClient();
  client.connect();
  let controller = client.createX360Controller();
  controller.connect();
  controller.updateMode = "auto";

  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("button", (data: SocketData) => {
    if (data.inputType === "button") {
      switch (data.button) {
        case "A":
          controller.button.A.setValue(data.v);
          break;
        case "B":
          controller.button.B.setValue(data.v);
          break;
        case "X":
          controller.button.X.setValue(data.v);
          break;
        case "Y":
          controller.button.Y.setValue(data.v);
          break;
        case "BACK":
          controller.button.BACK.setValue(data.v);
          break;
        case "START":
          controller.button.START.setValue(data.v);
          break;
        case "LEFT_SHOULDER":
          controller.button.LEFT_SHOULDER.setValue(data.v);
          break;
        case "RIGHT_SHOULDER":
          controller.button.RIGHT_SHOULDER.setValue(data.v);
          break;
        default:
          break;
      }
    }

    controller.update();
    return;
  });

  socket.on("axis", (data: SocketData) => {
    console.log(data);
    if (data.inputType === "axis") {
      if (data.axis === "ANALOG_LEFT") {
        controller.axis.leftX.setValue(data.x);
        controller.axis.leftY.setValue(data.y);
      } else if (data.axis === "ANALOG_RIGHT") {
        controller.axis.rightX.setValue(data.x);
        controller.axis.rightY.setValue(data.y);
      }
    }
    controller.update();
    return;
  });

  socket.on("triggerAxis", (data: SocketData) => {
    if (data.inputType === "triggerAxis") {
      switch (data.axis) {
        case "LEFT_TRIGGER":
          controller.axis.leftTrigger.setValue(data.value);
          break;
        case "RIGHT_TRIGGER":
          controller.axis.rightTrigger.setValue(data.value);
          break;
        default:
          break;
      }
    }

    controller.update();
    return;
  });

  socket.on("dpad", (data: SocketData) => {
    if (data.inputType === "dpad") {
      controller.axis.dpadHorz.setValue(data.x);
      controller.axis.dpadVert.setValue(data.y);
    }
    controller.update();
    return;
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
