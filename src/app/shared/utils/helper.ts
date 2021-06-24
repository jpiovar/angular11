export function isExplorer() {
  return window.navigator.userAgent.indexOf('MSIE ') > -1 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./);
}

export function getItemBasedId(arr: Array<any>, id: string) {
  return arr.filter((item: any) => item.id === id)[0];
}

export function getIndexBasedId(arr: Array<any>, id: string) {
  // debugger;
  return arr.findIndex(item => item.id === id);
}
