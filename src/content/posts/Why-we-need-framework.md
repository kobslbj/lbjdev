---
title: '為什麼我們需要前端框架?'
pubDate: 2024-11-20
description: '在開始使用前端框架之前,我們要先了解為什麼我們需要用框架'
tags: ["Frontend","Framework"]
---
為什麼我們需要前端框架？這個問題是我在gdsc社課討論的其中一個Topic，也是我第一次接觸框架（Next.js）自己問過我自己的問題，我覺得蠻重要的，避免自己在一味的開發，不知道框架幫我們做了什麼事情，在這邊我會分享我自己的想法，歡迎跟我討論~
</br></br>

我那時候先從一個很簡單的問題開始問我自己。
</br></br>

## 「 什麼是HTML? 」

HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. 

</br>

這個問題問完之後再問自己另外一個問題
</br></br>

## 「 Browser是怎麼把我寫的HTML給呈現出來的？ 」

這時候我們就要仔細去探討browser是怎麼把HTML轉換成我們看到的畫面，不過Browser Rendering Work不是這篇文章想要探討的內容，這邊就大概提到，Browser是如何辨別我們開發的HTML，並且把它轉換成我們看到的畫面。

</br>

在我們Browser的main thread，會有一個HTML parser，這個HTML parser會把我們的HTML轉換成DOM tree，而這個DOM tree就是我們瀏覽器呈現的畫面！

</br>

以下是詳細的流程

HTML -> Tokenize -> Node -> DOM tree -> Render tree -> Layout -> Paint

(這裡不包括CSSOM的部分)

</br>

這邊想要強調一個點是，我們手動操作DOM tree是很耗費效能的，因為每次操作DOM tree都會觸發Browser的Reflow和Repaint，這樣會讓我們的網頁變得很慢，所以我們要盡量避免直接操作DOM tree。
</br></br>

## 「 那我們要怎麼避免直接操作DOM tree? 」

這時候就要提到前端框架了，框架會幫我們處理好DOM tree的部分，我們只需要專注在我們的UI跟邏輯上，透過框架避免直接操作DOM tree，這樣就可以提升我們網頁的效能。

</br></br>
好，我們理解到框架可以幫我們處理DOM tree，接下來我們要來好好認識框架究竟是什麼？

</br></br>

## 「 什麼是前端框架？ 」
簡單來說，框架就是會幫開發者寫好一些東西，讓開發者可以專注在實作上，而不用去操心一些基本的東西，例如：DOM tree的操作，這樣就可以提升開發者的效率。














