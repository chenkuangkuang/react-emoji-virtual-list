var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from "react";
import emojiSource from "./emojis.json";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./App.css";
var Categories = [
    'smileys_people',
    'animals_nature',
    'food_drink',
    'travel_places',
    'activities',
    'objects',
    'symbols',
    'flags'
];
;
var emojiList = [], index = 1, allEmoji = emojiSource, handleCallback;
Object.keys(allEmoji).map(function (i, categoryIndex) {
    var arr = allEmoji[i].map(function (j) { return (__assign(__assign({}, j), { category: i, groupKey: categoryIndex, index: index++ })); });
    emojiList = emojiList.concat(arr);
    return arr;
});
function getItems(nextGroupKey, count, category) {
    var nextItems = [];
    var nextKey = nextGroupKey * count;
    for (var i = 0; i < count; ++i) {
        nextItems.push({
            groupKey: nextGroupKey,
            key: nextKey + i,
            j: category ? emojiList.filter(function (x) { return x.category === category; })[nextKey + i] : emojiList[nextKey + i]
        });
    }
    // console.log('nextItems=0', nextItems);
    return nextItems;
}
var handleClick = function (item) {
    if (!item.u)
        return;
    var targetEmoji;
    if ((/\-/g.test(item.u))) {
        var strArr = item.u.split("-").filter(function (i) { return i; }).map(function (i) { return "0x" + i; });
        targetEmoji = String.fromCodePoint.apply(String, strArr.map(function (i) { return Number(i); }));
        // console.log('667=', targetEmoji);
    }
    else {
        targetEmoji = String.fromCodePoint(Number("0x" + item.u));
        // console.log('66=', targetEmoji, item);
    }
    handleCallback(targetEmoji, item);
};
var Item = function (_a) {
    var j = _a.j;
    return j ? React.createElement("button", { className: "item", onClick: function () { return handleClick(j); } },
        React.createElement("img", { alt: j.u, src: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/".concat(j.u, ".png") })) : null;
};
var Index = function (_a) {
    var selectCallback = _a.selectCallback;
    var _b = React.useState(Categories[0]), activeCategory = _b[0], setActiveCategory = _b[1];
    var domRef = React.useRef(null);
    var containerRef = React.useRef(null);
    var _c = React.useState(function () { return getItems(0, 10); }), items = _c[0], setItems = _c[1];
    var scrollCategoryIntoView = function (category) {
        setItems(getItems(0, 80, category));
        setActiveCategory(category);
    };
    React.useEffect(function () {
        if (selectCallback) {
            handleCallback = selectCallback;
        }
    }, [selectCallback]);
    // console.log('items=', items);
    return React.createElement("div", null,
        Categories.map(function (i) {
            return React.createElement("button", { className: "category-btn " + ("epr-icn-" + i) + " " + (i === activeCategory ? "active-category" : ""), key: i, onClick: function () {
                    setActiveCategory(i);
                    scrollCategoryIntoView(i);
                } });
        }),
        React.createElement("div", { className: "emoji-container", id: "emoji-container", ref: containerRef },
            React.createElement(MasonryInfiniteGrid, { className: "container", id: "container", scrollContainer: "#emoji-container", gap: 5, ref: domRef, isConstantSize: true, onRequestAppend: function (e) {
                    var nextGroupKey = +(e.groupKey || 0) + 1;
                    setItems(__spreadArray(__spreadArray([], items, true), getItems(nextGroupKey, 80, activeCategory), true));
                } }, items.map(function (item) { return React.createElement(Item, { "data-grid-groupkey": item.groupKey, key: item.key, j: item.j }); }))));
};
export default Index;
