(function setPublicPath(publicPathMeta) {
  if (publicPathMeta) {
    window.webpackPublicPath = publicPathMeta.getAttribute('content');
  }
})(document.querySelector('meta[name="webpack:public-path"]'));
