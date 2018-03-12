
const config = require('../config/db-config');
const Redis = require('ioredis');
const redis = new Redis(config.REDIS.PORT, config.REDIS.IP);
const redislock = require('ioredis-lock');
const lock=redislock.createLock(redis, {
  timeout: 20000,
  retries: 3,
  delay: 600,
});
console.log('@@##redis init success!');

module.exports = {
  getLock () {
    return lock;
  },
  getRedislock () {
    return redislock;
  },
  set(key, value) {
    redis.set(key, value);
  },
  async get(key) {
    return await redis.get(key);
  },
  setEX(key,value,timeout){
    redis.set(key, value, 'EX', timeout, function (err, res) {
        console.log('@@##setEX:'+JSON.stringify(err));
        console.log('@@##setEX res:'+JSON.stringify(res));
    });
  }
}