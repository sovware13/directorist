import lazyChecks from "../../lib/lazy-checks/lazy-check";

window.onload = function() {
  const defaultArgs = {
    modalTitle: "Tags",
    containerClass: "directorist-tags-lazy-checks",
    showMoreToggleClass: "directorist-link",
    ajax: {
      url: atbdp_public_data.ajaxurl,
      maxInitItems: 4,
      getPreselectedItemsID: () => {
        const urlParams = new URLSearchParams(window.location.search);
        const in_tag    = urlParams.getAll('in_tag[]');

        return ( in_tag instanceof Array ) ? in_tag : [];

      },
      data: params => {
        params.action     = "directorist_get_tags";
        params.tag_source = "all_tags";

        if ( params.isLoadingPreselectedItems && params.preselectedItemsID.length ) {
          params.page     = 1;
          params.per_page = -1;
          params.include  = params.preselectedItemsID;
        } else if ( ! params.isLoadingPreselectedItems && params.preselectedItemsID.length ) {
          params.page     = params.page || 1;
          params.per_page = 4;
          params.exclude  = params.preselectedItemsID;
        } else {
          params.page     = params.page || 1;
          params.per_page = 4;
        };

        return params;
      },
      processResults: ( response ) => {
        response.hasNextPage = true;

        return response;
      },
      template: ( item ) => {
        const id       = item.randomID;
        const urParams = new URLSearchParams(window.location.search);
        let in_tag     = urParams.getAll('in_tag[]');

        const checked = ( in_tag instanceof Array && in_tag.includes( `${item.term_id}` ) ) ? 'checked' : '';

        return `
        <div class="directorist-checkbox directorist-checkbox-primary directorist-lazy-check-item-wrap">
          <input type="checkbox" name="in_tag[]" value="${item.term_id}" id="${id}"${checked}>
          <label for="${id}" class="directorist-checkbox__label">${item.name}</label>
        </div>
        `;
      },
    },
  };

  const filterArgs = window.directoristLazyTagArgs;
  let args =  defaultArgs;

  if ( filterArgs && typeof filterArgs == 'object' ) {
    args = { ...defaultArgs, ...filterArgs };
    args.ajax = defaultArgs.ajax;

    if ( filterArgs.ajax && typeof filterArgs.ajax == 'object' ) {
      args.ajax = { ...defaultArgs.ajax, ...filterArgs.ajax };
    }
  }

  new lazyChecks( args ).init();
};
