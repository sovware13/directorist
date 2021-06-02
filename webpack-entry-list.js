module.exports = {
    commonEntries: {
        // Public
        // -------------------------------------------
        // JS
        ['public-main']: ["./assets/src/js/main.js"],
        ['public-checkout']: ["./assets/src/js/checkout.js"],
        ['public-search-listing']: ["./assets/src/js/components/search-listing.js"],
        ['public-search-form-listing']: ["./assets/src/js/components/search-form-listing.js"],

        ['public-single-listing-openstreet-map-custom-script']: ["./assets/src/js/map-scripts/single-listing/openstreet-map.js"],
        ['public-single-listing-openstreet-map-widget-custom-script']: ["./assets/src/js/map-scripts/single-listing/openstreet-map-widget.js"],
        ['public-single-listing-gmap-custom-script']: ["./assets/src/js/map-scripts/single-listing/google-map.js"],
        ['public-single-listing-gmap-widget-custom-script']: ["./assets/src/js/map-scripts/single-listing/google-map-widget.js"],

        ['public-atmodal']: ["./assets/src/js/modules/atmodal.js"],
        ['public-releated-listings-slider']: ["./assets/src/js/components/releated-listings-slider.js"],
        ['public-geolocation-widget']: ["./assets/src/js/map-scripts/geolocation-widget.js"],

        // CSS
        ['public-search-style']: ["./assets/src/scss/layout/public/search-style.scss"],


        // Admin
        // -------------------------------------------
        ['admin-main']: "./assets/src/js/admin/admin.js",
        ['admin-custom-field']: "./assets/src/js/admin/custom-field.js",
        ['admin-extension-update']: "./assets/src/js/admin/extension-update.js",
        ['admin-import-export']: "./assets/src/js/admin/import-export.js",
        ['admin-plugins']: "./assets/src/js/admin/plugins.js",
        ['admin-setup-wizard']: "./assets/src/js/admin/setup-wizard.js",
        ['admin-multi-directory-archive']: "./assets/src/js/admin/multi-directory-archive.js",

        // CSS
        ['admin-drag-drop']: "./assets/src/scss/layout/admin/drag_drop.scss",

        // Global
        // -------------------------------------------
        // JS
        ['global-add-listing']: ["./assets/src/js/add-listing.js"],
        ['global-add-listing-openstreet-map-custom-script']: ["./assets/src/js/map-scripts/add-listing/openstreet-map.js"],
        ['global-add-listing-gmap-custom-script']: ["./assets/src/js/map-scripts/add-listing/google-map.js"],
        ['global-geolocation']: ["./assets/src/js/map-scripts/geolocation.js"],

        ['global-directorist-plupload']: "./assets/src/js/admin/directorist-plupload.js",
        ['global-pure-select']: ["./assets/src/js/modules/pureScriptSearchSelect.js"],
        ['global-load-osm-map']: ["./assets/src/js/map-scripts/load-osm-map.js"],
        ['global-map-view']: ["./assets/src/js/map-scripts/map-view.js"],
        ['global-markerclusterer']: ["./assets/src/js/map-scripts/markerclusterer.js"],

        // CSS
        ['global-openstreet-map']: ["./assets/src/scss/component/openstreet-map/index.scss"],
    },

    vueEntries: {
        ['admin-multi-directory-builder']: "./assets/src/js/admin/multi-directory-builder.js",
        ['admin-settings-manager']: "./assets/src/js/admin/settings-manager.js",
    },
}