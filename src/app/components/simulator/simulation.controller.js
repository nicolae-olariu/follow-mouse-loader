(function() {
  'use strict';

  angular
    .module('followMouseLoader')
    .controller('SimulationController', simulationCtrl);

  /** @ngInject */
  function simulationCtrl($log, $timeout, $interval) {
    var vm = this;

    vm.simulateLoad = function() {
      var showTime = 1000,
        hideTime = 3000,
        showTPromise = $timeout(function() { angular.element('.test').addClass('loading'); $timeout.cancel(showTPromise); showTPromise = null; }, showTime),
        hideTPromise =  $timeout(function() { angular.element('.test').removeClass('loading'); $timeout.cancel(hideTPromise); hideTPromise = null; }, hideTime),
        x;

      $interval(function() {
        (function() {
          x = showTime / 1000;

          vm.dueTime = x - 1;
        })();

      }, 1000, (showTime + 1) / 1000);
    };
  }
})();