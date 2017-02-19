let getCachedStop = function(position) {
  var items = localStorage.getItem(position.toString());

  // if location is not in cache
  if (!items) {
    return null;
  }
  return items;
};

let cacheStop = function(info) {
  localStorage.setItem(info.position.toString(), info.objs);
};

export {
  getCachedStop as getCachedStop,
  cacheStop as cacheStop
};
