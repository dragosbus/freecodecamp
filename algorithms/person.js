class Person {
  constructor(first,last) {
    this.first=first;
    this.last = last;
  }
  getFirstName() {
    return this.first;
  }
  getLastName() {
    return this.last;
  }
  getFullName() {
    return `${this.first} ${this.last}`;
  }
  setFirstName(fName) {
    this.first = fName;
  }
  setLastName(lName) {
    this.last = lName;
  }
  setFullName(fName,lName) {
    this.first = fName;
    this.last = lName;
  }
}

var bob = new Person('Bob','Ross');
bob.setFirstName("marry");
console.log(bob.getFullName());
