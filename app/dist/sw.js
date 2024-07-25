if (!self.define) {
  let e,
    i = {};
  const n = (n, s) => (
    (n = new URL(n + ".js", s).href),
    i[n] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = i), document.head.appendChild(e);
        } else (e = n), importScripts(n), i();
      }).then(() => {
        let e = i[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, o) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[c]) return;
    let r = {};
    const d = (e) => n(e, c),
      f = { module: { uri: c }, exports: r, require: d };
    i[c] = Promise.all(s.map((e) => f[e] || d(e))).then((e) => (o(...e), r));
  };
}
define(["./workbox-32a34f02"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "assets/button.esm-CsfCWBxe.js", revision: null },
        { url: "assets/ChatView-BPxDahbS.css", revision: null },
        { url: "assets/ChatView-CE_IBxDC.js", revision: null },
        { url: "assets/divider.esm-0TGMeqTP.js", revision: null },
        { url: "assets/Error404View-C1Np7o0R.js", revision: null },
        { url: "assets/HomeView-BRWHKoQW.js", revision: null },
        { url: "assets/HomeView-CwLymfHF.css", revision: null },
        { url: "assets/index-Bi9J63cY.css", revision: null },
        { url: "assets/index-CZ1PqPyt.js", revision: null },
        { url: "assets/Kenai-Logo-BXUwRjfc.png", revision: null },
        { url: "assets/PostgresStatusView-CnS3POhb.css", revision: null },
        { url: "assets/PostgresStatusView-DrGyL66-.js", revision: null },
        { url: "assets/primeicons-Dr5RGzOO.svg", revision: null },
        { url: "favicon.ico", revision: "b44e076bbf10d43a7ac41e7b717a92f3" },
        {
          url: "icons/android-chrome-192x192.png",
          revision: "4bc972a36d0dfb715e1fc65e89238076",
        },
        {
          url: "icons/android-chrome-512x512.png",
          revision: "627eb7b582b2d6a562ab8570b91e450d",
        },
        {
          url: "icons/apple-touch-icon.png",
          revision: "1835e81bac58619c52ede142a89bb16c",
        },
        {
          url: "icons/favicon-16x16.png",
          revision: "e924cd9f65d831f1f56e2fb7d2722d26",
        },
        {
          url: "icons/favicon-32x32.png",
          revision: "9e2becf79fd0ea3cda9fd5e0d4766c4a",
        },
        {
          url: "icons/icon-128x128.png",
          revision: "3d18848a35228bdd15481c8f73d5c1e2",
        },
        {
          url: "icons/icon-144x144.png",
          revision: "1a5a90a92038ddb9e953d9c513a81f2b",
        },
        {
          url: "icons/icon-152x152.png",
          revision: "9bfb259225403cc8790f464895f7fc62",
        },
        {
          url: "icons/icon-192x192.png",
          revision: "e8e227d79eff96ff7211de3494d7cc1e",
        },
        {
          url: "icons/icon-36x36.png",
          revision: "d56c3b0db8678f803a69448609fd371d",
        },
        {
          url: "icons/icon-384x384.png",
          revision: "81f488c0248616d1a8b8811235c3238c",
        },
        {
          url: "icons/icon-48x48.png",
          revision: "70fc44a76e78bfd6bc8be20fc8682f82",
        },
        {
          url: "icons/icon-512x512.png",
          revision: "e667e55cf64e6c421dba68e7e0b875d8",
        },
        {
          url: "icons/icon-72x72.png",
          revision: "9ae7803e2b312862b7019d1be9999e74",
        },
        {
          url: "icons/icon-96x96.png",
          revision: "f1747df4ffc7f48fd3ccbb0644414995",
        },
        { url: "index.html", revision: "4d46db07bfab2c0821f0da8530ebc1df" },
        { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" },
        {
          url: "icons/android-chrome-192x192.png",
          revision: "4bc972a36d0dfb715e1fc65e89238076",
        },
        {
          url: "icons/android-chrome-512x512.png",
          revision: "627eb7b582b2d6a562ab8570b91e450d",
        },
        {
          url: "icons/apple-touch-icon.png",
          revision: "1835e81bac58619c52ede142a89bb16c",
        },
        {
          url: "icons/favicon-16x16.png",
          revision: "e924cd9f65d831f1f56e2fb7d2722d26",
        },
        {
          url: "icons/favicon-32x32.png",
          revision: "9e2becf79fd0ea3cda9fd5e0d4766c4a",
        },
        {
          url: "icons/icon-72x72.png",
          revision: "9ae7803e2b312862b7019d1be9999e74",
        },
        {
          url: "icons/icon-96x96.png",
          revision: "f1747df4ffc7f48fd3ccbb0644414995",
        },
        {
          url: "icons/icon-128x128.png",
          revision: "3d18848a35228bdd15481c8f73d5c1e2",
        },
        {
          url: "icons/icon-144x144.png",
          revision: "1a5a90a92038ddb9e953d9c513a81f2b",
        },
        {
          url: "icons/icon-152x152.png",
          revision: "9bfb259225403cc8790f464895f7fc62",
        },
        {
          url: "icons/icon-192x192.png",
          revision: "e8e227d79eff96ff7211de3494d7cc1e",
        },
        {
          url: "icons/icon-384x384.png",
          revision: "81f488c0248616d1a8b8811235c3238c",
        },
        {
          url: "icons/icon-512x512.png",
          revision: "e667e55cf64e6c421dba68e7e0b875d8",
        },
        {
          url: "manifest.webmanifest",
          revision: "36e81307016fb2073412e3a8a4e46f1e",
        },
      ],
      {}
    ),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
});
