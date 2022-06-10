import {Category} from "./category";
import {ValidationError} from "../../../@seedwork/domain/errors/validation-error";


describe('Category Integration Tests', () => {
  describe('create method', () => {
    it('should a invalid category using name property', () => {
      expect(() =>  new Category({name: null})).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() =>  new Category({name: ""})).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      });

      expect(() =>  new Category({name: 5 as any})).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() =>  new Category({name: "t".repeat(256)})).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      });
    });

    it('should a invalid category using description property', () => {
      expect(() =>  new Category({name: "Teste", description: 1 as any})).containsErrorMessages({
        description: [
          'description must be a string'
        ]
      });
    });

    it('should a invalid category using is_active property', () => {
      expect(() =>  new Category({name: "Teste", is_active: "string" as any})).containsErrorMessages({
        is_active: [
          'is_active must be a boolean value'
        ]
      });
    });

    it('should a valid category', () => {
      expect.assertions(0);
      new Category({name: "Movie"});
      new Category({name: "Movie", description: "some description"});
      new Category({name: "Movie", description: null});
    });
  });

  describe('update method', () => {
    const category = new Category({name: "Movie"});
    it('should a invalid category using name property', () => {
      expect(() =>  category.update(null, null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() =>  category.update("", null)).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      });

      expect(() =>  category.update("t".repeat(256), null)).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(() =>  category.update(1 as any, null)).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
    });

    it('should a invalid category using description property', () => {
      const category = new Category({name: "Movie"});
      expect(() => category.update(category.name, 1 as any)).containsErrorMessages({
        description: [
          'description must be a string'
        ]
      });
    });

    it('should a valid category', () => {
      expect.assertions(0);
      const category = new Category({name: "Movie"});
      category.update('name changed', null);
      category.update('name changed', 'some description');
    });
  })

})