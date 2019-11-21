const endpoint = 'https://price-api.matsz.dev/v1/';

/**
 * Gets price data from the API.
 * @param {String} symbol BTC or ETH.
 */
export async function getPriceData(symbol) {
    try {
        let res = await fetch(endpoint + 'price/' + symbol.toLowerCase());
        let json = await res.json();
        return json;
    } catch (e) {
        return null;
    }
}