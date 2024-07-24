import {
  _typeof,
  init_typeof
} from "./chunk-C4PD6YIN.js";
import {
  __esm
} from "./chunk-PLDDJCW6.js";

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var init_toPrimitive = __esm({
  "node_modules/@babel/runtime/helpers/esm/toPrimitive.js"() {
    init_typeof();
  }
});

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
var init_toPropertyKey = __esm({
  "node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"() {
    init_typeof();
    init_toPrimitive();
  }
});

export {
  toPropertyKey,
  init_toPropertyKey
};
//# sourceMappingURL=chunk-HHAEQBRR.js.map