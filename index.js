const memo = (slowAPICall) => {
  const cache = new Map();

  return async (...args) => {
    const selector = JSON.stringify(args);

    if (cache.has(selector)) {
      console.log("fetched from cache");
      return cache.get(selector);
    }
    const response = await slowAPICall(...args);
    console.log("fetched from API");

    cache.set(selector, response);
    return response;
  };
};

const cachedRequest = memo(fetch);
const URL = "https://pokeapi.co/api/v2/pokemon/ditto/";

setInterval(async () => {
  await cachedRequest(URL);
}, 5000);
