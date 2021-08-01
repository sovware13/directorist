function get_dom_data ( key ) {
    let dataContainer = document.getElementById( `directorist-dom-data-${key}` );

    if ( ! dataContainer ) {
        return '';
    }

    let dataContent = dataContainer.innerText;
    let data = '';

    try {
        data = JSON.parse( dataContent );
    } catch (e) {
        console.log( e );
    }

    return data;
}

export { get_dom_data };