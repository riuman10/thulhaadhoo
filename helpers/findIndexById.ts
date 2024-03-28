export function findIndexById(arr : any, id : any) {
  return arr.findIndex((item : any) => item.id === id);
}