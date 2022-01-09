// import { jsonToQueryString } from "../helpers/http-helpers";

// const lazyChecks = ( args ) => {
//     const _defaultArgs = {
//         modalTitle: '',
//         containerClass: '',
//         ajax: {
//             url: '',
//             data: ( params ) => params,
//         },
//         debagMode: false,
//     };

//     args = { ..._defaultArgs, ...args };
//     validateArgs();

//     let _page;

//     /**
//      * Validate Arguments
//      *
//      * @returns void
//      */
//     function validateArgs() {
//         // Validate AJAX argument
//         // --------------------------
//         if ( args.ajax && ! Array.isArray( args.ajax ) && typeof args.ajax === 'object' ) {
//             args.ajax = { ..._defaultArgs.ajax, ...args.ajax };
//         } else {
//             args.ajax = _defaultArgs.ajax;
//         }

//         if ( typeof args.ajax.data != 'function' ) {
//             args.ajax.data = _defaultArgs.ajax.data;
//         }
//     };

//     /**
//      * Init
//      *
//      * @returns void
//      */
//     function init() {
//         if ( ! args.containerClass ) return;

//         const rootElements = document.querySelectorAll( '.' + args.containerClass );

//         if ( ! rootElements.length ) {
//             sendDebugLog( 'Container Found', rootElement );
//             return;
//         };

//         // Enable Lazy Checks to each root element
//         for ( const elm of rootElements ) {
//             enableLazyChecks( elm );
//         }
//     };

//     /**
//      * Enable Lazy Checks
//      *
//      * @param rootElement
//      * @returns void
//      */
//      function enableLazyChecks( rootElement ) {
//         rootElement.setAttribute( 'data-lazy-check-root-element-id', generateRandom( 100, 999 ) );

//         const itemsContainer = rootElement.querySelector( '.directorist-lazy-check-items' );
//         if ( ! itemsContainer ) {
//             sendDebugLog( 'No Item Container Found', rootElement );
//             return;
//         }

//         const initialItems = itemsContainer.querySelectorAll( '.directorist-lazy-check-item-wrap' );
//         rootElement.setAttribute( 'data-lazy-check-max-init-item-length', initialItems.length );

//         if ( initialItems.length ) {
//             for ( const item of initialItems ) {
//                 item.classList.add( 'init-item' );
//             }
//         }

//         const toggle = rootElement.querySelector( '.directorist-lazy-check-toggle' );

//         if ( toggle ) {
//             toggle.addEventListener( 'click', ( event ) => toogleAllFields( event, rootElement ) );
//         }
//     };

//     function toogleAllFields( event, rootElement ) {
//         event.preventDefault();
//         const id = rootElement.getAttribute( 'data-lazy-check-root-element-id' );
//         let modalContainer = document.querySelector(`[data-lazy-check-modal-id='${id}']`);

//         if ( ! modalContainer ) {
//             modalContainer = insertModal( id );
//         } else {
//             updateModal( id );
//         }

//         toggleClass( document.querySelector( 'body' ), 'lazy-check-no-scroll' );
//         toggleClass( modalContainer, 'show' );
//     }

//     function toggleClass( element, className ) {
//         if ( element.classList.contains( className ) ) {
//             element.classList.remove( className );
//         } else {
//             element.classList.add( className );
//         }
//     }

//     function getRootElementByID( id ) {
//         return document.querySelector( `[data-lazy-check-root-element-id='${id}']` );
//     }

//     function getModalContainerByID( id ) {
//         return document.querySelector( `[data-lazy-check-modal-id='${id}']` );
//     }

//     function insertModal( id ) {
//         const modalContainer = document.createElement( 'div' );
//         modalContainer.className = 'lazy-check-modal';
//         modalContainer.setAttribute( 'data-lazy-check-modal-id', id );
//         modalContainer.innerHTML = `
//             <div class="lazy-check-modal-content">
//                 <div class="lazy-check-modal-header">
//                     <h4 class="lazy-check-modal-header-title">${args.modalTitle} </h4>

//                     <span class="lazy-check-modal-close">
//                         <i class="fas fa-times"></i>
//                     </span>
//                 </div>

//                 <div class="lazy-check-modal-body">
//                     <div class="lazy-check-modal-fields"></div>

//                     <div class="lazy-check-modal-fields-controls">
//                         <a class="lazy-check-modal-load-more-link">
//                             <span class="lazy-check-modal-load-more-icon">
//                                 <i class="fas fa-arrow-alt-circle-down"></i>
//                             </span>
//                         </a>
//                     </div>

//                     <span class="lazy-check-modal-feedback"></span>
//                 </div>

//                 <div class="lazy-check-modal-footer">
//                     <div class="lazy-check-modal-actions">
//                         <button type="button" class="lazy-check-btn lazy-check-btn-secondary lazy-check-clear-btn">Clear all</button>
//                         <button type="button" class="lazy-check-btn lazy-check-btn-primary lazy-check-apply-btn">Apply</button>
//                     </div>
//                 </div>
//             </div>
//         `;

//         const rootElement = document.querySelector("[data-lazy-check-root-element-id='" + id + "']");
//         const initFields  = rootElement.querySelectorAll( '.directorist-lazy-check-items .directorist-lazy-check-item-wrap' );

//         // Change ID's for input and label
//         for ( const field of initFields ) {
//             const migratedField = migrateInputIDsForModal( field );
//             modalContainer.querySelector( '.lazy-check-modal-fields' ).append( migratedField );
//         }

//         document.body.append( modalContainer );

//         // Attach Events
//         // ---------------
//         // Close Button
//         const closeButton = modalContainer.querySelector( '.lazy-check-modal-close' );
//         closeButton.addEventListener( 'click', ( event ) => closeModel({ event, id, modalContainer }) );

//         // Clear Button
//         const clearButton = modalContainer.querySelector( '.lazy-check-clear-btn' );
//         clearButton.addEventListener( 'click', ( event ) => clearAllInputs({ event, id, modalContainer }) );

//         // Apply Button
//         const applyButton = modalContainer.querySelector( '.lazy-check-apply-btn' );
//         applyButton.addEventListener( 'click', ( event ) => applySelection({ event, id, modalContainer }) );

//         // Load More Link
//         const loadMoreLink = modalContainer.querySelector( '.lazy-check-modal-load-more-link' );
//         loadMoreLink.addEventListener( 'click', ( event ) => loadMoreFields({ event, id, modalContainer }) );

//         return modalContainer;
//     }

//     function updateModal( id ) {
//         // Prepare data
//         const rootElement    = getRootElementByID( id );
//         const modalContainer = getModalContainerByID( id );

//         // Get checked items from root element
//         const rootCheckedInputs = rootElement.querySelectorAll( 'input:checked' );
//         const rootCheckedItems  = [];

//         if ( rootCheckedInputs.length ) {
//             for ( const input of rootCheckedInputs ) {
//                 rootCheckedItems.push( input.parentElement );
//             }
//         }

//         // Sync migrated checked items to modal
//         const modalInputs = rootElement.querySelectorAll( 'input' );
//         for ( const input of modalInputs ) {
//             const id         = input.getAttribute( 'id' );
//             const modalInput = modalContainer.querySelector( `#modal-id-${id}` );

//             if ( ! modalInput ) return;

//             modalInput.checked = input.checked;
//         }

//         // Sort checked items in modal
//         let modalCheckedInputs = modalContainer.querySelectorAll( 'input:checked' );
//         modalCheckedInputs = [...modalCheckedInputs].reverse();

//         modalCheckedInputs.map( input => {
//             modalContainer.querySelector( '.lazy-check-modal-fields' ).prepend( input.parentElement );
//         });
//     }

//     function migrateInputIDs({ field, idConverter }) {
//         const clonedField = field.cloneNode( true );

//         // Input Fields
//         const inputFields = clonedField.getElementsByTagName( 'input' );
//         if ( inputFields.length ) {
//             for ( const fieldItem of inputFields ) {
//                 let oldID = fieldItem.getAttribute( 'id' );
//                 let newID = idConverter( oldID );

//                 fieldItem.setAttribute( 'id', newID );
//             }
//         }

//         // Labels
//         const labels = clonedField.getElementsByTagName( 'label' );
//         if ( labels.length ) {
//             for ( const label of labels ) {
//                 let oldID = label.getAttribute( 'for' );
//                 let newID = idConverter( oldID );

//                 label.setAttribute( 'for', newID );
//             }
//         }

//         return clonedField;
//     }

//     function migrateInputIDsForModal( field ) {
//         const idConverter = ( oldID ) => 'modal-id-' + oldID;
//         return migrateInputIDs({ field, idConverter });
//     }

//     function migrateInputIDsForRootElement( field ) {
//         const idConverter = ( oldID ) => oldID.replace( 'modal-id-', '' );
//         return migrateInputIDs({ field, idConverter });
//     }

//     function closeModel({ modalContainer }) {
//         toggleClass( modalContainer, 'show' );
//         toggleClass( document.querySelector('body'), 'lazy-check-no-scroll' );
//     }

//     function clearAllInputs({ modalContainer }) {
//         const inputs = modalContainer.getElementsByTagName( 'input' );

//         if ( ! inputs.length ) return;

//         for ( const input of inputs ) {
//             input.checked = false;
//         }
//     }

//     function applySelection({ id, modalContainer }) {
//         const rootElement     = getRootElementByID( id );
//         const allCheckedItems = modalContainer.querySelectorAll( 'input:checked' );

//         // Reset to init state if no item is checked
//         if ( ! allCheckedItems.length ) {
//             resetToInitState({ modalContainer, rootElement });
//             closeModel({ modalContainer });
//             return;
//         }

//         // Apply checked items to root element
//         applyCheckedItemsToRootElement({ modalContainer, rootElement, allCheckedItems });
//         closeModel({ modalContainer });
//     }

//     function loadMoreFields({ id, modalContainer }) {
//         console.log({ id, modalContainer });
//     }

//     function applyCheckedItemsToRootElement({ modalContainer, rootElement, allCheckedItems }) {
//         const maxInitItemLength = parseInt( rootElement.getAttribute( 'data-lazy-check-max-init-item-length' ) );
//         let { checkedItems, checkedIDs } = getCheckedItems({ allCheckedItems, maxInitItemLength });

//         // Add additional field if nessasary
//         if ( checkedItems.length < maxInitItemLength ) {
//             checkedItems = wrapWithAdditionalItems({
//                 modalContainer,
//                 maxInitItemLength,
//                 checkedItems,
//                 checkedIDs,
//             });
//         }

//         const migratedSelectedItems = checkedItems.map(( field ) => {
//             return migrateInputIDsForRootElement( field );
//         });

//         const itemsContainer = rootElement.querySelector( '.directorist-lazy-check-items' );
//         itemsContainer.innerHTML = '';

//         for ( const item of migratedSelectedItems ) {
//             itemsContainer.append( item );
//         }
//     }

//     function getCheckedItems({ allCheckedItems, maxInitItemLength }) {
//         let checkedItems = [];
//         let checkedIDs   = [];
//         let count = 0;

//         for ( const item of allCheckedItems ) {
//             if ( count === maxInitItemLength ) break;

//             const parent = item.parentElement;
//             const id = item.getAttribute( 'id' );

//             checkedIDs.push( id );
//             checkedItems.push( parent );

//             count++;
//         }

//         return { checkedItems, checkedIDs };
//     }

//     function wrapWithAdditionalItems({ modalContainer, maxInitItemLength, checkedItems, checkedIDs }) {
//         const initItems = modalContainer.querySelectorAll( '.init-item' );

//         if ( ! initItems.length ) return checkedItems;

//         let requiredItemLength = maxInitItemLength - checkedItems.length;
//         let count = 0;

//         for ( const initItem of initItems ) {
//             if ( count === requiredItemLength ) break;

//             const input = initItem.querySelector( 'input' );
//             if ( ! input ) continue;

//             const id = input.getAttribute( 'id' );
//             if ( checkedIDs.includes( id ) ) continue;

//             checkedItems.push( initItem );

//             count++;
//         }

//         return checkedItems;
//     }

//     function resetToInitState({ modalContainer, rootElement }) {
//         const initItems = modalContainer.querySelectorAll( '.init-item' );

//         if ( ! initItems.length ) return;

//         const itemsContainer = rootElement.querySelector( '.directorist-lazy-check-items' );
//         itemsContainer.innerHTML = '';

//         for ( const item of initItems ) {
//             const idConverter = ( oldID ) => oldID.replace( 'modal-id-', '' );
//             const migratedField = migrateInputIDs({ field: item, idConverter });

//             itemsContainer.append( migratedField );
//         }
//     }

//     function fetchData() {
//         const formData = args.ajax.data({ _page });
//         let url = args.ajax.url;
//         url = url + jsonToQueryString( formData );

//         fetch( url ).then( response => response.json() )
//             .then(( response ) => {
//                 console.log( response  );
//             }).catch(( error ) => {
//                 console.log( { error } );
//             });
//     };

//     /**
//      * Send Debug Log
//      *
//      * @param rootElement
//      * @returns void
//      */
//     function sendDebugLog( message, ref ) {
//         if ( ! args.debagMode ) return;

//         console.log({
//             message: `LazyChecks: ${message}`,
//             ref,
//         });
//     }

//     function generateRandom(min = 0, max = 100) {
//         // find diff
//         let difference = max - min;

//         // generate random number
//         let rand = Math.random();

//         // multiply with difference
//         rand = Math.floor( rand * difference );

//         // add with min value
//         rand = rand + min;

//         return rand;
//     }

//     // Init
//     init();
// };

// export default lazyChecks;