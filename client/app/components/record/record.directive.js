import './record.styl';
import template from './record.html';
import {RecordController as controller} from './record.controller.js';

export const recordDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
