import ValidatorRules from "../validator-rules";
import {ValidationError} from "../../errors/validation-error";

type Values = {
  value: any,
  property: string
}

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[]
}

function assertIsInvalid(expectedRule: ExpectedRule): void {
  expect(() => {
    runRule(expectedRule)
  }).toThrow(expectedRule.error);
}

function assertIsValid(expectedRule: ExpectedRule): void {
  expect(() => {
    runRule(expectedRule)
  }).not.toThrow(expectedRule.error);
}

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule];
  // @ts-ignore
  method.apply(validator, params);
}

describe('ValidatorRules unit test', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test('string validation rule', () => {
    //invalid cases
    let arrange: Values[] = [
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
      {value: "", property: 'field'},
    ];

    arrange.forEach((item) => {
      assertIsInvalid({value: item.value,
        property: item.property, rule: 'required', error: new ValidationError('The field is required')})
    });

    //true cases
    arrange = [
      {value: 5, property: 'field'},
      {value: 0, property: 'field'},
      {value: false, property: 'field'},
    ];
    arrange.forEach((item) => {
      assertIsValid({value: item.value,
        property: item.property, rule: 'required', error: new ValidationError('The field is required')})
    });

  });

  test('reqiored validation rule', () => {
    let arrange: Values[] = [
      {value: 5, property: 'field'},
      {value: {}, property: 'field'},
      {value: false, property: 'field'},
    ];
    const error = new ValidationError('The field must be string');

    arrange.forEach((item) => {
      assertIsInvalid({value: item.value,
        property: item.property, rule: 'string', error})
    });

    //true cases
    arrange = [
      {value: "teste", property: 'field'},
    ];
    arrange.forEach((item) => {
      assertIsValid({value: item.value,
        property: item.property, rule: 'string', error})
    });
  });

  test('string validation rule', () => {
    //invalid cases
    let arrange: Values[] = [
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
      {value: "", property: 'field'},
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
    ];

    arrange.forEach((item) => {
      assertIsInvalid({value: item.value,
        property: item.property, rule: 'required', error: new ValidationError('The field is required')})
    });

    //true cases
    arrange = [
      {value: 5, property: 'field'},
      {value: 0, property: 'field'},
      {value: false, property: 'field'},
    ];
    arrange.forEach((item) => {
      assertIsValid({value: item.value,
        property: item.property, rule: 'required', error: new ValidationError('The field is required')})
    });

  });

  test('maxLength validation rule', () => {
    let arrange: Values[] = [
      {value: "aaaaaa", property: 'field'},
    ];
    const error = new ValidationError('The field must be less or equal than 5 characters');

    arrange.forEach((item) => {
      assertIsInvalid({value: item.value,
        property: item.property, rule: 'maxLength', error, params: [5]})
    });

    //true cases
    arrange = [
      {value: "testes", property: 'field'},
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
    ];
    arrange.forEach((item) => {
      assertIsValid({value: item.value,
        property: item.property, rule: 'maxLength', error, params: [6]})
    });
  });

  test('boolean validation rule', () => {
    let arrange: Values[] = [
      {value: 5, property: 'field'},
      {value: "true", property: 'field'},
      {value: "false", property: 'field'}
    ];
    const error = new ValidationError('The field must be a boolean');

    arrange.forEach((item) => {
      assertIsInvalid({value: item.value,
        property: item.property, rule: 'boolean', error})
    });

    //true cases
    arrange = [
      {value: true, property: 'field'},
      {value: false, property: 'field'},
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
    ];
    arrange.forEach((item) => {
      assertIsValid({value: item.value,
        property: item.property, rule: 'boolean', error})
    });
  });

  it('should throw a validation error when combine two or more rules', () => {
    let validator = ValidatorRules.values(null, 'field');
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field is required")
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field must be string")
    );

    validator = ValidatorRules.values("123456", "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field must be less or equal than 5 characters")
    );

    validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().boolean().string()).toThrow(
      new ValidationError("The field is required")
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError("The field must be a boolean")
    );

  })
  it('should valid when combine two or more rules', () => {
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().string();
    ValidatorRules.values("aaaaa", "field").required().string().maxLength(5);

    ValidatorRules.values(true, "field").boolean();
    ValidatorRules.values(false, "field").boolean();
  })

})