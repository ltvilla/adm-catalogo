import ClassValidatorFields from "../validators/class-validator-fields";
import {FieldsErrors} from "../validators/validator-fields-interface";
import {objectContaining} from "expect";
import {EntityValidationError} from "../errors/validation-error";

type Expected = { validator: ClassValidatorFields<any>, data: any } | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors){
    if (typeof expected === "function") {
      try {
        expected()
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError
        return assertContainsErrors(error.error, received);
      }

    } else {
      const {validator, data} = expected;
      const validated = validator.validate(expected.data);

      if (validated) {
        return isValid()
      }
      return assertContainsErrors(validator.errors, received);
    }
  }
});

function isValid() {
  return {
    pass: false,
    message: () => 'The data is valid'
  }
}

function assertContainsErrors(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = objectContaining(received).asymmetricMatch(expected);
  return isMatch ?
    {pass: true, message: () => ""} :
    { pass: false, message: () => `The validation error not contains ${JSON.stringify(received)} Current: ${JSON.stringify(expected)}` };
}
