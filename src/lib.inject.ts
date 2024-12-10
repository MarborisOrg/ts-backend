// function first() {
//   console.log('first(): factory evaluated');
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     console.log('first(): called');
//   };
// }

// function second() {
//   console.log('second(): factory evaluated');
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     console.log('second(): called');
//   };
// }

// class MyClass2 {
//   @first()
//   public myMethod(): void {
//     console.log('myMethod() called');
//   }

//   @second()
//   public anotherMethod(): void {
//     console.log('anotherMethod() called');
//   }
// }

// class MyClass extends MyClass2 {
//   public constructor() {
//     super();
//     this.myMethod();
//     setTimeout(() => {
//       this.anotherMethod();
//     }, 2000);
//   }
// }

// const myClassInstance = new MyClass();
// myClassInstance.myMethod();
// myClassInstance.anotherMethod();

function Injectable<T extends { new (...args: any[]): {} }>(Base: T) {
  return class extends Base {
    public constructor(...args: any[]) {
      super(...args);
    }
  };
}

class BaseService {
  public sayHello(): void {
    console.log('Hello from BaseService');
  }
}

const MyService = Injectable(BaseService);

class MyServiceExtended extends MyService {
  public sayGoodbye(): void {
    console.log('Goodbye from MyService');
  }
}

const service = new MyServiceExtended();
service.sayHello(); // خروجی: Hello from BaseService
service.sayGoodbye(); // خروجی: Goodbye from MyService
