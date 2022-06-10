import CategoryValidatorFactory, {CategoryRules, CategoryValidator} from "./category.validator";

describe('CategoryValidator Tests', () => {
  let validator: CategoryValidator

  beforeEach(() => (validator = CategoryValidatorFactory.create()));

  test('invalidation cases for name field', () => {

    // let isValid = validator.validate(null);
    expect({validator, data: null}).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters"
      ]
    });

    expect({validator, data: {name: ""}}).containsErrorMessages({
      name: [
        "name should not be empty"
      ]
    });

    expect({validator, data: {name: 5 as any}}).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters"
      ]
    });

    expect({validator, data: {name: "t".repeat(256)}}).containsErrorMessages({
      name: [
        "name must be shorter than or equal to 255 characters"
      ]
    });
  });

  test('valid cases for fields', () => {
    const arrange = [
      {name: 'some value'},
      {name: 'some value', description: undefined as any},
      {name: 'some value', description: null as any},
      {name: 'some value', is_active: true},
      {name: 'some value', is_active: false},
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validateData).toStrictEqual(new CategoryRules(item));
    })
  });
})