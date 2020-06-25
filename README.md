![](https://raw.githubusercontent.com/ScaleLeap/amazon-mws-api-sdk/master/docs/assets/header.png)

📦 @scaleleap/amazon-mws-api-sdk
===================================

A fully typed TypeScript SDK library for Amazon MWS API 

## Download & Installation

```sh
$ npm i -s @scaleleap/amazon-mws-api-sdk
```

## Documentation (WIP)

[Click me!](docs)

## Example
---

```TypeScript
import { 
  amazonMarketplaces, 
  HttpClient, 
  MWSOptions, 
  Sellers, 
  Orders 
} from 'amazon-mws-api-sdk'

const mwsOptions: MWSOptions = {
  marketplace: amazonMarketplaces.US,
  awsAccessKeyId: '',
  mwsAuthToken: '',
  sellerId: '',
  secretKey: '',
}

const main = async () => {
  const http = new HttpClient(mwsOptions)
  
  // Get status for Sellers API
  const sellers = new Sellers(http)
  const [serviceStatus] = await sellers.getServiceStatus()
  if (serviceStatus.Status === 'GREEN') {
    console.log(`Sellers API is up on ${serviceStatus.Timestamp}!`)
  }

  // List Orders
  const orders = new Orders(http)
  const [ordersList, requestMeta] = await orders.listOrders({ 
    MarketplaceId: [amazonMarketplaces.US.id],
    CreatedAfter: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000)
  })

  ordersList.Orders.forEach((order) => {
    console.log(`Order ID is ${order.AmazonOrderId}`)
  })
}
```
More examples in the `/examples` folder!

## Authors or Acknowledgments

* Roman Filippov ([Scale Leap](https://www.scaleleap.com))
* Stanislav Iliev ([gigobyte](https://github.com/gigobyte))

## License

This project is licensed under the MIT License.

## Badges

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ScaleLeap/amazon-mws-api-sdk/CI)](https://github.com/ScaleLeap/amazon-mws-api-sdk/actions)
[![NPM](https://img.shields.io/npm/v/@scaleleap/amazon-mws-api-sdk)](https://npm.im/@scaleleap/amazon-mws-api-sdk)
[![License](https://img.shields.io/npm/l/@scaleleap/amazon-mws-api-sdk)](./LICENSE)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
