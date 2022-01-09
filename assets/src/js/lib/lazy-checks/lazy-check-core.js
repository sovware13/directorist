import httpHelpers from "../../helpers/http-helpers";
import utility from "./utility";

const lazyCheckCore = {
  args: {},

  parseArgs: function(userArgs, defaultArgs) {
    let args = { ...defaultArgs, ...userArgs };

    // Validate AJAX argument
    // --------------------------
    if ( args.ajax && ! Array.isArray(args.ajax) && typeof args.ajax === "object" ) {
      args.ajax = { ...defaultArgs.ajax, ...args.ajax };
    } else {
      args.ajax = defaultArgs.ajax;
    }

    if ( typeof args.ajax.data !== "function" ) {
      args.ajax.data = defaultArgs.ajax.data;
    }

    if ( typeof args.ajax.processResults !== "function" ) {
      args.ajax.processResults = defaultArgs.ajax.processResults;
    }

    if ( typeof args.ajax.template !== "function" ) {
      args.ajax.template = defaultArgs.ajax.template;
    }

    if ( typeof args.ajax.loadingIndicator !== 'string' ) {
      args.ajax.loadingIndicator = defaultArgs.ajax.loadingIndicator;
    }

    return args;
  },

  enableLazyChecks: async function(rootContainer, args) {
    this.args = args;

    // Attach ID to root element
    const id = utility.generateRandom(100, 999);
    rootContainer.setAttribute("data-lazy-check-root-element-id", id);

    // Attach current page number to root element
    rootContainer.setAttribute("data-lazy-check-current-page", 0);

    // Prepare Root Element
    this.prepareRootElement(id);

    // Add Loading Indicator To Root Container
    this.addLoadingIndicatorToRootContainer( rootContainer );

    // Load initial data
    const initData = await this.fetchData(id);

    // Remove Loading Indicator From Root Container
    this.removeLoadingIndicatorFromRootContainer( rootContainer );

    // Insert items to the DOM
    if ( initData.success && initData.data.items.length ) {
      let itemsContainer = rootContainer.querySelector( '.directorist-lazy-check-items' );

      initData.data.template.map(item => {
        itemsContainer.innerHTML += item;
      });
    }

    // Get items container
    let itemsContainer = rootContainer.querySelector(
      ".directorist-lazy-check-items"
    );

    // Get init items
    const initialItems = itemsContainer.querySelectorAll(
      ".directorist-lazy-check-item-wrap"
    );

    // Set max item limit to root element
    rootContainer.setAttribute(
      "data-lazy-check-max-init-item-length",
      initialItems.length
    );

    // Add identifier to init items
    if (initialItems.length) {
      for (const item of initialItems) {
        item.classList.add("init-item");
      }
    }

    // Enable Toggle
    const toggle = rootContainer.querySelector(
      ".directorist-lazy-check-toggle-show-more"
    );

    if (toggle) {
      toggle.addEventListener("click", event =>
        this.toogleModal(event, rootContainer)
      );
    }
  },

  prepareRootElement: function(id) {
    const rootContainer = this.getRootContainerByID(id);

    let itemsContainer = rootContainer.querySelector(
      ".directorist-lazy-check-items"
    );

    if (!itemsContainer) {
      itemsContainer = document.createElement("div");
      itemsContainer.classList = "directorist-lazy-check-items";

      rootContainer.append(itemsContainer);
    }

    // Add Show More Area
    let showMoreArea = rootContainer.querySelector(
      ".directorist-lazy-check-show-more-area"
    );

    if ( ! showMoreArea ) {
      showMoreArea = document.createElement("div");
      showMoreArea.classList = "directorist-lazy-check-show-more-area";

      utility.insertAfter(itemsContainer, showMoreArea);
    }

    showMoreArea.innerHTML = "";

    // Add Feedback Area
    let feedbackArea = rootContainer.querySelector(
      ".lazy-check-feedback"
    );

    if ( ! feedbackArea ) {
      feedbackArea = document.createElement("div");
      feedbackArea.classList = "lazy-check-feedback";

      itemsContainer.parentNode.insertBefore( feedbackArea, showMoreArea );
    }

    feedbackArea.innerHTML = "";

    // Insert Toggle Link
    const toggleLink = document.createElement("a");
    toggleLink.setAttribute("href", "#");
    toggleLink.classList = `directorist-lazy-check-toggle-show-more ${this.args.showMoreToggleClass}`;
    toggleLink.innerHTML = this.args.showMorelabel;

    showMoreArea.append(toggleLink);
  },

  toogleModal: function(event, rootContainer) {
    event.preventDefault();
    const id = rootContainer.getAttribute("data-lazy-check-root-element-id");
    let modalContainer = document.querySelector(
      `[data-lazy-check-modal-id='${id}']`
    );

    if (!modalContainer) {
      modalContainer = this.insertModal(id);
    } else {
      this.updateModal(id);
    }

    const hasNextPage = this.hasNextPage( rootContainer );

    // this.addLoadMoreButtonToModal( modalContainer );

    if ( hasNextPage ) {
      this.addLoadMoreButtonToModal( modalContainer );
    } else {
      this.removeLoadMoreButtonFromModal( modalContainer );
    }

    utility.toggleClass(document.querySelector("body"), "lazy-check-no-scroll");
    utility.toggleClass(modalContainer, "show");
  },

  migrateInputIDs: function({ field, idConverter }) {
    const clonedField = field.cloneNode(true);

    // Input Fields
    const inputFields = clonedField.getElementsByTagName("input");
    if (inputFields.length) {
      for (const fieldItem of inputFields) {
        let oldID = fieldItem.getAttribute("id");
        let newID = idConverter(oldID);

        fieldItem.setAttribute("id", newID);
      }
    }

    // Labels
    const labels = clonedField.getElementsByTagName("label");
    if (labels.length) {
      for (const label of labels) {
        let oldID = label.getAttribute("for");
        let newID = idConverter(oldID);

        label.setAttribute("for", newID);
      }
    }

    return clonedField;
  },

  migrateInputIDsForModal: function(field) {
    const idConverter = oldID => "modal-id-" + oldID;
    return this.migrateInputIDs({ field, idConverter });
  },

  migrateInputIDsForRootElement: function(field) {
    const idConverter = oldID => oldID.replace("modal-id-", "");
    return this.migrateInputIDs({ field, idConverter });
  },

  closeModel: function({ modalContainer }) {
    utility.toggleClass(modalContainer, "show");
    utility.toggleClass(document.querySelector("body"), "lazy-check-no-scroll");
  },

  clearAllInputs: function({ modalContainer }) {
    const inputs = modalContainer.getElementsByTagName("input");

    if (!inputs.length) return;

    for (const input of inputs) {
      input.checked = false;
    }
  },

  applySelection: function({ id, modalContainer }) {
    const rootContainer = this.getRootContainerByID(id);
    const allCheckedItems = modalContainer.querySelectorAll("input:checked");

    // Reset to init state if no item is checked
    if (!allCheckedItems.length) {
      this.resetToInitState({ modalContainer, rootContainer });
      this.closeModel({ modalContainer });
      return;
    }

    // Apply checked items to root element
    this.applyCheckedItemsToRootElement({
      modalContainer,
      rootContainer,
      allCheckedItems
    });

    this.closeModel({ modalContainer });
  },

  insertModal: function(id) {
    const modalContainer = document.createElement("div");
    modalContainer.className = "lazy-check-modal";
    modalContainer.setAttribute("data-lazy-check-modal-id", id);
    modalContainer.innerHTML = `
           <div class="lazy-check-modal-content">
               <div class="lazy-check-modal-header">
                   <h4 class="lazy-check-modal-header-title">${this.args.modalTitle} </h4>

                   <span class="lazy-check-modal-close">
                       <i class="fas fa-times"></i>
                   </span>
               </div>

               <div class="lazy-check-modal-body">
                   <div class="lazy-check-modal-fields"></div>

                   <div class="lazy-check-modal-fields-controls"></div>

                   <div class="lazy-check-modal-feedback"></div>
               </div>

               <div class="lazy-check-modal-footer">
                   <div class="lazy-check-modal-actions">
                       <button type="button" class="lazy-check-btn lazy-check-btn-secondary lazy-check-clear-btn">Clear all</button>
                       <button type="button" class="lazy-check-btn lazy-check-btn-primary lazy-check-apply-btn">Apply</button>
                   </div>
               </div>
           </div>
       `;

    const rootContainer = document.querySelector(
      "[data-lazy-check-root-element-id='" + id + "']"
    );
    const initFields = rootContainer.querySelectorAll(
      ".directorist-lazy-check-items .directorist-lazy-check-item-wrap"
    );

    // Change ID's for input and label
    for (const field of initFields) {
      const migratedField = this.migrateInputIDsForModal(field);
      modalContainer
        .querySelector(".lazy-check-modal-fields")
        .append(migratedField);
    }

    document.body.append(modalContainer);

    // Attach Events
    // ---------------
    // Close Button
    const closeButton = modalContainer.querySelector(".lazy-check-modal-close");
    closeButton.addEventListener("click", event =>
      this.closeModel({ event, id, modalContainer })
    );

    // Clear Button
    const clearButton = modalContainer.querySelector(".lazy-check-clear-btn");
    clearButton.addEventListener("click", event =>
      this.clearAllInputs({ event, id, modalContainer })
    );

    // Apply Button
    const applyButton = modalContainer.querySelector(".lazy-check-apply-btn");
    applyButton.addEventListener("click", event =>
      this.applySelection({ event, id, modalContainer })
    );

    return modalContainer;
  },

  updateModal: function(id) {
    // Prepare data
    const rootContainer = this.getRootContainerByID(id);
    const modalContainer = this.getModalContainerByID(id);

    // Get checked items from root element
    const rootCheckedInputs = rootContainer.querySelectorAll("input:checked");
    const rootCheckedItems = [];

    if (rootCheckedInputs.length) {
      for (const input of rootCheckedInputs) {
        rootCheckedItems.push(input.parentElement);
      }
    }

    // Sync migrated checked items to modal
    const modalInputs = rootContainer.querySelectorAll("input");
    for (const input of modalInputs) {
      const id = input.getAttribute("id");
      const modalInput = modalContainer.querySelector(`#modal-id-${id}`);

      if (!modalInput) {
        return;
      }

      modalInput.checked = input.checked;
    }

    // Sort checked items in modal
    let modalCheckedInputs = modalContainer.querySelectorAll("input:checked");
    modalCheckedInputs = [...modalCheckedInputs].reverse();

    modalCheckedInputs.map(input => {
      modalContainer
        .querySelector(".lazy-check-modal-fields")
        .prepend(input.parentElement);
    });
  },

  addLoadMoreButtonToModal: function( modalContainer, force_add ) {
    if ( ! modalContainer ) {
      return;
    }

    const controllArea = modalContainer.querySelector( '.lazy-check-modal-fields-controls' );

    if ( ! controllArea ) {
      return;
    }

    // Remove existed on if has any
    const oldLoadMoreLink = controllArea.querySelector( '.lazy-check-modal-load-more-link' );
    if ( oldLoadMoreLink && ! force_add ) {
      oldLoadMoreLink.remove();
      return;
    }

    controllArea.innerHTML += `
    <a class="lazy-check-modal-load-more-link">
        <span class="lazy-check-modal-load-more-icon">
            <i class="fas fa-arrow-alt-circle-down"></i>
        </span>
    </a>
    `;

    const loadMoreLink = modalContainer.querySelector(
      ".lazy-check-modal-load-more-link"
    );

    loadMoreLink.addEventListener("click", event =>
      this.loadMoreFields({ modalContainer })
    );
  },

  removeLoadMoreButtonFromModal: function( modalContainer ) {
    if ( ! modalContainer ) {
      return;
    }

    const controllArea = modalContainer.querySelector( '.lazy-check-modal-fields-controls' );

    if ( ! controllArea ) {
      return;
    }

    const loadMoreLink = controllArea.querySelector( '.lazy-check-modal-load-more-link' );

    if ( ! loadMoreLink ) {
      return;
    }

    loadMoreLink.remove();
  },

  loadMoreFields: async function({ modalContainer }) {
    const modelID = this.getModalID( modalContainer );

    // Add Loading Indicator
    this.addLoadingIndicatorToModal( modalContainer );

    const nextData = await this.fetchData( modelID );

    // Remove Loading Indicator
    this.removeLoadingIndicatorFromModal( modalContainer );

    if ( ! nextData.success || ! nextData.data.items.length ) {
      return;
    }

    // Insert items to the DOM
    let itemsContainer = modalContainer.querySelector( '.lazy-check-modal-fields' );
    nextData.data.template.map(item => {
      itemsContainer.innerHTML += item;
    });
  },

  applyCheckedItemsToRootElement: function({
    modalContainer,
    rootContainer,
    allCheckedItems
  }) {
    const maxInitItemLength = parseInt(
      rootContainer.getAttribute("data-lazy-check-max-init-item-length")
    );
    let { checkedItems, checkedIDs } = this.getCheckedItems({
      allCheckedItems,
      maxInitItemLength
    });

    // Add additional field if nessasary
    if (checkedItems.length < maxInitItemLength) {
      checkedItems = this.wrapWithAdditionalItems({
        modalContainer,
        maxInitItemLength,
        checkedItems,
        checkedIDs
      });
    }

    const migratedSelectedItems = checkedItems.map(field => {
      return this.migrateInputIDsForRootElement(field);
    });

    const itemsContainer = rootContainer.querySelector(
      ".directorist-lazy-check-items"
    );
    itemsContainer.innerHTML = "";

    for (const item of migratedSelectedItems) {
      itemsContainer.append(item);
    }
  },

  getCheckedItems: function({ allCheckedItems, maxInitItemLength }) {
    let checkedItems = [];
    let checkedIDs = [];
    let count = 0;

    for (const item of allCheckedItems) {
      if (count === maxInitItemLength) break;

      const parent = item.parentElement;
      const id = item.getAttribute("id");

      checkedIDs.push(id);
      checkedItems.push(parent);

      count++;
    }

    return { checkedItems, checkedIDs };
  },

  wrapWithAdditionalItems: function({
    modalContainer,
    maxInitItemLength,
    checkedItems,
    checkedIDs
  }) {
    const initItems = modalContainer.querySelectorAll(".init-item");

    if (!initItems.length) return checkedItems;

    let requiredItemLength = maxInitItemLength - checkedItems.length;
    let count = 0;

    for (const initItem of initItems) {
      if (count === requiredItemLength) break;

      const input = initItem.querySelector("input");
      if (!input) continue;

      const id = input.getAttribute("id");
      if (checkedIDs.includes(id)) continue;

      checkedItems.push(initItem);

      count++;
    }

    return checkedItems;
  },

  resetToInitState: function({ modalContainer, rootContainer }) {
    const initItems = modalContainer.querySelectorAll(".init-item");

    if (!initItems.length) {
      return;
    }

    const itemsContainer = rootContainer.querySelector(
      ".directorist-lazy-check-items"
    );

    itemsContainer.innerHTML = "";

    for (const item of initItems) {
      const idConverter = oldID => oldID.replace("modal-id-", "");
      const migratedField = this.migrateInputIDs({
        field: item,
        idConverter
      });

      itemsContainer.append(migratedField);
    }
  },

  getRootContainerByID: function(id) {
    return document.querySelector(`[data-lazy-check-root-element-id='${id}']`);
  },

  getCurrentPage: function(rootContainer) {
    if ( ! rootContainer ) {
      return 1;
    }

    return parseInt(rootContainer.getAttribute("data-lazy-check-current-page"));
  },

  updateCurrentPage: function(rootContainer, newPageNumber) {
    if ( ! rootContainer ) return;

    rootContainer.setAttribute("data-lazy-check-current-page", newPageNumber);
  },

  hasNextPage: function(rootContainer) {
    if ( ! rootContainer) {
      return false;
    }

    return parseInt(rootContainer.getAttribute("data-lazy-check-has-next-page")) ? true : false;
  },

  updateHasNextPageStatus: function(rootContainer, status) {
    if ( ! rootContainer ) {
      return;
    }

    rootContainer.setAttribute("data-lazy-check-has-next-page", ( status ) ? 1 : 0);
  },

  getIsLoadingStatus: function(rootContainer) {
    if ( ! rootContainer ) {
      return false;
    }

    const isLoading = rootContainer.getAttribute("data-lazy-check-is-loading");

    return isLoading === '1' || isLoading === true ? true : false;
  },

  updateIsLoadingStatus: function(rootContainer, status) {
    if ( ! rootContainer ) {
      return;
    }

    rootContainer.setAttribute("data-lazy-check-is-loading", ( status ) ? 1 : 0);
  },

  getModalContainerByID: function(id) {
    return document.querySelector(`[data-lazy-check-modal-id='${id}']`);
  },

  getModalID: function( modalContainer ) {
    const id = modalContainer.getAttribute( 'data-lazy-check-modal-id' );

    return parseInt( id );
  },

  addLoadingIndicatorToModal: function( modalContainer ) {
    if ( ! modalContainer ) {
      return;
    }

    const feedbackArea = modalContainer.querySelector( '.lazy-check-modal-feedback' );

    if ( ! feedbackArea ) {
      return;
    }

    feedbackArea.innerHTML = this.args.ajax.loadingIndicator;
  },

  removeLoadingIndicatorFromModal: function( modalContainer ) {
    if ( ! modalContainer ) {
      return;
    }

    const feedbackArea = modalContainer.querySelector( '.lazy-check-modal-feedback' );

    if ( ! feedbackArea ) {
      return;
    }

    feedbackArea.innerHTML = '';
  },

  addLoadingIndicatorToRootContainer: function( rootContainer ) {
    if ( ! rootContainer ) {
      return;
    }

    const feedbackArea = rootContainer.querySelector( '.lazy-check-feedback' );

    if ( ! feedbackArea ) {
      return;
    }

    feedbackArea.innerHTML = this.args.ajax.loadingIndicator;
  },

  removeLoadingIndicatorFromRootContainer: function( rootContainer ) {
    if ( ! rootContainer ) {
      return;
    }

    const feedbackArea = rootContainer.querySelector( '.lazy-check-feedback' );

    if ( ! feedbackArea ) {
      return;
    }

    feedbackArea.innerHTML = '';
  },

  fetchData: async function(id) {
    // Prepare Data
    const rootContainer = this.getRootContainerByID(id);
    const modalContainer = this.getModalContainerByID( id );

    if ( ! rootContainer ) {
      return null;
    }

    // Response Status
    let responseStatus = new utility.responseStatus();

    // Stop if already loading
    const isLoading = this.getIsLoadingStatus( rootContainer );
    if ( isLoading ) {
      responseStatus.success = false;
      responseStatus.message = 'Please wait...';

      return responseStatus;
    }

    // Update Loading Status
    this.updateIsLoadingStatus(rootContainer, true);

    // Remove Load More Button
    this.removeLoadMoreButtonFromModal( modalContainer );

    const currentPage = this.getCurrentPage(rootContainer);
    const newPage = currentPage + 1;

    const formData = this.args.ajax.data({ page: newPage });
    let url = this.args.ajax.url;
    url = url + httpHelpers.jsonToQueryString(formData);

    const response = await fetch(url);
    const headers  = response.headers;
    const body     = await response.json();

    console.log( { formData, body } );

    // Validate Response
    if ( ! response.ok ) {
      responseStatus.success = false;
      responseStatus.message = "Something went wrong";

      return responseStatus;
    }

    // Process Results
    const processResults = this.args.ajax.processResults({ body, headers, hasNextPage: false });

    // Validate Process Results
    if ( ! ( processResults && typeof processResults == 'object' ) ) {
      responseStatus.success = false;
      responseStatus.message = "Something went wrong";

      return responseStatus;
    }

    if ( ! (processResults.body && processResults.body instanceof Array ) ) {
      responseStatus.success = false;
      responseStatus.message = "Response body must be array";

      return responseStatus;
    }

    if ( ! processResults.body.length ) {
      responseStatus.success = false;
      responseStatus.message = "No result found";

      // Update Has Next Page Status
      const hasNextPage = ( processResults.hasNextPage ) ? true : false;
      this.updateHasNextPageStatus(rootContainer, hasNextPage);

      // Remove Load More Button
      this.removeLoadMoreButtonFromModal( modalContainer );

      // Remove Loading Indicator
      this.removeLoadingIndicatorFromModal( modalContainer );

      return responseStatus;
    }

    // Process Results
    const templateData = processResults.body.map( item => {
      try {
        item.randomID = 'modal-id-' + utility.generateRandom( 100000, 999999 );

        return this.args.ajax.template( item, headers );
      } catch (error) {
        return '';
      }
    });

    // Update Status
    responseStatus.success = true;
    responseStatus.data = {
      items: processResults.body,
      template: templateData,
    };

    // Update Current Page
    this.updateCurrentPage(rootContainer, newPage);

    // Update Has Next Page Status
    const hasNextPage = ( processResults.hasNextPage ) ? true : false;
    this.updateHasNextPageStatus(rootContainer, hasNextPage);

    // Update Loading Status
    this.updateIsLoadingStatus(rootContainer, false);

    // Toggle Load More Button
    if ( hasNextPage ) {
      this.addLoadMoreButtonToModal( modalContainer );
    } else {
      this.removeLoadMoreButtonFromModal( modalContainer );
    }

    return responseStatus;
  },

};

export default lazyCheckCore;
