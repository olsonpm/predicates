//---------//
// Imports //
//---------//

import chai from 'chai';
import * as p from '../index';
import r from 'ramda';


//------//
// Init //
//------//

const collectionTypeToEach = getCollectionTypeToEach()
  , each = r.curry(
    (fn, coll) => collectionTypeToEach[r.type(coll)](fn, coll)
  );

chai.should();


//------//
// Main //
//------//

suite('predicates', () => {
  test('charIsUppercase', withCases(
    p.charIsUppercase
    , {
      a: false
      , A: true
      , '1': false
    }
  ));
  test('isDefined', withCases(
    p.isDefined
    , new Map([
      [undefined, false]
      , ['', true]
    ])
  ));
  test('isUndefined', withCases(
    p.isUndefined
    , new Map([
      [undefined, true]
      , ['', false]
    ])
  ));
  test('isLaden', withCases(
    p.isLaden
    , new Map([
      ['', false]
      , [[], false]
      , [{}, false]
      , ['a', true]
      , [[1], true]
      , [{ a: 'something' }, true]
    ])
  ));
  test('isEmpty', withCases(
    p.isEmpty
    , new Map([
      ['', true]
      , [[], true]
      , [{}, true]
      , ['a', false]
      , [[1], false]
      , [{ a: 'something' }, false]
    ])
  ));
  test('isString', withCases(
    p.isString
    , new Map([
      ['', true]
      , [1, false]
    ])
  ));
  test('startsWithUppercase', withCases(
    p.startsWithUppercase
    , {
      '': false
      , '1': false
      , a: false
      , A: true
    }
  ));
});


//-------------//
// Helper Fxns //
//-------------//

function withCases(fn, valToExpected) {
  return () => each(
    (expected, val) => {
      fn(val).should.equal(expected);
    }
    , valToExpected
  );
}

function getCollectionTypeToEach() {
  return {
    Object: (fn, obj) => {
      Object.keys(obj).forEach(key => {
        fn(obj[key], key, obj);
      });
      return obj;
    }
    , Array: runForEach
    , Map: runForEach
  };
}

function runForEach(fn, forEachAble) {
  return forEachAble.forEach(fn);
}
