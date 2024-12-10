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

class Utils {
  @first()
  public myMethod(): void {
    console.log('myMethod() called');
  }

  @second()
  public anotherMethod(): void {
    console.log('anotherMethod() called');
  }
}
