![](https://raw.githubusercontent.com/ScaleLeap/amazon-mws-api-sdk/master/docs/assets/header.png)

[![NPM](https://img.shields.io/npm/v/@scaleleap/amazon-mws-api-sdk)](https://npm.im/@scaleleap/amazon-mws-api-sdk)
[![License](https://img.shields.io/npm/l/@scaleleap/amazon-mws-api-sdk)](./LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ScaleLeap/amazon-mws-api-sdk/Release)](https://github.com/ScaleLeap/amazon-mws-api-sdk/actions)
[![Codecov](https://img.shields.io/codecov/c/github/scaleleap/amazon-mws-api-sdk)](https://codecov.io/gh/ScaleLeap/amazon-mws-api-sdk)
[![Snyk](https://img.shields.io/snyk/vulnerabilities/github/scaleleap/amazon-mws-api-sdk)](https://snyk.io/test/github/scaleleap/amazon-mws-api-sdk)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

📦 @scaleleap/amazon-mws-api-sdk
===================================

A fully typed TypeScript SDK library for Amazon MWS API

## Download & Installation

```sh
$ npm i -s @scaleleap/amazon-mws-api-sdk
```

## [Click here for the full **Documentation**](docs)

## Example
---

```TypeScript
import {
  amazonMarketplaces,
  HttpClient,
  MWSOptions,
  Sellers,
  Orders
} from '@scaleleap/amazon-mws-api-sdk'

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
## [More examples in the `/examples` folder!](examples)

## Authors or Acknowledgments

* Roman Filippov ([Scale Leap](https://www.scaleleap.com))
* Stanislav Iliev ([gigobyte](https://github.com/gigobyte))
* Justin Emmanuel Mercado ([Justin Emmanuel Mercado](https://github.com/justinemmanuelmercado))

## License

This project is licensed under the MIT License.
