

function to_integer(proc) {
    return proc(n => n+1)(0);
}
function to_array(proc) {
  var array = [];
  while (!to_boolean(IS_EMPTY(proc))) {
    var item = FIRST(proc);
    if (typeof item == 'function') {
        item = to_integer(item);
    }
    array.push(item);
    proc = REST(proc);
  }

  return array;
}
function to_boolean(proc) {
  return IF(proc)(true)(false)
}

var church_numeral = (function() {
    function numeral(num) {
        if (num == 0) {
            return "x";
        } else {
            return "p(" + numeral(num-1) + ")";
        }
    }
    return function(num) {
        return eval("p=>x=>" + numeral(num));
    };
})();
function to_list(array) {
    if (!array.length) {
        return EMPTY;
    } else {
        return PAIR(FALSE)(PAIR(array[0])(to_list(array.slice(1))));
    }
}
function to_char(c) {
    if (typeof c == 'function') { // to_array convert numerals to integers
        c = to_integer(c);
    }
    return '0123456789BFiuz'.slice(c)[0];
}
function to_string(s) {
    return to_array(s).map(to_char).join('');
}

module.exports = {
    church_numeral: church_numeral,
    to_integer: to_integer,
    to_boolean: to_boolean,
    to_array: to_array,
    to_list: to_list,
    to_char: to_char,
    to_string: to_string
}
