function compareObjects<T>(objectA: T, objectB: T): boolean {
  return JSON.stringify(objectA) === JSON.stringify(objectB);
}

export default compareObjects;
