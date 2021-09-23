 
export const getData = (key) => JSON.parse(sessionStorage.getItem(key));

export const setData = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));

