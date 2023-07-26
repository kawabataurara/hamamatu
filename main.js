"use strict";
{
  // 変数定義
  const CLASS = "open-active";
  let flg = false;
  let accordionFlg = false;
  let humberger = document.getElementById("js-humberger");
  // let focusTrap = document.getElementById("js-focus-trap");
  let menu = document.querySelector(".js_nav-area");
  // メニュー開閉制御
  humberger.addEventListener("click", (e) => {
    //ハンバーガーボタンが選択されたら
    e.currentTarget.classList.toggle(CLASS);
    menu.classList.toggle(CLASS);
    if (flg) {
      // flgの状態で制御内容を切り替え
      backgroundFix(false);
      humberger.setAttribute("aria-expanded", "false");
      humberger.focus();
      flg = false;
    }
  });
  window.addEventListener("keydown", () => {
    //escキー押下でメニューを閉じられるように
    if (event.key === "Escape") {
      humberger.classList.remove(CLASS);
      menu.classList.remove(CLASS);
      backgroundFix(false);
      humberger.focus();
      humberger.setAttribute("aria-expanded", "false");
      flg = false;
    }
  });
  // スムーススクロール
  const headerHeight = document.querySelector("header").offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      const target = document.getElementById(href.replace("#", ""));
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  function openActive() {
    const headerBtn = document.getElementById("navigation");
    const headerHumberger = document.getElementById("js-humberger");
    headerBtn.classList.remove("open-active");
    headerHumberger.classList.remove("open-active");
  }
  const headerLink = document.querySelectorAll(".js_menu");
  for (let i = 0; i < headerLink.length; i++) {
    headerLink[i].addEventListener("click", openActive);
  }
  window.addEventListener("scroll", function () {
    const topBtn = document.getElementById("topButton");
    const scroll = window.scrollY;
    if (scroll > 100) {
      topBtn.style.opacity = 1;
    } else topBtn.style.opacity = 0;
  });
  // フェードイン
  const targets = document.querySelectorAll(".js-fadeIn");

  function callback(entries, obs) {
    console.log(entries);
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("appear");
      obs.unobserve(entry.target);
    });
  }
  const options = {
    threshold: 0,
    rootMargin: "0px 0px",
  };
  const observer = new IntersectionObserver(callback, options);
  targets.forEach((target) => {
    observer.observe(target);
  });
}
