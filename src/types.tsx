import { ReactNode } from "react";

export type Navigation = {
  getParam: (dest: string) => ReactNode;
  navigate: (scene: string, variable?: any) => void;
};
