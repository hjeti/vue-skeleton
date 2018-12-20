const waitForStyleSheetsLoaded = (document: HTMLDocument) =>
  new Promise(resolve => {
    const links = <Array<HTMLLinkElement>>(
      Array.from(document.querySelectorAll('link[rel=stylesheet]'))
    );

    let allLoaded = false;
    let loadedCount = 0;
    const checkAllLoaded = (initial = false) => {
      // initially, check stylesheets in the DOM, otherwise, check loaded count
      if (
        !allLoaded &&
        ((initial && document.styleSheets.length >= links.length) ||
          (!initial && loadedCount >= links.length))
      ) {
        allLoaded = true;

        resolve();
      }
    };

    checkAllLoaded(true);

    if (!allLoaded) {
      links.forEach(stylesheet => {
        stylesheet.onload = () => {
          loadedCount += 1;
          checkAllLoaded();
        };
      });
    }
  });
export default waitForStyleSheetsLoaded;
