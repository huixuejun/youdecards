const VER = 'slideshow-v3';          // 换版本时改这个字符串即可强制更新
const SHELL = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    缓存.键().然后(ks => Promise.all(
      ks.filter(k => k !== VER).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    缓存.匹配(e.请求).然后(命中 => 命中 || 获取(e.请求).然后(响应 => {
      const copy = resp.clone();
      缓存.打开(VER).然后(c => c.放入(e.请求, 复制)).捕获(()=>{});
      返回 响应;
    }).捕获(() => new Response('', {状态: 404})))
  );
});
