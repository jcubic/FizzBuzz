var FizzBuzz = require('../FizzBuzz');

var helpers = require('../helpers.js');


describe('FizzBuzz', function() {
    describe('FizzBuzz array', function() {
        it('should return array with correct FizzBuzz values', function() {
            var result = [ '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8',
                'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16',
                '17', 'Fizz', '19', 'Buzz', 'Fizz', '22', '23', 'Fizz', 'Buzz',
                '26', 'Fizz', '28', '29', 'FizzBuzz', '31', '32', 'Fizz', '34',
                'Buzz', 'Fizz', '37', '38', 'Fizz', 'Buzz', '41', 'Fizz', '43',
                '44', 'FizzBuzz', '46', '47', 'Fizz', '49', 'Buzz', 'Fizz',
                '52', '53', 'Fizz', 'Buzz', '56', 'Fizz', '58', '59',
                'FizzBuzz', '61', '62', 'Fizz', '64', 'Buzz', 'Fizz', '67',
                '68', 'Fizz', 'Buzz', '71', 'Fizz', '73', '74', 'FizzBuzz',
                '76', '77', 'Fizz', '79', 'Buzz', 'Fizz', '82', '83', 'Fizz',
                'Buzz', '86', 'Fizz', '88', '89', 'FizzBuzz', '91', '92',
                'Fizz', '94', 'Buzz', 'Fizz', '97', '98', 'Fizz', 'Buzz'];
            expect(helpers.to_array(FizzBuzz).map(helpers.to_string)).toEqual(result);

        });
    });
    describe('test numeral function', function() {
        it('should create proper church numeral', function() {
            for (var i=0; i<200; i++) {
                var numeral = helpers.church_numeral(i);
                expect(numeral).toBeDefined();
                expect(typeof numeral == 'function').toEqual(true);
                expect(helpers.to_integer(numeral)).toEqual(i);
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
                expect(helpers.to_integer(obj.numeral)).toEqual(obj.value);
            });
        });
    });
    describe('math operators', function() {
        describe('INCREMENT', function() {
            it('should increment church numberals', function() {
                expect(helpers.to_integer(INCREMENT(THREE))).toEqual(4);
                expect(helpers.to_integer(INCREMENT(HUNDRED))).toEqual(101);
            });
        });
        describe('DECREMENT', function() {
            it('should decrement church numbers', function() {
                expect(helpers.to_integer(DECREMENT(THREE))).toEqual(2);
                expect(helpers.to_integer(DECREMENT(HUNDRED))).toEqual(99);
            });
        });
        describe('ADD', function() {
            it('should add two church numerals', function() {
                expect(helpers.to_integer(ADD(ONE)(THREE))).toEqual(4);
                expect(helpers.to_integer(ADD(THREE)(THREE))).toEqual(6);
                expect(helpers.to_integer(ADD(HUNDRED)(HUNDRED))).toEqual(200);
            });
        });
        describe('SUBSTRACT', function() {
            it('should substruct two church numerals', function() {
                expect(helpers.to_integer(SUBTRACT(THREE)(ONE))).toEqual(2);
                expect(helpers.to_integer(SUBTRACT(HUNDRED)(HUNDRED))).toEqual(0);
                expect(helpers.to_integer(SUBTRACT(HUNDRED)(THREE))).toEqual(97);
            });
        });
        describe('MULTIPLY', function() {
            it('should multiply two church numerals', function() {
                expect(helpers.to_integer(MULTIPLY(THREE)(ONE))).toEqual(3);
                expect(helpers.to_integer(MULTIPLY(THREE)(THREE))).toEqual(9);
                expect(helpers.to_integer(MULTIPLY(HUNDRED)(THREE))).toEqual(300);
            });
        });
        describe('POWER', function() {
            it('should return power of the numer using church numerals', function() {
                for (var i=0; i<10; i++) {
                    var a = helpers.church_numeral(i);
                    for (var j=0; j<5; j++) {
                        var b = helpers.church_numeral(j);
                        expect(helpers.to_integer(POWER(a)(b))).toEqual(Math.pow(i, j));
                    }
                }
            });
        });
        describe('MOD', function() {
            var mod = helpers.church_numeral(10);
            it('should return modulo using church numerals', function() {
                for (var i=0; i<100; i++) {
                    var numeral = helpers.church_numeral(i);
                    expect(helpers.to_integer(MOD(numeral)(mod))).toEqual(i % 10);
                }
            });
        });
    });
    describe('booleans', function() {
        describe('TRUE/FALSE constants', function() {
            it('should return javascript boolean for church boolean', function() {
                expect(helpers.to_boolean(TRUE)).toEqual(true);
                expect(helpers.to_boolean(FALSE)).toEqual(false);
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
                    var numeral = helpers.church_numeral(number);
                    expect(helpers.to_boolean(IS_ZERO(numeral))).toEqual(false);
                });
                expect(helpers.to_boolean(IS_ZERO(ZERO))).toEqual(true);
            });
        });
        describe('IS_LESS_OR_EQUAL', function() {
            it('should return true', function() {
                var pairs = [[1,2], [10, 20], [0, 0], [10,10], [20, 100]];
                pairs.forEach(function(pair) {
                    var a = helpers.church_numeral(pair[0]);
                    var b = helpers.church_numeral(pair[1]);
                    expect(helpers.to_boolean(IS_LESS_OR_EQUAL(a)(b))).toEqual(true);
                });
            });
            it('should return false', function() {
                var pairs = [[2,1], [20, 10], [1, 0], [200, 100]];
                pairs.forEach(function(pair) {
                    var a = helpers.church_numeral(pair[0]);
                    var b = helpers.church_numeral(pair[1]);
                    expect(helpers.to_boolean(IS_LESS_OR_EQUAL(a)(b))).toEqual(false);
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
                expect(helpers.to_array(helpers.to_list([1,2,3,4]))).toEqual([1,2,3,4]);
            });
        });
        describe('UNSHIFT', function() {
            it('should create list that can be coverted to array', function() {
                var list = UNSHIFT(
                    UNSHIFT(
                        UNSHIFT(EMPTY)(THREE)
                    )(TWO)
                )(ONE);
                expect(helpers.to_integers(list)).toEqual([1,2,3]);
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
                    var a = helpers.church_numeral(pair[0]);
                    var b = helpers.church_numeral(pair[1]);
                    expect(helpers.to_integers(RANGE(a)(b))).toEqual(range(pair[0], pair[1]));
                });
            });
        });
        describe('FOLD', function() {
            var list = RANGE(ONE)(FIVE);
            it('should create factorial of 5', function() {
                expect(helpers.to_integer(FOLD(list)(ONE)(MULTIPLY))).toEqual(120);
            });
            it('should create range sum', function() {
                expect(helpers.to_integer(FOLD(list)(ZERO)(ADD))).toEqual(15);
            });
        });
        describe('MAP', function() {
            var list = RANGE(ONE)(FIVE);
            var result = [2,3,4,5,6];
            it('should increment all elements of the list', function() {
                expect(helpers.to_integers(MAP(list)(INCREMENT))).toEqual(result);
            });
        });
    });
    describe('strings', function() {
        function test_array(fn, array) {
            array.forEach(function(pair) {
                expect(fn(pair[0])).toEqual(pair[1]);
            });
        }
        describe('constants', function() {
            it('should return proper characters', function() {
                test_array(helpers.to_char, [[B, 'B'], [F, 'F'], [I, 'i'], [U, 'u'], [ZED, 'z']]);
            });
            it('shuld return proper strings', function() {
                test_array(helpers.to_string, [[FIZZ, 'Fizz'], [BUZZ, 'Buzz'], [FIZZBUZZ, 'FizzBuzz']]);
            });
        });
        describe('TO_DIGITS', function() {
            var array = [100, 200, 450, 1, 0].map(function(number) {
                return [helpers.church_numeral(number), number.toString()];
            });
            test_array(function(numeral) {
                return helpers.to_string(TO_DIGITS(numeral));
            }, array);
        });
    });
});
