const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withImages]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  images: {
    domains: ['assets.vercel.com',"firebasestorage.googleapis.com"],
  },
  env: {
    APPLICATION_SECRET: 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCbhWRUvuHkQZOQ\nAfzVvufsN5FIZwMPK42w+spevgWEaSMcBgvp8GVd4eaEZqlrYqRkBxCkRoEWLexZ\nilz0/lLT8BrGbDZUyx5Tw/XpItt8XR9kEj2g2H9sst7Px/XLjkJ1M9WWTcLHxfFS\nvr2wlJWcV348bmbbNpKU3LDT6voFg5mJnyGTVz4qpEsoXtc/UuomZyA8YMl1qEt4\nXb8OMLq5JPrdGpiTNJC5fdmYLVSOQzGc4XLoY2MKZIPVDcRXAP15LvJ2CQfE83vo\nQr+PSXvk9WTL28ai+evuYud+sJbbNZ21nKf0C7A+XZ8EBOqCsbBCXtDyS61wsisV\nGfQEOAwpAgMBAAECggEABIkTGDqZ3V2BN2urazNeUZ/8O2uPpgdb4juqH7G0ePxU\n8woFGm0xk5eVMKrKyZAuoaEoHdZViOdNc34KwHVTRo2DxmIdAoOK7p/yIbqrwnh3\nxCQZCoIN00ZzI4WeGDHdo8vfcHrzkX5nD4XzA72NkGnny0zf8Igqpa868+8wG+2D\nLxpvGpUAZYzrTvgyYPxL6UFd0YdUOup/oIckNVS/PmHcLYbiRW2eabBsLYdrtHIa\ndNPMLadCCplIJXANt0i84ECHSLjBEn0J0c3fkaTwbTUTmC7gcz/NPTmWf/WguE97\nZedzAOLf4UAOsQNkt1JhTwBHikyqD/ts9FXbkSUuhQKBgQDI2QBtbsmqCX8Ymes7\nRRv8S4qDwZOtaH20oKdLRt+a8Bkcy/nIgLQUSo8DfU/s1zIA6xVMzwQr4ha83eW9\n6m5DhUKtCilBQL7R8P98RMmp48ISYEidOXfWYabl0TkBHUmu3wFUWyHbG/3nLrv0\nCWTA1AZoCvSiatxX9dSZhngeNQKBgQDGOhBcVytvJ26M8y01a0XpQqoaxOtYoM8I\nbGNGaKh6nYjDDxPHwmsTjDAvax4Rktxt8xgx02UVOM11svxWvsD7hQfCH3zRkVnT\nV5Nx99JJZVtDhIaWMOqpjdRA9a3gBZ8WmfNfm3mEwFXhjBLJCb74jhyZLgjwWS7w\ndFEewHzEpQKBgQCRjiowJJUDpIQ2SP3f41LHwdstZzFl/47yQ2daN4+/UndwliZ8\nd0GKXwpL5hnxM3dqkPPLyU9lmiEOWOWxf97PEhljHDUPtCNWNIiC/7sCYyv3c03M\nm6RMelKgxMLCGv6WO8lT4AOmLiAQ1Z6i2dfpov7Nkfr+ZeEv4dlkNb6BbQKBgDn/\nbSAHZS7tg5v73oNdsqPQHIMekJlq24hkZhuIrZrKkuQ3ehsdWETs5IBLQA32QUZu\nNOsHJfEyoHLKfqhGwaIVxzJWEigi9fwvCHX1A3L0E+LKWLKC93XKiIrFFy2Pl39+\nZcXYcJKVz8rhN/HYRybkNZvf6z+faGt0LPPpb9f9AoGARJRpZgfgwvdrgdaSsXLM\nA0sqT/UuDdOg5GqJPlHFB1FOJFUkXvpOEqELBkCNc0SvQvwL06e2K/1N7a4zskp7\nZyAMjsdQOXKIFO3prek8C/WEw/C4hZH1qOf4RH0pb87HR0zZcp9qei1fQiKmkshw\nvQQZCGOcrempBxqF4x5EBn8=',
  },
});
