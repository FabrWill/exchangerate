import { CacheStore } from "@nestjs/cache-manager";

export function Cacheable(key: string) {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheManager: CacheStore = (this as any).cacheManager;

      const cacheKey = `${key}:${JSON.stringify(args)}`;
      let value = await cacheManager.get(cacheKey);

      if (value) {
        console.log("Returning cached value for:", cacheKey);
        return value;
      }

      console.log("Cache miss, calling original method for:", cacheKey);
      value = await originalMethod.apply(this, args);
      await cacheManager.set(cacheKey, value);

      return value;
    };

    return descriptor;
  };
}
