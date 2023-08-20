export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  // 添加自定义脚本标签
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = 'tj.naaa.top';
  script.src = 'https://tj.naaa.top/js/script.js';
  document.head.appendChild(script);

  // ...应用其他增强逻辑
}
