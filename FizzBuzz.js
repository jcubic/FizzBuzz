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
DECREMENT = n => f => x => n(g => h => h(g(f))(y => x)(y => y))
function to_integer(proc) {
    return proc(n => n+1)(0)
}
function to_boolean(proc) {
  return IF(proc)(true)(false)
}
[ZERO, ONE, TWO, INCREMENT(THREE), DECREMENT(HUNDRED)].forEach(function(num) {
    console.log(to_integer(num))
});
console.log(to_boolean(TRUE));
console.log(to_boolean(FALSE));
console.log(IF(TRUE)("foo")("bar"));
console.log(IF(FALSE)("foo")("bar"));
console.log('0 ' + to_boolean(IS_ZERO(ZERO)));
console.log('3 ' + to_boolean(IS_ZERO(THREE)));
function numeral(num) {
    if (num == 0) {
        return "x";
    } else {
        return "p(" + numeral(num-1) + ")";
    }
}

