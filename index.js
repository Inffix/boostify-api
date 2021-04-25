const request = require('request-promise');
/**
 * Class for rest v 3.
 *
 * @class
 */
module.exports = class BoostfyAPI {
    /**
     * Constructs the object.
     *
     * @param      {string}  key     The key
     */

    constructor (key) {
        this._key = key;
    }

    /**
     * Key setter
     *
     * @param      {string}  key     The key
     */
    set key (key) {
        this._key = key;
    }

    /**
     * Build request
     *
     * @param      {Object}  args         The arguments
     * @param      {string}  args.url     The url
     * @param      {string}  args.method  The method
     * @param      {Object}  args.body    The body
     * @return     {Promise<Object>|Error}  Return Promise with result
     */
    async _requestBuilder (method, args) {

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
        };

        args.token = this._key
        args.method = method

        const options = {
            uri: `http://boostify.ru/user_api`,
            headers,
            body: args,
            json: true
        };

        try {
            return (await request(options)).result;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Getting account's balance
     *
     * @return     {Promise<Object>|Error}  Return Promise with result
     */
     getBalance () {
        return this._requestBuilder('getBalance');
    }

     /**
     * Getting account's balance
     *
     * @return     {Promise<Object>|Error}  Return Promise with result
     */
      getService (service) {
        return this._requestBuilder('getService', {service});
    }

    createOrder (service, amount, link) {
        return this._requestBuilder('createOrder', {service, amount, link});
    }

    getOrder(order) {
        return this._requestBuilder('getOrder', {order});
    }

    orderAutoViews (views, days, time, link) {
        return this._requestBuilder('orderAutoViews', {views, days, time, link});
    }

    calcDayPrice (views) {
        return Math.floor(25 + views / 333.33)
    }





 
};
