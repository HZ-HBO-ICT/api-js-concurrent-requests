/**
 * Async function to fetch data from an external API
 * @param url - The URL to fetch data from
 * @returns Promise
 */

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error(`Unfortunately this ${error} occured`);
    }
};

/**
   * Fetches a single item from the API
   * @param id - The ID of the item
   * @param entitySlug - The entity's slug
   * @param apiRoot - The API's root URL
   * @returns Promise
   */
const getOne = async (id, entitySlug, apiRoot) => {
    const url = `${apiRoot}${entitySlug}/${id}/`;
    return await fetchData(url);
};

/**
 * Fetches a list of items from the API
 * @param entitySlug - The entity's slug
 * @param apiRoot - The API's root URL
 * @returns Promise>
 */
const getList = async (entitySlug, apiRoot) => {
    const url = `${apiRoot}${entitySlug}`;
    return await fetchData(url);
};

/**
 * Fetches paginated data from the API based on page number
 * @param entitySlug - The entity's slug
 * @param pageNumber - The page number to fetch
 * @param apiRoot - The API's root URL
 * @returns Promise
 */
const getListBasedOnPaginationPage = async (entitySlug, pageNumber, apiRoot) => {
    // create your own pagination logic here
};

export { getOne, getList, getListBasedOnPaginationPage, fetchData };