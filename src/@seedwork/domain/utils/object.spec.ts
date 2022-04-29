import {deepFreeze} from "./object";

describe('Object Unit Tests', () => {
  it('should not freeze a scalar value', () => {
    const str = deepFreeze('a');
    expect(typeof str).toBe('string');

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean');

    boolean = deepFreeze(false);
    expect(typeof boolean).toBe('boolean');

    let number = deepFreeze(5);
    expect(typeof number).toBe('number');
  })

  it('should be a immutable obj',  () => {
    const obj = deepFreeze({ prop1: "value", deep: { prop2: "value2", prop3: new Date() }});

    expect(() => {
      (obj as any).prop1 = "aaaa";
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")

    expect(() => {
      (obj as any).deep.prop2 = "aaaa";
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
})