ZERO = p => x => x
ONE = p => x => p(x)
TWO = p => x => p(p(x))
THREE = p => x => p(p(p(x)))
FIVE = p => x => p(p(p(p(p(x)))))
FIFTEEN = p => x => p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(x)))))))))))))))
HUNDRED = p => x => p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(p(x))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
TRUE = x => y => x
FALSE = x => y => y
IF = b => b
IS_ZERO = n => n(x => FALSE)(TRUE)
INCREMENT = n => p => x => p(n(p)(x))
DECREMENT = n => f => x => n(g => h => h(g(f)))(y => x)(y => y)
ADD = m => n => n(INCREMENT)(m)
SUBTRACT = m => n => n(DECREMENT)(m)
MULTIPLY = m => n => n(ADD(m))(ZERO)
POWER = m => n => n(MULTIPLY(m))(ONE)
IS_LESS_OR_EQUAL = m => n => IS_ZERO(SUBTRACT(m)(n))
Z = f => (x => f(p => x(x)(p)))(x => f(p => x(x)(p)))
MOD = Z(f => m => n => IF(IS_LESS_OR_EQUAL(n)(m)(x => f(SUBTRACT(m)(n))(n)(x)))(m))
PAIR = x => y => f => f(x)(y)
LEFT = p => p(x => y => x)
RIGHT = p => p(x => y => y)
EMPTY = PAIR(TRUE)(TRUE)
UNSHIFT = l => x => PAIR(FALSE)(PAIR(x)(l))
IS_EMPTY = LEFT
FIRST = l => LEFT(RIGHT(l))
REST = l => RIGHT(RIGHT(l))
RANGE = Z(f => m => n => IF(IS_LESS_OR_EQUAL(m)(n))(x => UNSHIFT(f(INCREMENT(m))(n))(m)(x))(EMPTY))

console.log(to_array(RANGE(ZERO)(FIFTEEN)));
my_list = UNSHIFT(
       UNSHIFT(
         UNSHIFT(EMPTY)(THREE)
       )(TWO)
     )(ONE)
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
console.log(to_array(my_list));
function to_integer(proc) {
    return proc(n => n+1)(0)
}
function to_boolean(proc) {
  return IF(proc)(true)(false)
}
[
    ZERO,
    ONE,
    POWER(TWO)(THREE),
    INCREMENT(THREE),
    DECREMENT(HUNDRED)
].forEach(function(num) {
    console.log(to_integer(num));
});
var n = eval("p=>x=>" + numeral(4));
for (var i =0; i<10; i++) {
    var num = eval("p=>x=>" + numeral(i));
    console.log(to_integer(num) + ' ' + to_integer(MOD(num)(n)));
}
console.log(to_integer(MOD(
     POWER(THREE)(THREE)
   )(
     ADD(THREE)(TWO)
   )))
console.log(to_boolean(TRUE));
console.log(to_boolean(FALSE));
console.log(IF(TRUE)("foo")("bar"));
console.log(IF(FALSE)("foo")("bar"));
console.log('0 ' + to_boolean(IS_ZERO(ZERO)));
console.log('3 ' + to_boolean(IS_ZERO(THREE)));
console.log('2<=2 ', to_boolean(IS_LESS_OR_EQUAL(TWO)(TWO)));
console.log('1<=2 ', to_boolean(IS_LESS_OR_EQUAL(ONE)(TWO)));
console.log('3<=2 ', to_boolean(IS_LESS_OR_EQUAL(THREE)(TWO)));
function numeral(num) {
    if (num == 0) {
        return "x";
    } else {
        return "p(" + numeral(num-1) + ")";
    }
}

