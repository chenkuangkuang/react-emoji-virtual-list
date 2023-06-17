import React from "react";
import emojiSource from "./emojis.json";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./App.css";

const Categories = [
  'smileys_people',
  'animals_nature',
  'food_drink',
  'travel_places',
  'activities',
  'objects',
  'symbols',
  'flags'
];

export type DataEmojiPure = {
  n: string[];
  u: string;
  v?: string[];
  a: string;
};

export interface DataEmoji extends DataEmojiPure {
  category: string;
  index: number;
};

export type DataEmojis = DataEmoji[];

export interface emojiSourceType {
  [key: string]: DataEmojiPure[];
}

let emojiList: DataEmojis = [], index = 1, allEmoji: emojiSourceType = emojiSource;

Object.keys(allEmoji).map((i, categoryIndex) => {
  var arr = allEmoji[i].map((j: DataEmojiPure) => ({ ...j, category: i, groupKey: categoryIndex, index: index++ }));
  emojiList = emojiList.concat(arr);
  return arr;
})

export type itemType = {
  groupKey: number;
  key: number;
  j: DataEmoji;
}

function getItems(nextGroupKey: number, count: number, category?: string) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  for (let i = 0; i < count; ++i) {
    nextItems.push({
      groupKey: nextGroupKey,
      key: nextKey + i,
      j: category ? emojiList.filter(x => x.category === category)[nextKey + i] : emojiList[nextKey + i]
    });
  }
  console.log('nextItems=0', nextItems);
  return nextItems;
}

const handleClick = (item: DataEmoji) => {
  if (!item.u) return;
  if ((/\-/g.test(item.u))) {
    const strArr = item.u.split("-").filter(i => i).map(i => "0x" + i);
    console.log('667=', String.fromCodePoint(...strArr.map(i => Number(i))));
  } else {
    console.log('66=', String.fromCodePoint(Number("0x" + item.u)));
  }
}

const Item = ({ j }: { j: DataEmoji }) => {
  return j ? <button className="item" onClick={() => handleClick(j)}>
    <img alt={j.u} src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${j.u}.png`} />
  </button> : null
};

const Index = () => {

  const [activeCategory, setActiveCategory] = React.useState(Categories[0]);

  const domRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const [items, setItems] = React.useState(() => getItems(0, 10));

  const scrollCategoryIntoView = (category: string) => {
    setItems(getItems(0, 80, category));
    setActiveCategory(category);
  }

  // console.log('items=', items);

  return <div>
    {Categories.map(i => {
      return <button
        className={"category-btn " + ("epr-icn-" + i) + " " + (i === activeCategory ? "active-category" : "")}
        key={i}
        onClick={() => {
          setActiveCategory(i);
          scrollCategoryIntoView(i);
        }}
      />
    })}
    <div className="emoji-container" id="emoji-container" ref={containerRef}>
      <MasonryInfiniteGrid
        className="container"
        id="container"
        scrollContainer={"#emoji-container"}
        gap={5}
        ref={domRef}
        isConstantSize={true}
        onRequestAppend={(e) => {
          const nextGroupKey = +(e.groupKey || 0) + 1;
          setItems([
            ...items,
            ...getItems(nextGroupKey, 80, activeCategory),
          ]);
        }}
      >
        {items.map((item) => <Item data-grid-groupkey={item.groupKey} key={item.key}  j={item.j} />)}
      </MasonryInfiniteGrid>;
    </div>
  </div>
}

export default Index;