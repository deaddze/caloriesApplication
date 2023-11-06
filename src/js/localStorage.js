function setStorage(key, value){
  return window.localStorage.setItem(key, JSON.stringify(value))
}
function getStorage(key){
  return JSON.parse(window.localStorage.getItem(key))
}
function removeStorage(key){
  window.localStorage.removeItem(key)
}
export {setStorage, getStorage, removeStorage}
