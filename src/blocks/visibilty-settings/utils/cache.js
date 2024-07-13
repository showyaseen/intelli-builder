/**
 * Package: YTAHA\IntelliBuilder
 *
 */

/**
 * Cache name for the plugin.
 *
 * @type {string}
 */
const CACHE_NAME = 'intelli_builder_plugin_cache';

/**
 * Expiration time for cache in milliseconds.
 *
 * @type {number}
 */
const CACHE_EXPIRATION = 3600 * 1000;

/**
 * Retrieves data from the cache.
 *
 * @param  {string} key - The key to retrieve data.
 * @return {*} The cached data, or null if not found or expired.
 */
const getCache       = (key) => {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_NAME));
    if (! cachedData) {
        return null;
    }

    const now = new Date().getTime();

    if (cachedData[key] && (now - cachedData.timestamp < CACHE_EXPIRATION)) {
        return cachedData[key];
    }

    return null;
};

/**
 * Sets data to the cache.
 *
 * @param {string} key - The key to set data.
 * @param {*} value - The value to store in the cache.
 */
const setCache     = (key, value) => {
    let cachedData = getCache(key);
    if (null === cachedData) {
        cachedData = {};
    }

    cachedData[key] = value;

    localStorage.setItem(
        CACHE_NAME,
        JSON.stringify({ [key]: cachedData[key], timestamp: new Date().getTime() })
    );
};

export default { getCache, setCache };
