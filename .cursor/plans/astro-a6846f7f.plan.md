<!-- a6846f7f-ab37-4981-90b8-66b707d2d58e 91172bac-87a9-4321-8962-22b62714f893 -->

# 修復 Header 手機選單僅首次載入可用的問題

## 問題描述

- 從其他頁面切回首頁後，手機版漢堡選單點擊無反應，只有第一次完整載入時有效。

## 可能原因

- 綁定點擊事件的程式碼只在首次載入時執行；之後頁面經由 View Transitions（client-side navigation）替換 DOM，原本綁定在舊 DOM 的事件消失，但沒有重新綁定。
- `BaseLayout` 目前以 `<script> import "../scripts/menu.js"; </script>` 引入腳本，瀏覽器端行為可能不穩定；建議改為 `type="module" src="/src/scripts/menu.js"` 的方式由 Vite 正確處理。

## 既有程式（參考）

```1:5:/Users/justinli/repo/lbjdev/src/scripts/menu.js
document.addEventListener('astro:page-load', () => {
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
  });
});
```

```41:43:/Users/justinli/repo/lbjdev/src/layouts/BaseLayout.astro

<Footer />

<script>

import "../scripts/menu.js";

</script>

```

## 將要做的變更

1. 強化重新綁定邏輯（menu.js）

- 監聽 `astro:page-load` 與 `astro:after-swap` 兩個事件，於每次換頁完成後呼叫 `setup()` 重新綁定。
- 增加防呆與具冪等操作（使用 `onclick =` 覆蓋，避免重複註冊）。

示意：

```js
function setup() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");
  if (!hamburger || !nav) return;
  hamburger.onclick = () => nav.classList.toggle("expanded");
}
["astro:page-load", "astro:after-swap"].forEach((evt) =>
  document.addEventListener(evt, setup),
);
```

2. 穩定引入腳本（BaseLayout）

- 改為：`<script type="module" src="/src/scripts/menu.js"></script>`

3. 驗證

- 在手機尺寸／桌機尺寸切換，以及從 `/about`、`/blog` 返回 `/` 後，點擊漢堡選單皆能開合。

## 驗收標準

- 任意頁面切換返回首頁後，漢堡選單行為一致、可正常開合。
- 不重覆註冊導致的多次 toggle 現象不存在。

### To-dos

- [ ] Import/configure remark-gfm + rehype-slug/autolink/external-links in astro.config.mjs
- [ ] Install and enable @tailwindcss/typography in tailwind.config.mjs
- [ ] Add minimal ul/ol fallback spacing in src/styles/global.css (optional)
- [ ] Document MD authoring rules: blank lines, ASCII '-', ordered '1.', escaping '- 1' text
- [ ] Open posts to confirm lists render; fix any edge cases
