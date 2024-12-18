// Utility Decorators
export const Singleton = <T extends { new (...args: any[]): any }>(
  constructor: T
): T => {
  let instance: T | null = null;
  return class extends constructor {
    // @ts-expect-error no super needed!
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(...args: any[]) {
      if (!instance) {
        instance = new constructor(...args);
      }
      return instance as T;
    }
  };
};

export const CatchErrors = (
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]): Promise<any> {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      log.error(`${propertyKey} failed:`, error);
    }
  };
};
