import {record} from './record';
import {recordDirective} from './record.directive.js';
import template from './record.html';
import {RecordController} from './record.controller.js';

describe('record', () => {
  let $rootScope;
  let makeController;

  beforeEach(window.module(blog.name));
  beforeEach(inject(_$rootScope_ => {
    $rootScope = _$rootScope_;
    makeController = (injectables) => {
      return new BlogController(injectables);
    };
  }))

  describe('module', () => {
    it('should have an appropriate name', () => {
      console.log('blog.name' + record.name);
      console.log('JSON.stringify(blog)' + JSON.stringify(record));
      console.log('JSON.stringify(blog,2)' + JSON.stringify(record, 2));
      expect(record.name).to.equal('blog');
    });
  });

  describe('directive', ()=> {
    let ddo;
    beforeEach(() => {
      ddo = blogDirective();
    });

    it('should have the right template', () => {
      expect(ddo.template).to.equal(template);
    });

    it('should have the right controller', () => {
      expect(ddo.controller).to.equal(RecordController);
    });

    it('should have an isolate scope', () => {
      expect(ddo.scope).to.be.an('object');
    });

    it('should use controllerAs', () => {
      expect(ddo.controllerAs).to.be.a('string');
    });
  });

  describe('controller', ()=> {
    it('should have blog posts', ()=> {
      const controller = makeController();
      expect(controller.posts).to.be.an('array');
      expect(controller.posts[0]).to.have.property('author');
      expect(controller.posts[0]).to.have.property('title');
    });
  });

  describe('template', ()=> {

  });
});
