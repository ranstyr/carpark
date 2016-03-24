import {blogDirective} from './blog.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

export const blog = angular.module('blog', [uiRouter])
  .config(function($stateProvider) {
    $stateProvider.state('blog1', {
      url: '/blog',
      template: '<blog></blog>'
    });
  })
  .directive('blog', blogDirective);
