const { test: describe } = require('tap');
const jp = require('jsonpath');
const jsPointer = require('json-pointer');
const jpoJpa = require('../index');
const testObject = require('./fixtures/rfc6901-test-object.json');
const testCases = require('./fixtures/rfc6901-test-cases.json');

describe('normal cases', t => {
  t.plan(4);

  t.test('it should return "$." for empty json pointer', expect => {
    expect.plan(1);
    const jsonPointer = '';
    const expected = '$';

    expect.equal(jpoJpa(jsonPointer), expected);
  });

  t.test('it should throw an error for an invalid json path', expect => {
    expect.plan(1);
    const jsonPointer = 'prop/childProp';
    const expected = new Error(`Invalid JSON pointer: ${jsonPointer}`);

    expect.throws(() => jpoJpa(jsonPointer), expected);
  });

  t.test('it should convert a simple json pointer to json path', expect => {
    expect.plan(1);
    const jsonPointer = '/prop/childProp';
    const expected = '$.prop.childProp';

    expect.equal(jpoJpa(jsonPointer), expected);
  });

  t.test('it should convert a json pointer with array index to json path', expect => {
    expect.plan(1);
    const jsonPointer = '/prop/1/childProp';
    const expected = '$.prop.1.childProp';

    expect.equal(jpoJpa(jsonPointer), expected);
  });
});

describe('escaped json pointers', t => {
  t.plan(2);

  t.test(
    'it should convert a json pointer with a property access with special characters',
    expect => {
      expect.plan(1);
      const jsonPointer = '/k"l/1/childProp';
      const expected = `$['k"l'].1.childProp`;

      expect.equal(jpoJpa(jsonPointer), expected);
    }
  );

  t.test('it should convert a json pointer with a property access with dot on it', expect => {
    expect.plan(1);
    const jsonPointer = '/k"l./1/childProp';
    const expected = `$['k"l.'].1.childProp`;

    expect.equal(jpoJpa(jsonPointer), expected);
  });
});

describe('escaped json pointers', t => {
  t.plan(Object.keys(testCases).length);

  Object.entries(testCases).forEach(([jsonPointer, jsonPath]) => {
    t.test(`it should convert json pointer '${jsonPointer}' to json path`, expect => {
      expect.plan(2);
      const actual = jpoJpa(jsonPointer);
      expect.equal(actual, jsonPath);
      expect.equal(jp.query(testObject, actual)[0], jsPointer.get(testObject, jsonPointer));
    });
  });
});
