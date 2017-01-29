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
