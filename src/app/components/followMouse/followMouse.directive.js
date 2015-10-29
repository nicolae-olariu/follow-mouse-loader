(function() {
  'use strict';

  angular
    .module('followMouseLoader')
    .directive('followMouse', followMouse);

  /** @ngInject */
  function followMouse() {
    return {
      link: function(scope, elem, attrs) {
        /*------------------------------------------------------------------
        Properties
        ------------------------------------------------------------------*/

        var cssClass = attrs.listenForThisCssClassOnIt,
          selector = attrs.listenForThisSelector,
          observedElement = angular.element(selector),
          element = angular.element(elem).find('.follow-mouse-container'),
          eventNamespace = 'follow-mouse';

        /*------------------------------------------------------------------
        Methods
        ------------------------------------------------------------------*/

        var mouseMoveEvent = function(e) {
          if (!element.hasClass('show-me')) {
            element.addClass('show-me');
          }

          // Update loader's position.
          element
              .css({
                'left': e.clientX - element.outerHeight(true),
                'top': e.clientY + element.outerHeight(true)
              });
        },
        bindMouseMove = function() {
          // Bind mousemove with a custom namespace.
          angular.element('html').on('mousemove' + '.' + eventNamespace, mouseMoveEvent);
        },
        unbindMouseMove = function() {
          // Let's also hide the loader.
          element.removeClass('show-me');

          // Let's unbind mousemove within specific namespace.
          angular.element('html').off('mousemove' + '.' + eventNamespace);
        };

        if ('MutationObserver' in window && observedElement.length) {
          var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                // Class changed ?
                if (mutation.attributeName === 'class') {
                  var isOurCssClassPresent = mutation.target.classList.contains(cssClass);

                  isOurCssClassPresent ? bindMouseMove() : unbindMouseMove();
                }
              });
            });

          observer.observe(observedElement[0], { attributes: true, childList: true, characterData: true });
        }
      },
      templateUrl: 'app/components/followMouse/followMouse.html'
    }
  }

})();