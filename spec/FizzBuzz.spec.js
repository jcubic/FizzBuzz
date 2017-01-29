require('../FizzBuzz');

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

describe('FizzBuzz', function() {
    describe('test numeral function', function() {
        it('should create proper church numeral', function() {
            for (var i=0; i<200; i++) {
                var numeral = church_numeral(i);
                expect(numeral).toBeDefined();
                expect(typeof numeral == 'function').toEqual(true);
                expect(to_integer(numeral)).toEqual(i);
            }
        });
    });
    describe('numerals', function() {
        it('should return number for church numerals', function() {
            var numerals = [
                {
                    numeral: ZERO,
                    value: 0
                },
                {
                    numeral: ONE,
                    value: 1
                },
                {
                    numeral: TWO,
                    value: 2
                },
                {
                    numeral: THREE,
                    value: 3
                },
                {
                    numeral: FIVE,
                    value: 5
                },
                {
                    numeral: FIFTEEN,
                    value: 15
                },
                {
                    numeral: HUNDRED,
                    value: 100
                }
            ];
            numerals.forEach(function(obj) {
                expect(to_integer(obj.numeral)).toEqual(obj.value);
            });
        });
    });
    describe('math operators', function() {
        describe('INCREMENT', function() {
            it('should increment church numberals', function() {
                expect(to_integer(INCREMENT(THREE))).toEqual(4);
                expect(to_integer(INCREMENT(HUNDRED))).toEqual(101);
            });
        });
        describe('DECREMENT', function() {
            it('should decrement church numbers', function() {
                expect(to_integer(DECREMENT(THREE))).toEqual(2);
                expect(to_integer(DECREMENT(HUNDRED))).toEqual(99);
            });
        });
        describe('ADD', function() {
            it('should add two church numerals', function() {
                expect(to_integer(ADD(ONE)(THREE))).toEqual(4);
                expect(to_integer(ADD(THREE)(THREE))).toEqual(6);
                expect(to_integer(ADD(HUNDRED)(HUNDRED))).toEqual(200);
            });
        });
        describe('SUBSTRACT', function() {
            it('should substruct two church numerals', function() {
                expect(to_integer(SUBTRACT(THREE)(ONE))).toEqual(2);
                expect(to_integer(SUBTRACT(HUNDRED)(HUNDRED))).toEqual(0);
                expect(to_integer(SUBTRACT(HUNDRED)(THREE))).toEqual(97);
            });
        });
        describe('MULTIPLY', function() {
            it('should multiply two church numerals', function() {
                expect(to_integer(MULTIPLY(THREE)(ONE))).toEqual(3);
                expect(to_integer(MULTIPLY(THREE)(THREE))).toEqual(9);
                expect(to_integer(MULTIPLY(HUNDRED)(THREE))).toEqual(300);
            });
        });
        describe('POWER', function() {
            it('should return power of the numer using church numerals', function() {
                for (var i=0; i<10; i++) {
                    var a = church_numeral(i);
                    for (var j=0; j<5; j++) {
                        var b = church_numeral(j);
                        expect(to_integer(POWER(a)(b))).toEqual(Math.pow(i, j));
                    }
                }
            });
        });
        describe('MOD', function() {
            var mod = church_numeral(10);
            it('should return modulo using church numerals', function() {
                for (var i=0; i<100; i++) {
                    var numeral = church_numeral(i);
                    expect(to_integer(MOD(numeral)(mod))).toEqual(i % 10);
                }
            });
        });
    });
    describe('booleans', function() {
        describe('TRUE/FALSE constants', function() {
            it('should return javascript boolean for church boolean', function() {
                expect(to_boolean(TRUE)).toEqual(true);
                expect(to_boolean(FALSE)).toEqual(false);
            });
        });
        describe('IF', function() {
            it('should return proper value based on condition', function() {
                expect(IF(TRUE)("foo")("bar")).toEqual("foo");
                expect(IF(FALSE)("foo")("bar")).toEqual("bar");
            });
        });
        describe('IS_ZERO', function() {
            it('should return true only for 0', function() {
                var array = [1, 4, 10, 100, 200, 4, 30];
                array.forEach(function(number) {
                    var numeral = church_numeral(number);
                    expect(to_boolean(IS_ZERO(numeral))).toEqual(false);
                });
                expect(to_boolean(IS_ZERO(ZERO))).toEqual(true);
            });
        });
        describe('IS_LESS_OR_EQUAL', function() {
            it('should return true', function() {
                var pairs = [[1,2], [10, 20], [0, 0], [10,10], [20, 100]];
                pairs.forEach(function(pair) {
                    var a = church_numeral(pair[0]);
                    var b = church_numeral(pair[1]);
                    expect(to_boolean(IS_LESS_OR_EQUAL(a)(b))).toEqual(true);
                });
            });
            it('should return false', function() {
                var pairs = [[2,1], [20, 10], [1, 0], [200, 100]];
                pairs.forEach(function(pair) {
                    var a = church_numeral(pair[0]);
                    var b = church_numeral(pair[1]);
                    expect(to_boolean(IS_LESS_OR_EQUAL(a)(b))).toEqual(false);
                });
            });
        });
    });
    describe('lists', function() {
        describe('pairs', function() {
            it('should create pairs', function() {
                var pair = PAIR(10)(20);
                expect(LEFT(pair)).toEqual(10);
                expect(RIGHT(pair)).toEqual(20);
            });
            it('should create list from pairs', function() {
                var list = PAIR(PAIR(PAIR(FALSE)(10))(20))(30);
                list = PAIR(FALSE)(PAIR(10)(PAIR(20)(PAIR(30))));
                list = PAIR(PAIR(PAIR(10)(FALSE))(20))(30);
                function to_list(array) {
                    if (!array.length) {
                        return EMPTY;
                    } else {
                        return PAIR(FALSE)(PAIR(array[0])(to_list(array.slice(1))));
                    }
                }
                expect(to_array(to_list([1,2,3,4]))).toEqual([1,2,3,4]);
            });
        });
        describe('UNSHIFT', function() {
            it('should create list that can be coverted to array', function() {
                var list = UNSHIFT(
                    UNSHIFT(
                        UNSHIFT(EMPTY)(THREE)
                    )(TWO)
                )(ONE);
                expect(to_array(list)).toEqual([1,2,3]);
            });
        });
        describe('RANGE', function() {
            function range(a, b) {
                var array = [];
                while (a <= b) {
                    array.push(a++);
                }
                return array;
            }
            it('should create ranges', function() {
                var pairs = [[1, 20], [10, 20], [30, 100], [10, 5], [0, 0]];
                pairs.forEach(function(pair) {
                    var a = church_numeral(pair[0]);
                    var b = church_numeral(pair[1]);
                    expect(to_array(RANGE(a)(b))).toEqual(range(pair[0], pair[1]));
                });
            });
        });
    });
});
