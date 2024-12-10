function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('first(): called');
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('second(): called');
  };
}

class MyClass2 {
  @first()
  public myMethod(): void {
    console.log('myMethod() called');
  }

  @second()
  public anotherMethod(): void {
    console.log('anotherMethod() called');
  }
}

class MyClass extends MyClass2 {
  public constructor() {
    super();
    this.myMethod();
    setTimeout(() => {
      this.anotherMethod();
    }, 2000);
  }
}

const myClassInstance = new MyClass();
myClassInstance.myMethod();
myClassInstance.anotherMethod();
