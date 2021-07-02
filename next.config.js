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
    APPLICATION_SECRET: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDFWQNGJimiIn7n\nKFXdIwTY6HFGA3hEw2+PnSyfDHAeU+tU+Ds6H3GVZq/78wYHvWZIGcumetaRJq1O\nWVnA2GjnaPBerBj480XCEcRBkKdutJ3MwvKLHfUg+ftBghm6x0AWY21jtVsMD19W\nNmGyQ34eazAMsk8v2fq8iyL4kXbU3l5Ifs7ZX1E+1d665m1I8ztyLkbyoGhpFUDm\nw6s4XxngEC33aoNWx3DwDAygDiGxl3GoxnCykIj5kXsFTPZ/3Hah2KyTahP4Qr/7\nAKLrA/TinVQMew8h5sAKDFc4W0rqccVAOfRRLjUhRyOvh88SxM48lWDfGpDXObFZ\nDGKD9Q2xAgMBAAECggEAAZ4LCB0pQctpwv1f7LaJMtS8+I3Q/6bogd3hdOeSY1uL\nd/DJ5YjSaAPKS1iZ2kc0StwKaavjiVk2evik03AI6IvB6Uhaq0B+qoOcfSH6+5uS\ns68ZY91tNyDlWapwZnucMd1xvZAD8xVmE/FVCFawcpGGSeC2l2Vs9If8auKzw1tp\nYPnmbWBaQ+oODihgAcVGiWpDtukPylaYfUPjZThxyoVtGmksY97zIEZYr3vujSs5\nxZ3egkPPIyEPmJhaCFHJ79DV6oZkAr0ToYOgq6GIjiB+GSYe026ITtT8mPm0sby6\nDXL6FSHkR1V5IMYMku5FJC52jesdQlTihE5mW4j4QwKBgQDqFrvm3x4DyXUspXKZ\nKeReyL4W1YaasKNCXoZZNPRJMEuPjdP5G7kXSHyktlfTHN8ZrhovRmVUwb7DiVJ6\napWP6ROpgi5N8UanlFCxSNnoLTb6kIgqTg3o2BiV+pZtw4C546bOmlud/VMNQalF\n4Xc0QQq1gykDJDXUqb1bUaGZlwKBgQDX0eJFv7D/R6Ct8Db64fcuHE53UoZdXtt7\nySI/0/XxG0CkS9yn56wABy48aT2wRyLKPjFmH7/bi0aeK5ciLcG/zhaI77V2f6yt\nFmk6bVeFsh69oag4OiEyDrUTYGsTZGKEZFampdelBXADxDEZ8+oAmoFXljilOWux\n4orrJl6r9wKBgE2rh2MeKsZU5MUQjEqXpMdyUegfpw7ShwjxdiBJOrjCBoA2Ldwc\nv7gi/ABm5BMPJFNP+i4vbFXIBzS37p7hmIhsbHK02ApSgP//bRq1sl+gCPrwU829\nok3czaONxrXaxW5oQ6OPgdCVCiZ+39xo5/V1k0kQoN4C+L18KHERT843AoGALI1m\nUZG93yURNXcGUoo9NaagSB+gHzxKwOYHjPebqNdAY+pJNdwsdKEG2W+8TVySAQAP\nwI5DU/YPcO18uJCLk6XenwwlAL5gjia3OFmEHNRlZi4uBNVzLts8ZDCeShWKBNyV\nyrcnqihSNGTW4g2pO9CpbMRVEz6kTcd/eAWmu4cCgYA7yLCVqlUdi0dN+X8wAY6g\nQO4SCuXXu1zjx31CEt/4xHhxfsaYI9I/OF9HP43pSruId0tZyqvJyGKUwFULG3b7\nIoMFk7wfWZKLfxAA4nLbBOdY39pPUb4iP37PQbParW/ExqP4mU2b5p5y+ySxZb34\n9InVdeGx8A9+LqmdoVflcg==',
  },
  
});
