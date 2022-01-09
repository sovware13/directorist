import lazyChecks from "../../lib/lazy-checks/lazy-check";

window.onload = function() {
  new lazyChecks({
    modalTitle: "Tags",
    containerClass: "directorist-tags-lazy-checks",
    showMoreToggleClass: "directorist-link",
    ajax: {
      url: atbdp_public_data.ajaxurl,
      data: params => {
        params.action     = "directorist_get_tags";
        params.page       = params.page || 1;
        params.per_page   = 4;
        // params.per_page   = ( ! params.page || params.page === 1 ) ? 4 : 50;
        params.tag_source = "all_tags";

        return params;
      },
      processResults: ( response ) => {
        response.hasNextPage = true;

        return response;
      },
      template: ( item ) => {
        const id              = item.randomID;
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params          = Object.fromEntries(urlSearchParams.entries());
        let in_tag            = params.in_tag;

        if ( in_tag ) {
          try {
            in_tag = JSON.parse( in_tag );
          } catch (error) {}
        }

        const checked = ( in_tag instanceof Array && in_tag.includes( item.term_id ) ) ? 'checked' : '';

        return `
        <div class="directorist-checkbox directorist-checkbox-primary directorist-lazy-check-item-wrap">
          <input type="checkbox" name="in_tag[]" value="${item.term_id}" id="${id}"${checked}>
          <label for="${id}" class="directorist-checkbox__label">${item.name}</label>
        </div>
        `;
      },
    },

    debagMode: true
  }).init();
};
