/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/js/public/components/atbdAlert.js":
/*!******************************************************!*\
  !*** ./assets/src/js/public/components/atbdAlert.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function ($) {
  /* Directorist alert dismiss */
  if ($('.directorist-alert__close') !== null) {
    $('.directorist-alert__close').each(function (i, e) {
      $(e).on('click', function (e) {
        e.preventDefault();
        $(this).closest('.directorist-alert').remove();
      });
    });
  }
})(jQuery);

/***/ }),

/***/ "./assets/src/js/public/components/atbdDropdown.js":
/*!*********************************************************!*\
  !*** ./assets/src/js/public/components/atbdDropdown.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* custom dropdown */
var atbdDropdown = document.querySelectorAll('.directorist-dropdown-select'); // toggle dropdown

var clickCount = 0;

if (atbdDropdown !== null) {
  atbdDropdown.forEach(function (el) {
    el.querySelector('.directorist-dropdown-select-toggle').addEventListener('click', function (e) {
      e.preventDefault();
      clickCount++;

      if (clickCount % 2 === 1) {
        document.querySelectorAll('.directorist-dropdown-select-items').forEach(function (elem) {
          elem.classList.remove('directorist-dropdown-select-show');
        });
        el.querySelector('.directorist-dropdown-select-items').classList.add('directorist-dropdown-select-show');
      } else {
        document.querySelectorAll('.directorist-dropdown-select-items').forEach(function (elem) {
          elem.classList.remove('directorist-dropdown-select-show');
        });
      }
    });
  });
} // remvoe toggle when click outside


document.body.addEventListener('click', function (e) {
  if (e.target.getAttribute('data-drop-toggle') !== 'directorist-dropdown-select-toggle') {
    clickCount = 0;
    document.querySelectorAll('.directorist-dropdown-select-items').forEach(function (el) {
      el.classList.remove('directorist-dropdown-select-show');
    });
  }
}); //custom select

var atbdSelect = document.querySelectorAll('.atbd-drop-select');

if (atbdSelect !== null) {
  atbdSelect.forEach(function (el) {
    el.querySelectorAll('.directorist-dropdown-select-items').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        el.querySelector('.directorist-dropdown-select-toggle').textContent = e.target.textContent;
        el.querySelectorAll('.directorist-dropdown-select-items').forEach(function (elm) {
          elm.classList.remove('atbd-active');
        });
        item.classList.add('atbd-active');
      });
    });
  });
}

;

(function ($) {
  // Dropdown
  $('body').on('click', '.directorist-dropdown .directorist-dropdown-toggle', function (e) {
    e.preventDefault();
    $(this).siblings('.directorist-dropdown-option').toggle();
  }); // Select Option after click

  $('body').on('click', '.directorist-dropdown .directorist-dropdown-option ul li a', function (e) {
    e.preventDefault();
    var optionText = $(this).html();
    $(this).children('.directorist-dropdown-toggle__text').html(optionText);
    $(this).closest('.directorist-dropdown-option').siblings('.directorist-dropdown-toggle').children('.directorist-dropdown-toggle__text').html(optionText);
    $('.directorist-dropdown-option').hide();
  }); // Hide Clicked Anywhere

  $(document).bind('click', function (e) {
    var clickedDom = $(e.target);
    if (!clickedDom.parents().hasClass('directorist-dropdown')) $('.directorist-dropdown-option').hide();
  }); //atbd_dropdown

  $(document).on("click", '.atbd_dropdown', function (e) {
    if ($(this).attr("class") === "atbd_dropdown") {
      e.preventDefault();
      $(this).siblings(".atbd_dropdown").removeClass("atbd_drop--active");
      $(this).toggleClass("atbd_drop--active");
      e.stopPropagation();
    }
  });
  $(document).on("click", function (e) {
    if ($(e.target).is(".atbd_dropdown, .atbd_drop--active") === false) {
      $(".atbd_dropdown").removeClass("atbd_drop--active");
    }
  });
  $('body').on('click', '.atbd_dropdown-toggle', function (e) {
    e.preventDefault();
  }); // Directorist Dropdown

  $('body').on('click', '.directorist-dropdown-js .directorist-dropdown__toggle-js', function (e) {
    e.preventDefault();

    if (!$(this).siblings('.directorist-dropdown__links-js').is(':visible')) {
      $('.directorist-dropdown__links').hide();
    }

    $(this).siblings('.directorist-dropdown__links-js').toggle();
  });
  $('body').on('click', function (e) {
    if (!e.target.closest('.directorist-dropdown-js')) {
      $('.directorist-dropdown__links-js').hide();
    }
  });
})(jQuery);

/***/ }),

/***/ "./assets/src/js/public/components/atbdFavourite.js":
/*!**********************************************************!*\
  !*** ./assets/src/js/public/components/atbdFavourite.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function ($) {
  // Add or Remove from favourites
  $('#atbdp-favourites').on('click', function (e) {
    var data = {
      'action': 'atbdp_public_add_remove_favorites',
      'post_id': $("a.atbdp-favourites").data('post_id')
    };
    $.post(atbdp_public_data.ajaxurl, data, function (response) {
      $('#atbdp-favourites').html(response);
    });
  });
  $('.directorist-favourite-remove-btn').each(function () {
    $(this).on('click', function (event) {
      event.preventDefault();
      var data = {
        'action': 'atbdp-favourites-all-listing',
        'post_id': $(this).data('listing_id')
      };
      $(".directorist-favorite-tooltip").hide();
      $.post(atbdp_public_data.ajaxurl, data, function (response) {
        var post_id = data['post_id'].toString();
        var staElement = $('.directorist_favourite_' + post_id);

        if ('false' === response) {
          staElement.remove();
        }
      });
    });
  });
})(jQuery);

/***/ }),

/***/ "./assets/src/js/public/components/atbdSelect.js":
/*!*******************************************************!*\
  !*** ./assets/src/js/public/components/atbdSelect.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//custom select
var atbdSelect = document.querySelectorAll('.atbd-drop-select');

if (atbdSelect !== null) {
  atbdSelect.forEach(function (el) {
    el.querySelectorAll('.atbd-dropdown-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        el.querySelector('.atbd-dropdown-toggle').textContent = item.textContent;
        el.querySelectorAll('.atbd-dropdown-item').forEach(function (elm) {
          elm.classList.remove('atbd-active');
        });
        item.classList.add('atbd-active');
      });
    });
  });
} // select data-status


var atbdSelectData = document.querySelectorAll('.atbd-drop-select.with-sort');
atbdSelectData.forEach(function (el) {
  el.querySelectorAll('.atbd-dropdown-item').forEach(function (item) {
    var ds = el.querySelector('.atbd-dropdown-toggle');
    var itemds = item.getAttribute('data-status');
    item.addEventListener('click', function (e) {
      ds.setAttribute('data-status', "".concat(itemds));
    });
  });
});

/***/ }),

/***/ "./assets/src/js/public/components/formValidation.js":
/*!***********************************************************!*\
  !*** ./assets/src/js/public/components/formValidation.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function ($) {
  $('#directorist-report-abuse-form').on('submit', function (e) {
    $('.directorist-report-abuse-modal button[type=submit]').addClass('directorist-btn-loading'); // Check for errors

    if (!e.isDefaultPrevented()) {
      e.preventDefault(); // Post via AJAX

      var data = {
        'action': 'atbdp_public_report_abuse',
        'directorist_nonce': atbdp_public_data.directorist_nonce,
        'post_id': $('#atbdp-post-id').val(),
        'message': $('#directorist-report-message').val()
      };
      $.post(atbdp_public_data.ajaxurl, data, function (response) {
        if (1 == response.error) {
          $('#directorist-report-abuse-message-display').addClass('text-danger').html(response.message);
        } else {
          $('#directorist-report-message').val('');
          $('#directorist-report-abuse-message-display').addClass('text-success').html(response.message);
        }

        $('.directorist-report-abuse-modal button[type=submit]').removeClass('directorist-btn-loading');
      }, 'json');
    }
  });
  $('#atbdp-report-abuse-form').removeAttr('novalidate'); // Validate contact form

  $('.directorist-contact-owner-form').on('submit', function (e) {
    e.preventDefault();
    var submit_button = $(this).find('button[type="submit"]');
    var status_area = $(this).find('.directorist-contact-message-display'); // Show loading message

    var msg = '<div class="directorist-alert"><i class="fas fa-circle-notch fa-spin"></i> ' + atbdp_public_data.waiting_msg + ' </div>';
    status_area.html(msg);
    var name = $(this).find('input[name="atbdp-contact-name"]');
    var contact_email = $(this).find('input[name="atbdp-contact-email"]');
    var message = $(this).find('textarea[name="atbdp-contact-message"]');
    var post_id = $(this).find('input[name="atbdp-post-id"]');
    var listing_email = $(this).find('input[name="atbdp-listing-email"]'); // Post via AJAX

    var data = {
      'action': 'atbdp_public_send_contact_email',
      'post_id': post_id.val(),
      'name': name.val(),
      'email': contact_email.val(),
      'listing_email': listing_email.val(),
      'message': message.val(),
      'directorist_nonce': atbdp_public_data.directorist_nonce
    };
    submit_button.prop('disabled', true);
    $.post(atbdp_public_data.ajaxurl, data, function (response) {
      submit_button.prop('disabled', false);

      if (1 == response.error) {
        atbdp_contact_submitted = false; // Show error message

        var msg = '<div class="atbdp-alert alert-danger-light"><i class="fas fa-exclamation-triangle"></i> ' + response.message + '</div>';
        status_area.html(msg);
      } else {
        name.val('');
        message.val('');
        contact_email.val(''); // Show success message

        var msg = '<div class="atbdp-alert alert-success-light"><i class="fas fa-check-circle"></i> ' + response.message + '</div>';
        status_area.html(msg);
      }

      setTimeout(function () {
        status_area.html('');
      }, 5000);
    }, 'json');
  });
  $('#atbdp-contact-form,#atbdp-contact-form-widget').removeAttr('novalidate');
})(jQuery);

/***/ }),

/***/ "./assets/src/js/public/components/review.js":
/*!***************************************************!*\
  !*** ./assets/src/js/public/components/review.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _review_starRating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./review/starRating */ "./assets/src/js/public/components/review/starRating.js");
/* harmony import */ var _review_starRating__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_review_starRating__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _review_advanced_review__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./review/advanced-review */ "./assets/src/js/public/components/review/advanced-review.js");
// Helper Components
 // import './review/addReview'
// import './review/reviewAttatchment'
// import './review/deleteReview'
// import './review/reviewPagination'



/***/ }),

/***/ "./assets/src/js/public/components/review/advanced-review.js":
/*!*******************************************************************!*\
  !*** ./assets/src/js/public/components/review/advanced-review.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

;

(function ($) {
  'use strict';

  var ReplyFormObserver = /*#__PURE__*/function () {
    function ReplyFormObserver() {
      var _this = this;

      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ReplyFormObserver);

      this.init();
      $(document).on('directorist_review_updated', function () {
        return _this.init();
      });
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ReplyFormObserver, [{
      key: "init",
      value: function init() {
        var node = document.querySelector('.commentlist');

        if (node) {
          this.observe(node);
        }
      }
    }, {
      key: "observe",
      value: function observe(node) {
        var config = {
          childList: true,
          subtree: true
        };
        var observer = new MutationObserver(this.callback);
        observer.observe(node, config);
      }
    }, {
      key: "callback",
      value: function callback(mutationsList, observer) {
        var _iterator = _createForOfIteratorHelper(mutationsList),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;
            var target = mutation.target;

            if (mutation.removedNodes) {
              target.classList.remove('directorist-form-added');

              var _iterator2 = _createForOfIteratorHelper(mutation.removedNodes),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var node = _step2.value;

                  if (!node.id || node.id !== 'respond') {
                    continue;
                  }

                  var criteria = node.querySelector('.directorist-review-criteria');

                  if (criteria) {
                    criteria.style.display = '';
                  }

                  var ratings = node.querySelectorAll('.directorist-review-criteria-select');

                  var _iterator3 = _createForOfIteratorHelper(ratings),
                      _step3;

                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      var rating = _step3.value;
                      rating.removeAttribute('disabled');
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }

                  node.querySelector('#submit').innerHTML = 'Submit Review';
                  node.querySelector('#comment').setAttribute('placeholder', 'Leave a review');
                  console.log(node.querySelector('#comment'));
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            var form = target.querySelector('#commentform');

            if (form) {
              target.classList.add('directorist-form-added');
              var isReview = target.classList.contains('review');
              var isEditing = target.classList.contains('directorist-form-editing');

              if (!isReview || isReview && !isEditing) {
                var _criteria = form.querySelector('.directorist-review-criteria');

                if (_criteria) {
                  _criteria.style.display = 'none';
                }

                var _ratings = form.querySelectorAll('.directorist-review-criteria-select');

                var _iterator4 = _createForOfIteratorHelper(_ratings),
                    _step4;

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var _rating = _step4.value;

                    _rating.setAttribute('disabled', 'disabled');
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }

              var alert = form.querySelector('.directorist-alert');

              if (alert) {
                alert.style.display = 'none';
              }

              form.querySelector('#submit').innerHTML = 'Submit Reply';
              form.querySelector('#comment').setAttribute('placeholder', 'Leave your reply');
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }]);

    return ReplyFormObserver;
  }();

  var CommentEditHandler = /*#__PURE__*/function () {
    function CommentEditHandler() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CommentEditHandler);

      this.init();
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CommentEditHandler, [{
      key: "init",
      value: function init() {
        $(document).on('submit', '#directorist-form-comment-edit', this.onSubmit);
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(event) {
        event.preventDefault();
        var $form = $(event.target);
        var originalButtonLabel = $form.find('[type="submit"]').val();
        $(document).trigger('directorist_review_before_submit', $form);
        var updateComment = $.ajax({
          url: $form.attr('action'),
          type: 'POST',
          contentType: false,
          cache: false,
          processData: false,
          data: new FormData($form[0])
        });
        $form.find('#comment').prop('disabled', true);
        $form.find('[type="submit"]').prop('disabled', true).val('loading');
        var commentID = $form.find('input[name="comment_id"]').val();
        var $wrap = $('#div-comment-' + commentID);
        $wrap.addClass('directorist-comment-edit-request');
        updateComment.success(function (data, status, request) {
          if (typeof data !== 'string' && !data.success) {
            $wrap.removeClass('directorist-comment-edit-request');
            CommentEditHandler.showError($form, data.data.html);
            return;
          }

          var body = $('<div></div>');
          body.append(data);
          var comment_section = '.directorist-review-container';
          var comments = body.find(comment_section);
          $(comment_section).replaceWith(comments);
          $(document).trigger('directorist_review_updated', data);
          var commentTop = $("#comment-" + commentID).offset().top;

          if ($('body').hasClass('admin-bar')) {
            commentTop = commentTop - $('#wpadminbar').height();
          } // scroll to comment


          if (commentID) {
            $("body, html").animate({
              scrollTop: commentTop
            }, 600);
          }
        });
        updateComment.fail(function (data) {
          console.log(data);
        });
        updateComment.always(function () {
          $form.find('#comment').prop('disabled', false);
          $form.find('[type="submit"]').prop('disabled', false).val(originalButtonLabel);
        });
        $(document).trigger('directorist_review_after_submit', $form);
      }
    }], [{
      key: "showError",
      value: function showError($form, msg) {
        $form.find('.directorist-alert').remove();
        $form.prepend(msg);
      }
    }]);

    return CommentEditHandler;
  }();

  var CommentAddReplyHandler = /*#__PURE__*/function () {
    function CommentAddReplyHandler() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CommentAddReplyHandler);

      this.init();
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CommentAddReplyHandler, [{
      key: "init",
      value: function init() {
        $(document).on('submit', '.directorist-review-container #commentform', this.onSubmit);
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(event) {
        event.preventDefault();
        var form = $('.directorist-review-container #commentform');
        var originalButtonLabel = form.find('[type="submit"]').val();
        $(document).trigger('directorist_review_before_submit', form);
        var do_comment = $.ajax({
          url: form.attr('action'),
          type: 'POST',
          contentType: false,
          cache: false,
          processData: false,
          data: new FormData(form[0])
        });
        $('#comment').prop('disabled', true);
        form.find('[type="submit"]').prop('disabled', true).val('loading');
        do_comment.success(function (data, status, request) {
          var body = $('<div></div>');
          body.append(data);
          var comment_section = '.directorist-review-container';
          var comments = body.find(comment_section);
          var errorMsg = body.find('.wp-die-message');

          if (errorMsg.length > 0) {
            CommentAddReplyHandler.showError(form, errorMsg);
            $(document).trigger('directorist_review_update_failed');
            return;
          }

          $(comment_section).replaceWith(comments);
          $(document).trigger('directorist_review_updated', data);
          var newComment = comments.find('.commentlist li:first-child');
          var newCommentId = newComment.attr('id'); // // catch the new comment id by comparing to old dom.
          // commentsLists.each(
          //     function ( index ) {
          //         var _this = $( commentsLists[ index ] );
          //         if ( $( '#' + _this.attr( 'id' ) ).length == 0 ) {
          //             newCommentId = _this.attr( 'id' );
          //         }
          //     }
          // );
          // console.log(newComment, newCommentId)

          var commentTop = $("#" + newCommentId).offset().top;

          if ($('body').hasClass('admin-bar')) {
            commentTop = commentTop - $('#wpadminbar').height();
          } // scroll to comment


          if (newCommentId) {
            $("body, html").animate({
              scrollTop: commentTop
            }, 600);
          }
        });
        do_comment.fail(function (data) {
          var body = $('<div></div>');
          body.append(data.responseText);
          CommentAddReplyHandler.showError(form, body.find('.wp-die-message'));
          $(document).trigger('directorist_review_update_failed');
        });
        do_comment.always(function () {
          $('#comment').prop('disabled', false);
          $('#commentform').find('[type="submit"]').prop('disabled', false).val(originalButtonLabel);
        });
        $(document).trigger('directorist_review_after_submit', form);
      }
    }], [{
      key: "getErrorMsg",
      value: function getErrorMsg($dom) {
        if ($dom.find('p').length) {
          $dom = $dom.find('p');
        }

        var words = $dom.text().split(':');

        if (words.length > 1) {
          words.shift();
        }

        return words.join(' ').trim();
      }
    }, {
      key: "showError",
      value: function showError(form, $dom) {
        if (form.find('.directorist-alert').length) {
          form.find('.directorist-alert').remove();
        }

        var $error = $('<div />', {
          class: 'directorist-alert directorist-alert-danger'
        }).html(CommentAddReplyHandler.getErrorMsg($dom));
        form.prepend($error);
      }
    }]);

    return CommentAddReplyHandler;
  }();

  var CommentsManager = /*#__PURE__*/function () {
    function CommentsManager() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CommentsManager);

      this.$doc = $(document);
      this.setupComponents();
      this.addEventListeners();
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CommentsManager, [{
      key: "initStarRating",
      value: function initStarRating() {
        $('.directorist-stars, .directorist-review-criteria-select').barrating({
          theme: 'fontawesome-stars'
        });
      }
    }, {
      key: "cancelOthersEditMode",
      value: function cancelOthersEditMode(currentCommentId) {
        $('.directorist-comment-editing').each(function (index, comment) {
          var $cancelButton = $(comment).find('.directorist-js-cancel-comment-edit');

          if ($cancelButton.data('commentid') != currentCommentId) {
            $cancelButton.click();
          }
        });
      }
    }, {
      key: "cancelReplyMode",
      value: function cancelReplyMode() {
        var replyLink = document.querySelector('.directorist-review-content #cancel-comment-reply-link');
        replyLink && replyLink.click();
      }
    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this2 = this;

        var self = this;
        this.$doc.on('directorist_review_updated', function (event) {
          _this2.initStarRating();
        });
        this.$doc.on('directorist_comment_edit_form_loaded', function (event) {
          _this2.initStarRating();
        });
        this.$doc.on('click', 'a[href="#respond"]', function (event) {
          // First cancle the reply form then scroll to review form. Order matters.
          _this2.cancelReplyMode();

          _this2.onWriteReivewClick(event);
        });
        this.$doc.on('click', '.directorist-js-edit-comment', function (event) {
          event.preventDefault();
          var $target = $(event.target);
          var $wrap = $target.parents('#div-comment-' + $target.data('commentid'));
          $wrap.addClass('directorist-comment-edit-request');
          $.ajax({
            url: $target.attr('href'),
            data: {
              post_id: $target.data('postid'),
              comment_id: $target.data('commentid')
            },
            setContent: false,
            method: 'GET',
            reload: 'strict',
            success: function success(response) {
              $target.parents('#div-comment-' + $target.data('commentid')).find('.directorist-review-single__contents-wrap').append(response.data.html);
              $wrap.removeClass('directorist-comment-edit-request').addClass('directorist-comment-editing');
              self.cancelOthersEditMode($target.data('commentid'));
              self.cancelReplyMode();
              var $editForm = $('#directorist-form-comment-edit');
              $editForm.find('textarea').focus();
              self.$doc.trigger('directorist_comment_edit_form_loaded', $target.data('commentid'));
            }
          });
        });
        this.$doc.on('click', '.directorist-js-cancel-comment-edit', function (event) {
          event.preventDefault();
          var $target = $(event.target);
          var $wrap = $target.parents('#div-comment-' + $target.data('commentid'));
          $wrap.removeClass(['directorist-comment-edit-request', 'directorist-comment-editing']).find('form').remove();
        });
      }
    }, {
      key: "onWriteReivewClick",
      value: function onWriteReivewClick(event) {
        event.preventDefault();
        var scrollTop = $('#respond').offset().top;

        if ($('body').hasClass('admin-bar')) {
          scrollTop = scrollTop - $('#wpadminbar').height();
        }

        $('body, html').animate({
          scrollTop: scrollTop
        }, 600);
      }
    }, {
      key: "setupComponents",
      value: function setupComponents() {
        new ReplyFormObserver();
        new CommentAddReplyHandler();
        new CommentEditHandler();
      }
    }]);

    return CommentsManager;
  }();

  var commentsManager = new CommentsManager();
})(jQuery);

/***/ }),

/***/ "./assets/src/js/public/components/review/starRating.js":
/*!**************************************************************!*\
  !*** ./assets/src/js/public/components/review/starRating.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function ($) {
  //Star rating
  if ($('.directorist-stars').length) {
    $(".directorist-stars").barrating({
      theme: 'fontawesome-stars'
    });
  }

  if ($('.directorist-review-criteria-select').length) {
    $('.directorist-review-criteria-select').barrating({
      theme: 'fontawesome-stars'
    });
  }
})(jQuery);

/***/ }),

/***/ "./assets/src/js/public/components/single-listing-page/slider.js":
/*!***********************************************************************!*\
  !*** ./assets/src/js/public/components/single-listing-page/slider.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Plasma Slider Initialization 
var single_listing_slider = new PlasmaSlider({
  containerID: "directorist-single-listing-slider"
});
single_listing_slider.init();

/***/ }),

/***/ "./assets/src/js/public/modules/single-listing.js":
/*!********************************************************!*\
  !*** ./assets/src/js/public/modules/single-listing.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_single_listing_page_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/single-listing-page/slider */ "./assets/src/js/public/components/single-listing-page/slider.js");
/* harmony import */ var _components_single_listing_page_slider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_single_listing_page_slider__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_review__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/review */ "./assets/src/js/public/components/review.js");
/* harmony import */ var _components_atbdAlert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/atbdAlert */ "./assets/src/js/public/components/atbdAlert.js");
/* harmony import */ var _components_atbdAlert__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_atbdAlert__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_formValidation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/formValidation */ "./assets/src/js/public/components/formValidation.js");
/* harmony import */ var _components_formValidation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_formValidation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_atbdFavourite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/atbdFavourite */ "./assets/src/js/public/components/atbdFavourite.js");
/* harmony import */ var _components_atbdFavourite__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_atbdFavourite__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_atbdDropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/atbdDropdown */ "./assets/src/js/public/components/atbdDropdown.js");
/* harmony import */ var _components_atbdDropdown__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_atbdDropdown__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_atbdSelect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/atbdSelect */ "./assets/src/js/public/components/atbdSelect.js");
/* harmony import */ var _components_atbdSelect__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_atbdSelect__WEBPACK_IMPORTED_MODULE_6__);
// Single Listing Page
 // General Components








/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 12:
/*!**************************************************************!*\
  !*** multi ./assets/src/js/public/modules/single-listing.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/src/js/public/modules/single-listing.js */"./assets/src/js/public/modules/single-listing.js");


/***/ })

/******/ });
//# sourceMappingURL=single-listing.js.map