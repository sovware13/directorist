window.addEventListener('DOMContentLoaded', () => {
    (function ($) {
        /* get current location */
        setTimeout(() => {
            if (directorist.i18n_text.select_listing_map === 'google') {
                /* Event Delegation in Vanilla JS */
                function eventDelegation(event, selector, program) {
                    document.body.addEventListener(event, function (e) {
                        document.querySelectorAll(selector).forEach(elem => {
                            if (e.target === elem) {
                                program(e);
                            }
                        })
                    });
                } 
                (function () {
                    eventDelegation('click', '.directorist-filter-location-icon > i, .directorist-filter-location-icon > span', function (e) {
                        const locationInput = e.target.closest('.directorist-search-field').querySelector('.location-name');
                        const get_lat = e.target.closest('.directorist-search-field').querySelector("#cityLat");
                        const get_lng = e.target.closest('.directorist-search-field').querySelector("#cityLng");

                        function getLocation() {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(showPosition, showError);
                            } else {
                                locationInput.value = 'Geolocation is not supported by this browser.';
                            }
                        }
                        getLocation();

                        function showPosition(position) {
                            lat = position.coords.latitude;
                            lon = position.coords.longitude;
                            displayCurrentLocation(lat, lon);
                            get_lat.value = lat;
                            get_lng.value = lon;
                        }

                        function showError(error) {
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    locationInput.value = 'User denied the request for Geolocation.';
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    locationInput.value = 'Location information is unavailable.';
                                    break;
                                case error.TIMEOUT:
                                    locationInput.value = 'The request to get user location timed out.';
                                    break;
                                case error.UNKNOWN_ERROR:
                                    locationInput.value = 'An unknown error occurred.';
                                    break;
                            }
                        }

                        function displayLocation(latitude, longitude) {
                            let geocoder;
                            geocoder = new google.maps.Geocoder();
                            const latlng = new google.maps.LatLng(latitude, longitude);
                            geocoder.geocode({
                                latLng: latlng,
                                componentRestrictions: {
                                    country: 'GB'
                                }
                            },
                            function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    if (results[0]) {
                                        const add = results[0].formatted_address;
                                        const value = add.split(',');

                                        count = value.length;
                                        country = value[count - 1];
                                        state = value[count - 2];
                                        city = value[count - 3];
                                        locationInput.value = city;
                                    } else {
                                        locationInput.value = 'address not found';
                                    }
                                } else {
                                    locationInput.value = `Geocoder failed due to: ${status}`;
                                }
                            });
                        }

                        function displayCurrentLocation(latitude, longitude) {
                            let geocoder;
                            geocoder = new google.maps.Geocoder();
                            const latlng = new google.maps.LatLng(latitude, longitude);
                            geocoder.geocode({
                                latLng: latlng
                            },
                            function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    if (results[0]) {
                                        const add = results[0].formatted_address;
                                        const value = add.split(',');

                                        count = value.length;
                                        country = value[count - 1];
                                        state = value[count - 2];
                                        city = value[count - 3];
                                        locationInput.value = city;
                                        $('.directorist-location-js, .atbdp-search-address').attr("data-value", city);
                                    } else {
                                        locationInput.value = 'address not found';
                                    }
                                } else {
                                    locationInput.value = `Geocoder failed due to: ${status}`;
                                }
                            });
                        }
                    })
                })();
            } else if (directorist.i18n_text.select_listing_map === 'openstreet') {
                function displayLocation(position, event) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const locIcon = event.target;

                    $.ajax({
                        url: `https://nominatim.openstreetmap.org/reverse?format=json&lon=${lng}&lat=${lat}`,
                        type: 'GET',
                        data: {},
                        success(data) {
                            $('.directorist-location-js, .atbdp-search-address').val(data.display_name);
                            $('.directorist-location-js, .atbdp-search-address').attr("data-value", data.display_name);
                            $('#cityLat').val(lat);
                            $('#cityLng').val(lng);
                        },
                    });
                }
                $('body').on("click", ".directorist-filter-location-icon", function (e) {
                    navigator.geolocation.getCurrentPosition((position) => displayLocation(position, e));
                });
            }

        }, 1000);
    })(jQuery);
});