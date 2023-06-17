import React from "react";
import "./App.css";
export type DataEmojiPure = {
    n: string[];
    u: string;
    v?: string[];
    a: string;
};
export interface DataEmoji extends DataEmojiPure {
    category: string;
    index: number;
}
export type DataEmojis = DataEmoji[];
export interface emojiSourceType {
    [key: string]: DataEmojiPure[];
}
export type itemType = {
    groupKey: number;
    key: number;
    j: DataEmoji;
};
declare const Index: ({ selectCallback }: {
    selectCallback: (emoji: any, item: any) => void;
}) => React.JSX.Element;
export default Index;
