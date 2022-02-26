// https://eth-ropsten.alchemyapi.io/v2/eXt0wGIS3VjFXVgVW2LKl9qdoWVmfpKR

require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/eXt0wGIS3VjFXVgVW2LKl9qdoWVmfpKR',
      accounts:['d0af5accd1a65474e285364064bfa295b0c1074cc7146576b929ffaad76fe77f']
    }
  }
}