// 手语视点 Hexo Theme - 辅助脚本
(function(){
  // 图片懒加载
  var imgs = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) {
    // 浏览器原生支持，不需要额外处理
  } else {
    // fallback: 简单的IntersectionObserver
    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.dataset.src || img.src;
            observer.unobserve(img);
          }
        });
      });
      imgs.forEach(function(img) { observer.observe(img); });
    }
  }

  // 代码块添加复制按钮
  var codes = document.querySelectorAll('figure.highlight');
  codes.forEach(function(block) {
    var btn = document.createElement('button');
    btn.textContent = '复制';
    btn.className = 'copy-btn';
    btn.style.cssText = 'position:absolute;top:.3rem;right:.3rem;font-size:.65rem;padding:.15rem .5rem;border-radius:4px;background:#fff;border:1px solid rgba(0,0,0,0.1);color:rgba(0,0,0,0.4);cursor:pointer;display:none';
    block.style.position = 'relative';
    block.appendChild(btn);
    block.addEventListener('mouseenter', function(){ btn.style.display = 'block' });
    block.addEventListener('mouseleave', function(){ btn.style.display = 'none' });
    btn.addEventListener('click', function() {
      var code = block.querySelector('.code pre') || block.querySelector('pre');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(function() {
          btn.textContent = '✓ 已复制';
          setTimeout(function(){ btn.textContent = '复制'; }, 1500);
        }).catch(function() {
          btn.textContent = '复制失败';
        });
      }
    });
  });
})();
