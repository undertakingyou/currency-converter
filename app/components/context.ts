
import { createContext } from "react";

export type ConvertContextType = {
    dataRefetch: () => void;
}
export const ConvertContext = createContext<ConvertContextType | null>(null);
