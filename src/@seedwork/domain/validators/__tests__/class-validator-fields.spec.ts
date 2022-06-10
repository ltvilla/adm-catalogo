import ClassValidatorFields from "../class-validator-fields";
import * as libClassValidator from 'class-validator';

class StubClassValidator extends ClassValidatorFields<{field: string}> {

}

describe('ClassValidator', () => {
  it('should initialize errors and validateData variables with null', () => {
    const validator = new StubClassValidator();
    expect(validator.errors).toBeNull();
    expect(validator.validateData).toBeNull();
  });

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      {property: 'field', constraints: {isRequired: 'some error'}}
    ]);
    const validator = new StubClassValidator();
    expect(validator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validateData).toBeNull();
    expect(validator.errors).toStrictEqual({field: ["some error"]});
  });

  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const validator = new StubClassValidator();
    expect(validator.validate({field: 'some value'})).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validateData).toStrictEqual({field: 'some value'});
    expect(validator.errors).toBeNull();
  });
})