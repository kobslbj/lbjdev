---
title: '為什麼我們需要前端框架?'
pubDate: 2024-11-20
description: '在開始使用前端框架之前,我們要先了解為什麼我們需要用框架'
tags: ["Frontend"]
---
為什麼我們需要前端框架？這個問題是我第一次接觸框架（Next.js）自己問過我自己的問題，我覺得蠻重要的，避免自己在一味的開發，不知道框架幫我們做了什麼事情，在這邊我會分享我自己的想法，也歡迎大家可以跟我討論~
<br><br>
我那時候先從一個很簡單的問題開始問我自己。
<br><br>
## 「 回歸本質，解釋一下什麼是HTML? 」

HTML（HyperText Markup Language）是構建網頁的基礎。透過tag還有一些attribute定義了網頁內容的結構和含義。

<br><br>
這個問題問完之後再問自己另外一個問題。
<br><br>

## 「 Browser是怎麼把我寫的HTML給呈現出來的？ 」

這時候我們就要去了解browser是怎麼把HTML轉換成我們看到的畫面，不過Browser Rendering Work不是這篇文章想要探討的內容，這邊就大概提到，Browser是如何辨別我們開發的HTML，並且把它轉換成我們看到的畫面。

在我們Browser的main thread，會有一個HTML parser，這個HTML parser會把我們的HTML轉換成DOM tree，而這個DOM tree就是我們瀏覽器呈現的畫面！
<br><br>
以下是詳細的流程
```plaintext
HTML -> Tokenize -> Node -> DOM tree -> Render tree -> Layout -> Paint
```
(這裡不包括CSSOM的部分)
<br><br>
這邊想要強調一個點是，我們手動操作DOM tree是很耗費效能的，因為每次操作DOM tree都會觸發Browser的Reflow和Repaint，這樣會讓我們的網頁變得很慢，所以我們要盡量避免直接操作DOM tree。
<br><br>
## 「 那我們要怎麼避免直接操作DOM tree? 」

這時候就要提到前端框架了，框架會幫我們處理好DOM tree的部分，我們只需要專注在我們的UI跟邏輯上，透過框架避免直接操作DOM tree，這樣就可以提升我們網頁的效能。

好，我們理解到框架可以幫我們處理DOM tree，接下來我們要來好好認識框架究竟是什麼？

<br><br>
## 「 什麼是前端框架？ 」
目前最常見的框架就是Next.js、React、Vue、Angular，簡單來說，框架就是會幫開發者寫好一些東西，讓開發者可以專注在實作上，而不用去操心一些基本的東西，例如：DOM tree的操作，這樣就可以提升開發者的效率。隨著現今平台服務的需求，越來越龐大，程式邏輯也越來越複雜，所以前端框架的使用就越來越重要。
<br><br>
前端框架最主要的feature我認為有以下幾點：
以下的框架都舉React為例
<br><br>

<h2>Modular Architecture</h2>

    假設我們的購物網站有以下需求： 

            1. 顯示商品列表。

            2. 點擊「加入購物車」按鈕後，商品會加入購物車列表。

            3. 購物車數量會即時更新。

<br>

如果使用 Vanilla JS，開發者需要手動操作 DOM 來更新頁面。例如，監聽點擊事件後更新商品數據，再根據最新數據同步更新畫面。然而，隨著功能的增加，程式碼會變得冗長且難以維護，特別是當需求變更時，牽一髮而動全身的情況更是常見。

<br>

相對而言，使用 React 能顯著改善這些問題。我們可以將應用分成多個 Component（例如 ProductList 和 Cart），每個 Component 專注於自己的功能，清晰定義各自的職責。這樣，當某一部分（如購物車數量）需要更新時，只需更新對應的 Component，不會影響其他部分的呈現。此外，React 的Virtual DOM 確保了更新的效率，僅重新渲染必要的部分，避免了不必要的 DOM 操作。


<br><br>
<h2>State Management</h2>

State management 我舉大家一定有寫過的Counter為例，如果我們用vanilla js，我們需要把目前狀態用變數保存，然後自己手動更新 DOM，利用addEventListener監聽事件，和getElementById取得DOM元素
<br><br>
```javascript
// js
let count = 0;

function render() {
  const display = document.getElementById('count-display');
  display.textContent = `Count: ${count}`;
}

document.getElementById('increment').addEventListener('click', () => {
  count++; 
  render(); 
});

document.getElementById('decrement').addEventListener('click', () => {
  count--; 
  render();
});

render();
```

<br>

但是如果我們用React，我們就可以利用React的state來管理我們的狀態，React的state會自動幫我們更新DOM，我們只需要專注在UI跟邏輯上，不需要自己手動更新DOM。
<br><br>

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

<br><br>

<h2>Routing</h2>

如果用 Vanilla JS，我們需要自己設計複雜的邏輯來處理路由。例如，基於 URL 的條件判斷來顯示不同頁面。

而框架如 Next.js 和 React Router 提供了強大的路由功能，只需定義路由規則，框架會自動幫我們處理頁面跳轉和狀態保存，大幅提升開發效率。


<br><br>

<h2>使用前端框架的選擇與反思</h2>

讀到這裡，如果有使用過框架的人一定會覺得框架真的非常方便，我們只需專注於 UI 和邏輯，就能快速實現需求。然而，在享受框架帶來的便利時，也需要對以下幾點進行思考：

<h3> 是否真的需要框架？ </h3>

如果我們的應用只是一些簡單的功能，例如靜態頁面或少量的交互，使用框架是否會引入過多的複雜性？框架的額外開銷是否可能降低網頁的效能？

<br>
<h3> 如何選擇合適的框架？ </h3>

當確定需要框架時，我們應根據項目需求選擇最適合的工具。

內容為主的網站（如 Blog）： 我們會使用 Next.js 或 Astro。Next.js 的 SSR 能有效提升 SEO，而 Astro 則以輕量和快速生成靜態頁面聞名。
互動性高的應用（如即時儀表板）： 適合選擇 React，因為其 CSR 模式可以提供更好的用戶體驗和性能表現。
基礎的重要性：

<br>
在使用框架之前，建議熟悉 Vanilla JS。理解框架為我們做了哪些事情，可以幫助我們快速上手，並避免開發過程中因不熟悉基礎而感到困惑。
<br><br>
透過以上的反思，我們能更有目的性地使用框架，發揮框架真正的價值！

