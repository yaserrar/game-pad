export type Button =
  | "A"
  | "B"
  | "X"
  | "Y"
  | "RIGHT_SHOULDER"
  | "LEFT_SHOULDER"
  | "START"
  | "BACK";

export type SocketData =
  | {
      inputType: "axis";
      axis: "ANALOG_LEFT" | "ANALOG_RIGHT";
      x: number;
      y: number;
    }
  | {
      inputType: "triggerAxis";
      axis: "LEFT_TRIGGER" | "RIGHT_TRIGGER";
      value: number;
    }
  | {
      inputType: "button";
      button: Button;
      v: boolean;
    }
  | {
      inputType: "dpad";
      x: number;
      y: number;
    };
