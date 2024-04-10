import * as ScreenOrientation from "expo-screen-orientation";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
  );
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
