//---------//
// Imports //
//---------//

import {
  both, complement, curry, converge, head, identical, identity, is, keys, pipe
  , type
} from 'ramda';


//------//
// Init //
//------//

const get = createGet()
  , hasKey = createHasKey()
  , size = createSize()
  , toBoolean = createToBoolean()
  , isLaden = createIsLaden()
  ;

const equalsSelfAfter = curry((fn, obj) => converge(identical, [fn, identity])(obj))
  , invoke = curry(
    (key, obj) => is(Function, get(key, obj))
      ? obj[key]()
      : undefined
  )
  , notEqualsSelfAfter = complement(equalsSelfAfter)
  ;


//------//
// Main //
//------//

const charIsUppercase = both(
  equalsSelfAfter(invoke('toUpperCase'))
  , notEqualsSelfAfter(invoke('toLowerCase'))
);

const isDefined = val => typeof val !== 'undefined';

const isEmpty = complement(isLaden);

const isString = pipe(type, identical('String'));

const isUndefined = complement(isDefined);

const startsWithUppercase = pipe(head, charIsUppercase);



//-------------//
// Helper Fxns //
//-------------//

function createGet() {
  return curry(
    (key, obj) => hasKey(key, obj)
      ? obj[key]
      : undefined
  );
}

function createHasKey() {
  return curry(
    (key, obj) => isDefined(obj) && isDefined(obj[key])
  );
}

function createIsLaden() {
  return pipe(size, toBoolean);
}

function createSize() {
  return val => {
    switch (type(val)) {
      case 'Object':
        return hasKey('length', val)
          ? val.length
          : keys(val).length;
      case 'Array':
      case 'String':
        return val.length;
      case 'Null':
      case 'Undefined':
        return false;
      default:
        throw new Error("Invalid Input: size requires r->type of Object, Array, String, Null, or Undefined"
          + "\n  r->type of val: " + type(val)
        );
    }
  };
}

function createToBoolean() {
  return val => !!val;
}


//---------//
// Exports //
//---------//

export {
  charIsUppercase, isDefined, isEmpty, isLaden, isString, startsWithUppercase
  , isUndefined
};
