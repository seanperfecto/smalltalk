describe("longestSymmetricSubstring", () => {
  describe("when the original string is symmetric", () => {
    it("returns the original string", () => {
      expect(longestSymmetricSubstring("aba")).toEqual("aba");
      expect(longestSymmetricSubstring("xabax")).toEqual("xabax");
    });
  });

  describe("when there are two equal-length symmetric substrings", () => {
    it("returns the first one", () => {
      expect(longestSymmetricSubstring("aba1cdc")).toEqual("aba");
    });
  });

  describe("when the longest symmetric substring is of length 1", () => {
    it("returns the first character", () => {
      expect(longestSymmetricSubstring("abcdefc")).toEqual("a");
    });
  });
});

describe("Array#myEach", () => {
  let originalArray = null;
  const spy = {
    callback: (el) => { return el; }
  };

  // it does not call forEach (setup)
  beforeEach(() => {
    spyOn(Array.prototype, 'forEach').and.callThrough();
  });

  // it does not call forEach (verification)
  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
  });

  it("calls the callback passed to it", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myEach(spy.callback);
    expect(spy.callback).toHaveBeenCalled();
  });

  it("yields each element to the callback", () => {
    spyOn(spy, "callback");
    [1, 2].myEach(spy.callback);
    expect(spy.callback).toHaveBeenCalledWith(1);
    expect(spy.callback).toHaveBeenCalledWith(2);
  });

  it("is chainable and returns the original array", () => {
    originalArray = ["original array"];
    expect(originalArray.myEach(spy.callback)).toBe(originalArray);
  });
});

describe("Array#myMap", () => {
  let originalArray, spy;

  beforeEach(() => {
    originalArray = null;
    spy = {
      callback: (el) => {
        return el * el;
      }
    };
  });

  // it does not call forEach or map (setup)
  beforeEach(() => {
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'map').and.callThrough();
  });

  // it does not call forEach or map (verification)
  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.map).not.toHaveBeenCalled();
  });

  it("calls the callback passed to it", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myMap(spy.callback);
    expect(spy.callback).toHaveBeenCalled();
  });

  it("yields each element to the callback", () => {
    spyOn(spy, "callback");
    [1, 2].myMap(spy.callback);
    expect(spy.callback).toHaveBeenCalledWith(1);
    expect(spy.callback).toHaveBeenCalledWith(2);
  });

  it("calls the Array#myEach method", () => {
    originalArray = [1, 2, 3];
    spyOn(originalArray, "myEach");
    originalArray.myMap(spy.callback);
    expect(originalArray.myEach).toHaveBeenCalled();
  });

  it("returns a mapped array", () => {
    originalArray = [1, 2, 3];
    expect(originalArray.myMap(spy.callback)).toEqual([1, 4, 9]);
  });

  it("does not modify the original array", () => {
    originalArray = [1, 2, 3];
    originalArray.myMap(spy.callback);
    expect(originalArray).toEqual([1, 2, 3]);
  });
});

describe("pairMatch", () => {
  let array;

  const sumToZero = (x, y) => { return x + y === 0; };

  const sumToEven = (x, y) => { return (x + y) % 2 === 0; };

  const isGreater = (x, y) => { return x > y; };

  it("returns [] when no match is found", () => {
    array = [1, 2, 3];
    expect(pairMatch(array, sumToZero)).toEqual([]);
  });

  it("doesn't return pairs containing the same element", () => {
    array = [0, 1, 2];
    expect(pairMatch(array, sumToZero)).toEqual([]);
  });

  it("returns positions of pairs that sum to zero", () => {
    array = [1, 0, -1];
    expect(pairMatch(array, sumToZero)).toEqual([
      [0, 2], [2, 0]
    ]);
  });

  it("returns positions of pairs that sum to an even number", () => {
    array = [1, 1, 3, 2];
    expect(pairMatch(array, sumToEven)).toEqual([
      [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]
    ]);
  });

  it("returns positions of pairs where x > y", () => {
    array = [3, 2, 1];
    expect(pairMatch(array, isGreater)).toEqual([
      [0, 1], [0, 2], [1, 2]
    ]);
  });
});

describe("mergeSort", () => {
  const array = [1, 5, 2, 4, 3];
  const sortedArray = array.slice().sort();

  // it does not call sort (setup)
  beforeEach(() => {
    spyOn(Array.prototype, 'sort').and.callThrough();
  });

  // it does not call sort (verification)
  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });

  it("works with an empty array", () => {
    expect([].mergeSort()).toEqual([]);
  });

  it("works with an array of one item", () => {
    expect([1].mergeSort()).toEqual([1]);
  });

  it("sorts numbers", () => {
    expect(array.mergeSort()).toEqual(sortedArray);
  });

  it("sorts arrays with duplicates", () => {
    expect([5, 4, 3, 3, 2, 1].mergeSort()).toEqual([1, 2, 3, 3, 4, 5]);
  });

  it("uses a comparator function if passed in", () => {
    const reversed = array.mergeSort((x, y) => {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return 1;
      } else {
        return -1;
      }
    });
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  it("does not modify original", () => {
    const dupedArray = [1, 5, 2, 4, 3];
    dupedArray.mergeSort();
    expect(dupedArray).toEqual(array);
  });

  it("calls the merge helper method", () => {
    spyOn(window, 'merge');
    array.mergeSort();
    expect(window.merge).toHaveBeenCalled();
  });
});

describe("Function.prototype.myBind", () => {
  let Cat;
  let sally, markov, curie;

  beforeEach(() => {

    Cat = function Cat (name) {
      this.name = name;
    };

    Cat.prototype.sayHello = function () {
      return this.name + " says hello!";
    };

    Cat.prototype.greetOne = function (otherCat) {
      return this.name + " says hello to " + otherCat.name;
    };

    Cat.prototype.greetTwo = function (otherCat1, otherCat2) {
      return this.name + " says hello to " + otherCat1.name + " and " +
      otherCat2.name;
    };

    sally = new Cat("Sally");
    markov = new Cat("Markov");
    curie = new Cat("Curie");
  });

  it("sets the context and returns a function which can be called function style", () => {
    spyOn(Cat.prototype.sayHello, 'bind');
    expect(sally.sayHello.myBind(sally)()).toEqual("Sally says hello!");
    expect(Cat.prototype.sayHello.bind).not.toHaveBeenCalled();
  });

  it("should pass in bind-time argument to the method", () => {
    spyOn(Cat.prototype.greetOne, 'bind');
    expect(sally.greetOne.myBind(sally, markov)())
    .toEqual("Sally says hello to Markov");
    expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
  });

  it("should pass in two bind-time arguments to the method", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally, markov, curie)())
    .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("takes multiple call-time arguments", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally)(markov, curie))
    .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("should combine bind-time and call-time arguments", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally, markov)(curie))
    .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("doesn't pass the call-time arguments to future calls", () => {
    spyOn(Cat.prototype.greetOne, 'bind');
    const boundFn = sally.greetOne.myBind(sally);
    expect(boundFn(markov)).toEqual("Sally says hello to Markov");
    expect(boundFn(curie)).toEqual("Sally says hello to Curie");
    expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
  });
});

describe("Function.prototype.inherits", () => {
  let Animal, Dog, dog;

  beforeEach(() => {
    Animal = function() { this.name = "Yogi"; };

    Animal.prototype.makeNoise = function() { return "Hi!"; };

    Dog = function() { this.age = 7; };

    Dog.inherits(Animal);

    Dog.prototype.bark = function() { return "Woof!"; };

    dog = new Dog();
  });

  it("should properly set up the prototype chain between a child and parent", () => {
    expect(dog.bark()).toBe("Woof!");
    expect(dog.makeNoise()).toBe("Hi!");
  });

  it("should not call the parent's constructor function", () => {
    expect(dog.name).toBeUndefined();
  });

  it("should maintain separation of parent and child prototypes", () => {
    Dog.prototype.someProperty = 42;
    const animal = new Animal();
    expect(animal.someProperty).toBeUndefined();
    expect(animal.makeNoise()).toBe("Hi!");
  });

  it("should properly work for longer inheritance chains", () => {
    const Poodle = function() { this.name = "Bill"; };

    Poodle.inherits(Dog);

    Poodle.prototype.shave = function() { return "Brrr."; };

    const poodle = new Poodle();
    expect(poodle.name).toBe("Bill");
    expect(poodle.shave()).toBe("Brrr.");
    expect(poodle.makeNoise()).toBe("Hi!");
    expect(poodle.bark()).toBe("Woof!");
  });
});

describe("myCurry", () => {
  beforeEach(() => {
    this.myObj = {
      count: 10
    };
  });

  it("should take a function, object, and curry if 1 is passed", () => {
    const echo = function (arg) {
      return arg;
    };

    const first = myCurry(echo, this.myObj, 1);
    expect(first("one")).toMatch(/one/);
  });

  it("binds to obj if passed in", () => {
    const count = function () {
      return this.count;
    };

    const first = myCurry(count, this.myObj, 1);
    expect(first("")).toEqual(10);
  });

  it("currys arguments and calls function after called with total num args", () => {
    const sum = function(a, b, c) {
      return this.count + a + b + c;
    };

    const curriedSum = myCurry(sum, this.myObj, 3);
    const result = curriedSum(1)(2)(3);
    expect(result).toEqual(16);
  });
});

