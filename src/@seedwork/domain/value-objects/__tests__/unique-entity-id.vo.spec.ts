import UniqueEntityId from "../unique-entity-id.vo";
import InvalidUuidError from "../../errors/invalid-uuid.error";
import {validate as uuidValidate} from "uuid";

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
// }

describe("UniqueEntityid Unit Tests", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  // beforeEach(() => {
  //   validateSpy.mockClear();
  // });

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('fake-id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const uuid = 'a1cb4bf9-3ac0-4445-a769-c5260569e761';
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const vo = new UniqueEntityId(  );
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});