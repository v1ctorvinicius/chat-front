export function arraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!objectsEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}

export function objectsEqual(obj1: any, obj2: any) {
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  )
    return obj1 === obj2;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  // Verificar cada chave e valor dos objetos
  for (let key of keys1) {
    if (!objectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true; // Os objetos são iguais
}
