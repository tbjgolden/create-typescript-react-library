import csso from 'csso';
import csstree from 'css-tree';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var normalize = function normalize(css) {
  var minifiedCSS = csso.minify(css).css;
  var list = [];
  var ast = csstree.toPlainObject(csstree.parse(minifiedCSS));
  normalizeBlock(ast, function (path) {
    list.push(path);
  }, []);
  return list.map(function (path) {
    return [path, JSON.stringify(path)];
  }).sort(function (_a, _b) {
    var _c = __read(_a, 2),
        jsonPathA = _c[1];

    var _d = __read(_b, 2),
        jsonPathB = _d[1];

    return jsonPathA > jsonPathB ? 1 : -1;
  }).map(function (_a) {
    var _b = __read(_a, 1),
        path = _b[0];

    return path;
  });
};
var compare = function compare(a, b) {
  var normalizedA = normalize(a);
  var normalizedB = normalize(b);

  if (JSON.stringify(normalizedA) === JSON.stringify(normalizedB)) {
    return [[], []];
  } else {
    var aPaths_1 = new Map();
    var missingInA_1 = new Set();
    var missingInB_1 = new Set();
    normalizedA.forEach(function (path) {
      aPaths_1.set(JSON.stringify(path), false);
    });
    normalizedB.forEach(function (path) {
      var jsonPath = JSON.stringify(path);

      if (aPaths_1.has(jsonPath)) {
        aPaths_1.set(jsonPath, true);
      } else {
        missingInA_1.add(jsonPath);
      }
    });
    aPaths_1.forEach(function (value, key) {
      if (value === false) {
        missingInB_1.add(key);
      }
    });
    return [__spread(missingInA_1.values()).map(function (value) {
      return JSON.parse(value);
    }), __spread(missingInB_1.values()).map(function (value) {
      return JSON.parse(value);
    })];
  }
};
var areEqual = function areEqual(a, b) {
  var pair = compare(a, b);
  return pair[0].length + pair[1].length === 0;
};
var isSubsetOf = function isSubsetOf(sub, sup) {
  return compare(sup, sub)[0].length === 0;
};

var normalizeBlock = function normalizeBlock(node, addPath, path) {
  return node.children.map(function (child) {
    if (child.type === 'Atrule') {
      var atruleprelude = "@" + child.name;

      if (child.prelude !== null) {
        atruleprelude += " " + csstree.generate(child.prelude);
      }

      if (child.block === null) {
        addPath(__spread(path, [atruleprelude]));
      } else {
        normalizeBlock(child.block, addPath, __spread(path, [atruleprelude]));
      }
    } else if (child.type === 'Rule') {
      if ('children' in child.prelude) {
        var selectors = child.prelude.children.filter(function (child) {
          return child.type === 'Selector';
        }).map(function (selector) {
          return csstree.generate(selector);
        });
        selectors.map(function (selector) {
          normalizeBlock(child.block, addPath, __spread(path, [selector]));
        });
      }
    } else if (child.type === 'Declaration') {
      addPath(__spread(path, [child.property, csstree.generate(child.value)]));
    }
  }).filter(Boolean);
};

export { areEqual, compare, isSubsetOf, normalize };
//# sourceMappingURL=compare-stylesheet.esm.js.map
