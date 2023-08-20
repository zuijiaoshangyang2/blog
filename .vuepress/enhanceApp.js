/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  // Create a <script> element
  const scriptElement = document.createElement('script');
  scriptElement.defer = true;
  scriptElement.dataset.domain = 'tj.naaa.top';
  scriptElement.src = 'https://tj.naaa.top/js/script.js';

  // Append the <script> element to the <head> tag
  document.head.appendChild(scriptElement);

  // ...apply other enhancements to the app if needed
}
