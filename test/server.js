/**
 * @description jest server
 * @author qe
 */

const request = require('supertest')
const server = require('../src/app').callback()
module.exports = request(server)
