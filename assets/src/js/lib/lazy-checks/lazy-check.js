import lazyCheckCore from "./lazy-check-core";
import utility from "./utility";

const lazyCheck = function(userArgs) {
  const _defaultArgs = {
    modalTitle: '',
    containerClass: '',
    showMorelabel: 'Show More',
    showMoreToggleClass: '',
    ajax: {
      url: '',
      data: params => params,

      processResults: ( response ) => {
        return response;
      },

      template: ( item, headers ) => {
        return '';
      },

      loadingIndicator: 'Loading...',
    },
    debagMode: false
  };

  this.args = lazyCheckCore.parseArgs(userArgs, _defaultArgs);

  /**
   * Init
   *
   * @returns void
   */
  this.init = () => {
    if (!this.args.containerClass) return;

    const rootElements = document.querySelectorAll(
      "." + this.args.containerClass
    );

    if (!rootElements.length) {
      utility.sendDebugLog("Container Found", rootElement);
      return;
    }

    // Enable Lazy Checks to each root element
    for (const elm of rootElements) {
      lazyCheckCore.enableLazyChecks(elm, this.args);
    }
  };
};

export default lazyCheck;
