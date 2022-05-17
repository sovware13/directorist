import { get_dom_data } from './../../lib/helper';

var loc_data = get_dom_data( 'loc_data' );

window.addEventListener( 'load', setup_map );
window.addEventListener( 'directorist-reload-listings-map-archive', setup_map );

function setup_map() {
    bundle1.fillPlaceholders();
    var localVersion = bundle1.getLibVersion('leaflet.featuregroup.subgroup', 'local');
    
    if (localVersion) {
        localVersion.checkAssetsAvailability(true)
            .then(function () {
                load();
            })
            .catch(function () {
                var version102 = bundle1.getLibVersion('leaflet.featuregroup.subgroup', '1.0.2');
                if (version102) {
                    version102.defaultVersion = true;
                }
                load();
            });
    } else {
        load();
    }
}

function load() {
    var loc_data = get_dom_data( 'loc_data' );
    var libVersionsDict = {
        'leaflet': '1.3.1',
        'leaflet.markercluster': '1.3.0',
        'leaflet.featuregroup.subgroup': 'local',
    };  

    var list = bundle1.getAndSelectVersionsAssetsList( libVersionsDict );

    list.push({
        type: 'script',
        path: loc_data.script_path
    });
    loadJsCss.list(list, {
        delayScripts: 500 // Load scripts after stylesheets, delayed by this duration (in ms).
    });
}