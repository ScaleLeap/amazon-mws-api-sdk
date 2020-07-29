# Table of Contents
- [Table of Contents](#table-of-contents)
- [Basics](#basics)
  - [Configuring `HttpClient` and using it with the different sections](#configuring-httpclient-and-using-it-with-the-different-sections)
  - [Basic usage example](#basic-usage-example)
  - [Response Object](#response-object)
  - [Request Metadata](#request-metadata)
  - [Next tokens](#next-tokens)
    - [Creating `NextToken`s](#creating-nexttokens)
    - [Reusing next tokens from a previous response](#reusing-next-tokens-from-a-previous-response)
  - [MWS Class](#mws-class)
- [Sections](#sections)
  - [Sellers](#sellers)
    - [listMarketplaceParticipations](#listmarketplaceparticipations)
    - [listMarketplaceParticipationsByNextToken](#listmarketplaceparticipationsbynexttoken)
    - [getServiceStatus](#getservicestatus)
  - [Orders](#orders)
    - [listOrders](#listorders)
    - [listOrdersByNextToken](#listordersbynexttoken)
    - [getOrder](#getorder)
    - [listOrderItems](#listorderitems)
    - [listOrderItemsByNextToken](#listorderitemsbynexttoken)
    - [getServiceStatus](#getservicestatus-1)
  - [Reports](#reports)
    - [requestReport](#requestreport)
    - [getReportRequestList](#getreportrequestlist)
    - [getReportRequestListByNextToken](#getreportrequestlistbynexttoken)
    - [getReportRequestCount](#getreportrequestcount)
    - [cancelReportRequests](#cancelreportrequests)
    - [getReportList](#getreportlist)
    - [getReportListByNextToken](#getreportlistbynexttoken)
    - [getReportCount](#getreportcount)
    - [getReport](#getreport)
    - [manageReportSchedule](#managereportschedule)
    - [getReportScheduleList](#getreportschedulelist)
    - [getReportScheduleListByNextToken](#getreportschedulelistbynexttoken)
    - [getReportScheduleCount](#getreportschedulecount)
    - [updateReportAcknowledgements](#updatereportacknowledgements)
  - [Subscriptions](#subscriptions)
    - [Types used in `Subscriptions`](#types-used-in-subscriptions)
      - [Subscription](#subscription)
      - [Destination](#destination)
      - [AttribueKeyValue](#attribuekeyvalue)
    - [registerDestination](#registerdestination)
    - [deregisterDestination](#deregisterdestination)
    - [listRegisteredDestinations](#listregistereddestinations)
    - [sendTestNotificationToDestination](#sendtestnotificationtodestination)
    - [createSubscription](#createsubscription)
    - [getSubscription](#getsubscription)
    - [deleteSubscription](#deletesubscription)
    - [listSubscriptions](#listsubscriptions)
    - [updateSubscription](#updatesubscription)
    - [getServiceStatus](#getservicestatus-2)
  - [FulfillmentInventory](#fulfillmentinventory)
    - [listInventorySupply](#listinventorysupply)
    - [listInventorySupplyByNextToken](#listinventorysupplybynexttoken)
    - [getServiceStatus](#getservicestatus-3)
  - [Feeds](#feeds)
    - [submitFeed](#submitfeed)
    - [getFeedSubmissionList](#getfeedsubmissionlist)
    - [getFeedSubmissionListByNextToken](#getfeedsubmissionlistbynexttoken)
    - [getFeedSubmissionCount](#getfeedsubmissioncount)
    - [cancelFeedSubmissions](#cancelfeedsubmissions)
    - [getFeedSubmissionResult](#getfeedsubmissionresult)
  - [Products](#products)
    - [Types used in `Products`](#types-used-in-products)
      - [FeesEstimateRequest](#feesestimaterequest)
      - [PriceToEstimateFees](#pricetoestimatefees)
      - [MoneyType](#moneytype)
      - [Points](#points)
    - [listMatchingProducts](#listmatchingproducts)
    - [getMatchingProduct](#getmatchingproduct)
    - [getMatchingProductForId](#getmatchingproductforid)
    - [getCompetitivePricingForSku](#getcompetitivepricingforsku)
    - [getCompetitivePricingForAsin](#getcompetitivepricingforasin)
    - [getLowestOfferListingsForSku](#getlowestofferlistingsforsku)
    - [getLowestOfferListingsForAsin](#getlowestofferlistingsforasin)
    - [getLowestPricedOffersForSku](#getlowestpricedoffersforsku)
    - [getLowestPricedOffersForAsin](#getlowestpricedoffersforasin)
    - [getMyFeesEstimate](#getmyfeesestimate)
    - [getMyPriceForSku](#getmypriceforsku)
    - [getMyPriceForAsin](#getmypriceforasin)
    - [getProductCategoriesForSku](#getproductcategoriesforsku)
    - [getProductCategoriesForAsin](#getproductcategoriesforasin)
    - [getServiceStatus](#getservicestatus-4)
  - [Finances](#finances)
    - [listFinancialEventGroups](#listfinancialeventgroups)
    - [listFinancialEventGroupsByNextToken](#listfinancialeventgroupsbynexttoken)
    - [listFinancialEvents](#listfinancialevents)
    - [listFinancialEventsByNextToken](#listfinancialeventsbynexttoken)
  - [MerchantFulfillemnt](#merchantfulfillemnt)
    - [Types used in MerchantFulfillemnt](#types-used-in-merchantfulfillemnt)
      - [ShipmentRequestDetails](#shipmentrequestdetails)
      - [Item](#item)
      - [Address](#address)
      - [PackageDimensions](#packagedimensions)
      - [Weight](#weight)
      - [ShippingServiceOptions](#shippingserviceoptions)
      - [LabelCustomization](#labelcustomization)
      - [AdditionalSellerInputs](#additionalsellerinputs)
      - [AdditionalSellerInput](#additionalsellerinput)
      - [CurrencyAmount](#currencyamount)
      - [LabelFormatOption](#labelformatoption)
      - [ShippingOfferingFilter](#shippingofferingfilter)
    - [getEligibleShippingServices](#geteligibleshippingservices)
    - [getAddtionalSellerInputs](#getaddtionalsellerinputs)
    - [createShipment](#createshipment)
    - [getShipment](#getshipment)
    - [cancelShipment](#cancelshipment)
    - [getServiceStatus](#getservicestatus-5)
  - [ShipmentInvoicing](#shipmentinvoicing)
    - [getFbaOutboundShipmentDetail](#getfbaoutboundshipmentdetail)
    - [submitFBAOutboundShipmentInvoice](#submitfbaoutboundshipmentinvoice)
    - [getFBAOutboundShipmentInvoiceStatus](#getfbaoutboundshipmentinvoicestatus)
    - [getServiceStatus](#getservicestatus-6)
  - [Recommendations](#recommendations)
    - [Types used in Recommendations](#types-used-in-recommendations)
      - [CategoryQuery](#categoryquery)
    - [getLastUpdatedTimeForRecommendations](#getlastupdatedtimeforrecommendations)
    - [listRecommendations](#listrecommendations)
    - [listRecommendationsByNextToken](#listrecommendationsbynexttoken)
    - [getServiceStatus](#getservicestatus-7)
  - [FulfillmentInboundShipment](#fulfillmentinboundshipment)
    - [Types used in FulfillmentInboundShipment](#types-used-in-fulfillmentinboundshipment)
      - [Address](#address-1)
      - [InboundShipmentPlanRequestItem](#inboundshipmentplanrequestitem)
      - [PrepDetails](#prepdetails)
      - [InboundShipmentHeader](#inboundshipmentheader)
      - [InboundShipmentItem](#inboundshipmentitem)
      - [TransportDetailInput](#transportdetailinput)
      - [Dimensions](#dimensions)
      - [Weight](#weight-1)
      - [PartneredSmallParcelPackageInput](#partneredsmallparcelpackageinput)
      - [PartneredSmallParcelDataInput](#partneredsmallparceldatainput)
      - [NonPartneredSmallParcelPackageOutput](#nonpartneredsmallparcelpackageoutput)
      - [NonPartneredSmallParcelDataInput](#nonpartneredsmallparceldatainput)
      - [Contact](#contact)
      - [Pallet](#pallet)
      - [Amount](#amount)
      - [PartneredLtlDataInput](#partneredltldatainput)
      - [NonPartneredLtlDataInput](#nonpartneredltldatainput)
    - [getInboundGuidanceForSku](#getinboundguidanceforsku)
    - [getInboundGuidanceForAsin](#getinboundguidanceforasin)
    - [createInboundShipmentPlan](#createinboundshipmentplan)
    - [createInboundShipment](#createinboundshipment)
    - [updateInboundShipment](#updateinboundshipment)
    - [getPreorderInfo](#getpreorderinfo)
    - [confirmPreorder](#confirmpreorder)
    - [getPrepInstructionsForSku](#getprepinstructionsforsku)
    - [getPrepInstructionsForAsin](#getprepinstructionsforasin)
    - [putTransportContent](#puttransportcontent)
    - [estimateTransportRequest](#estimatetransportrequest)
    - [getTransportContent](#gettransportcontent)
    - [confirmTransportRequest](#confirmtransportrequest)
    - [voidTransportRequest](#voidtransportrequest)
    - [getPackageLabels](#getpackagelabels)
    - [getUniquePackageLabels](#getuniquepackagelabels)
    - [getPalletLabels](#getpalletlabels)
    - [getBillOfLading](#getbilloflading)
    - [listInboundShipments](#listinboundshipments)
    - [listInboundShipmentsByNextToken](#listinboundshipmentsbynexttoken)
    - [listInboundShipmentItems](#listinboundshipmentitems)
    - [listInboundShipmentItemsByNextToken](#listinboundshipmentitemsbynexttoken)
    - [getServiceStatus](#getservicestatus-8)
  - [FulfillmentOutboundShipment](#fulfillmentoutboundshipment)
    - [Types used in FulfillmentOutboundShipment](#types-used-in-fulfillmentoutboundshipment)
      - [Address](#address-2)
      - [GetFulfillmentPreviewItem](#getfulfillmentpreviewitem)
      - [Currency](#currency)
      - [CODSettings](#codsettings)
      - [CreateFulfillmentOrderItem](#createfulfillmentorderitem)
      - [DeliveryWindow](#deliverywindow)
      - [CreateReturnItem](#createreturnitem)
    - [getFulfillmentPreview](#getfulfillmentpreview)
    - [createFulfillmentOrder](#createfulfillmentorder)
    - [updateFulfillmentOrder](#updatefulfillmentorder)
    - [listAllFulfillmentOrders](#listallfulfillmentorders)
    - [getFulfillmentOrder](#getfulfillmentorder)
    - [listAllFulfillmentOrdersByNextToken](#listallfulfillmentordersbynexttoken)
    - [getPackageTrackingDetails](#getpackagetrackingdetails)
    - [cancelFulfillmentOrder](#cancelfulfillmentorder)
    - [listReturnReasonCodes](#listreturnreasoncodes)
    - [createFulfillmentReturn](#createfulfillmentreturn)
    - [getServiceStatus](#getservicestatus-9)
  - [EasyShip](#easyship)
    - [Types used in EasyShip](#types-used-in-easyship)
      - [Dimensions](#dimensions-1)
      - [Weight](#weight-2)
      - [Item](#item-1)
      - [PickupSlot](#pickupslot)
      - [PackageRequestDetails](#packagerequestdetails)
      - [ScheduledPackageUpdateDetails](#scheduledpackageupdatedetails)
      - [ScheduledPackageId](#scheduledpackageid)
    - [listPickupSlots](#listpickupslots)
    - [createScheduledPackage](#createscheduledpackage)
    - [updateScheduledPackages](#updatescheduledpackages)
    - [getScheduledPackage](#getscheduledpackage)
    - [getServiceStatus](#getservicestatus-10)

# Basics

`amazon-mws-api-sdk` is divided up into different sections representing the different sections of the Amazon MWS API.
Under each section are methods that perform "actions" on the MWS API, the response is parsed and returned along with the the request metadata

---
[go back to table of contents](#table-of-contents)

## Configuring `HttpClient` and using it with the different sections

```typescript
/**
 * Configure the HttpClient
 */

const mwsOptions: MWSOptions = {
  marketplace: amazonMarketplaces.US,
  awsAccessKeyId: '',
  mwsAuthToken: '',
  sellerId: '',
  secretKey: '',
}

const http = new HttpClient(mwsOptions)

/**
 * Configure which API you need
 *  Sellers, Orders, Fulfillment Inventory, Products, Reports, Subscriptions, Finances, Feeds
 */
const sellers = new Sellers(http)
// new Orders(http), new FulfillmentInventory(http), new Products(http), new Reports(http)
// new Subscriptions(http), new Finances(http), new Feeds(http)
```

**MWSOptions attributes**
| Name           | Type   | Example            | Description           | Required |
| -------------- | ------ | ------------------ | --------------------- | -------- |
| marketplace    | string | `'A2EUQ1WTGCTBG2'` | Amazon Marketplace ID | Yes      |
| awsAccessKeyId | string | `'AWSACCESSKEYID'` | AWS Access Key ID     | Yes      |
| mwsAuthToken   | string | `'MWSAUTHTOKEN'`   | MWS Auth Token        | Yes      |
| sellerId       | string | `'SellerId'`       | Seller ID             | Yes      |
| secretKey      | string | `'SECREEET'`       | Secret Key            | Yes      |

---

## Basic usage example

```typescript
const orders = new Orders(httpClient)

// Each action returns a tuple containing [0] the actual request data and [1] the request metadata
const [response, meta] = orders.listMarketplaceParticipations()

const { ListParticipations } = response
const { requestId, timestamp } = meta

console.log(`
  Request ${requestId} made on ${timestamp.toISOString()} returned ${ListParticipations.length} participations!
`)
// Request 598a82be-d4ed-4bb6-802d-8e9150036d43 made on 2020-10-05T14:48:00.000Z returned 2 participations!
```

The most basic usage can be seen in [the get-service-status example file](../examples/get-service-status.ts)

---
[go back to table of contents](#table-of-contents)

## Response Object

The actual request data varies between actions. Outside of some exceptions, all request data has been defined.
Finding out the properties of the response object should be as easy as using your text editor's autocomplete suggestions 

---
[go back to table of contents](#table-of-contents)

## Request Metadata

This is returned along with the API's response

**Structure**

| Name           | Type   | Example                                  | Description                                |
| -------------- | ------ | ---------------------------------------- | ------------------------------------------ |
| requestId      | string | `'598a82be-d4ed-4bb6-802d-8e9150036d43'` | Amazon MWS Request Id                      |
| timestamp      | Date   | `new Date()`                             | Timestamp of the request                   |
| quotaMax       | number | `200`                                    | Max requests for throttling purposes       |
| quotaRemaining | number | `100`                                    | Requests remaining for throttling purposes |
| quotaResetOn   | Date   | `new Date()`                             | Date the quota resets                      |

["Throttling: Limits to how often you can submit requests"](http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_Throttling.html)

---
[go back to table of contents](#table-of-contents)


## Next tokens

["using-next-tokens" example file](../examples/using-next-tokens.ts)

["Using NextToken to request additional pages" from the Amazon documentation](http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_NextToken.html)

### Creating `NextToken`s

```typescript
  /**
   * Construct your next token with the following arguments
   * 1. Valid Amazon MWS action. WITHOUT `...ByNextToken` AT THE END
   * 2. Actual NextToken
   */
  const nextToken = new NextToken('ListMarketplaceParticipations', 'NEXTTOKEN123')
  const [
    marketplaceParticipationsList,
    requestMeta,
  ] = await sellers.listMarketplaceParticipationsByNextToken(nextToken)
```

### Reusing next tokens from a previous response
```typescript
  const [
    marketplaceParticipationsList,
    requestMeta,
  ] = await sellers.listMarketplaceParticipationsByNextToken(nextToken)
  const nextToken = marketplaceParticipationsList.NextToken
  /**
   * NextToken is possibly undefined
   */
  if (nextToken) {
    const [
      newMarketplaceParticipationsList,
      newRequestMeta,
    ] = await sellers.listMarketplaceParticipationsByNextToken(nextToken)
  }
```

## MWS Class
It is also possible to use the `MWS` access the sections and all their actions

**Example**
```typescript
// Using MWS client
const usingMws = async () => {
  const http = new HttpClient(mwsOptions)

  /**
   * Configure MWS with the same http client
   */
  const mws = new MWS(http)

  const [serviceStatus] = await mws.sellers.getServiceStatus()
  /**
   * Also available 
   * mws.orders, mws.feeds, mws.finances, mws.fulfillmentInventory, 
   * mws.products, mws.reports, mws.subscriptions
   */
  if (serviceStatus.Status === 'GREEN') {
    console.log(`Sellers API is up on ${serviceStatus.Timestamp}!`)
  }
}
```

# Sections

---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START SELLERS/////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## Sellers

[Amazon MWS Sellers API official documentation](http://docs.developer.amazonservices.com/en_CA/sellers/Sellers_Overview.html)

### listMarketplaceParticipations

**Parameters**

| None |
| ---- |

**Example**

```typescript
const sellers = new Sellers(httpClient)
const [response, meta] = sellers.listMarketplaceParticipations()
```

**Response**

[See sellers test snapshot](../test/unit/__snapshots__/sellers.test.ts.snap)

### listMarketplaceParticipationsByNextToken

**Parameters**
| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const sellers = new Sellers(httpClient)
const [response, meta] = sellers.listMarketplaceParticipationsByNextToken(new NextToken('ListMarketplaceParticipations', '123'))
```

**Response**

[See sellers test snapshot](../test/unit/__snapshots__/sellers.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const sellers = new Sellers(httpClient)
const [response, meta] = sellers.getServiceStatus()
```

**Response**

[See sellers test snapshot](../test/unit/__snapshots__/sellers.test.ts.snap)


---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START ORDERS//////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## Orders

[Amazon MWS Orders API official documentation](http://docs.developer.amazonservices.com/en_CA/orders-2013-09-01/Orders_Overview.html)

### listOrders
**Parameters**

| Name               | Type     | Example                 | Required                                |
| ------------------ | -------- | ----------------------- | --------------------------------------- |
| CreatedAfter       | Date     | `new Date()`            | Yes if LastUpdatedAfter is not provided |
| CreatedBefore      | Date     | `new Date()`            | No                                      |
| LastUpdatedAfter   | Date     | `new Date()`            | Yes if CreatedAfter is not provided     |
| LastUpdatedBefore  | Date     | `new Date()`            | No                                      |
| OrderStatus        | string   | `'PendingAvailability'` | No                                      |
| MarketplaceId      | string[] | `['A2EUQ1WTGCTBG2']`    | No                                      |
| FulfillmentChannel | string[] | `['AFN']`               | No                                      |
| PaymentMethod      | string[] | `['COD']`               | No                                      |
| BuyerEmail         | string   | `'buyer@example.com'`   | No                                      |
| SellerOrderId      | string   | `'STRINGID'`            | No                                      |
| MaxResultsPerPage  | number   | `10`                    | No                                      |
| EasyShipmentStatus | string[] | `['PendingPickUp']`     | No                                      |

* [Possible values for FulfillmentChannel, PaymentMethod and EasyShipmentStatus ](http://docs.developer.amazonservices.com/en_CA/orders-2013-09-01/Orders_ListOrders.html)

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrders({ createdAfter: new Date() })
```

**Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)


### listOrdersByNextToken
**Parameters**
| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |


**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrdersByNextToken(new NextToken('ListOrders', '123'))
```

**Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### getOrder
**Parameters**
| Name          | Type     | Example                   | Required |
| ------------- | -------- | ------------------------- | -------- |
| AmazonOrderId | string[] | `['902-3159896-1390916']` | Yes      |

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.getOrder({ AmazonOrderId: ['902-3159896-1390916'] })
```

**Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### listOrderItems
**Parameters**
| Name          | Type   | Example                 | Required |
| ------------- | ------ | ----------------------- | -------- |
| AmazonOrderId | string | `'902-3159896-1390916'` | Yes      |

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrderItems({ AmazonOrderId: '902-3159896-1390916' })
```

**Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### listOrderItemsByNextToken

**Parameters**

| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrderItemsByNextToken(new NextToken('ListOrderItems', '123'))
```

**Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.getServiceStatus()
```

**Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START REPORTS/////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## Reports

[Amazon MWS Reports API official documentation](http://docs.developer.amazonservices.com/en_CA/reports/Reports_Overview.html)

### requestReport
**Parameters**
| Name              | Type     | Example                                | Required |
| ----------------- | -------- | -------------------------------------- | -------- |
| ReportType        | string   | `'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'` | Yes      |
| StartDate         | Date     | `new Date()`                           | No       |
| EndDate           | Date     | `new Date()`                           | No       |
| ReportOptions     | string   | `'Report Option'`                      | No       |
| MarketplaceIdList | string[] | `['A2EUQ1WTGCTBG2']`                   | No       |

* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.requestReport({ ReportType: '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_' })
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)


### getReportRequestList
**Parameters**
| Name                       | Type     | Example                                  | Required                                                                      |
| -------------------------- | -------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| ReportRequestIdList        | string[] | `['12345']`                              | No. If you pass in ReportRequestId values, other query conditions are ignored |
| ReportTypeList             | string[] | `['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_']` | No                                                                            |
| ReportProcessingStatusList | string[] | `['_SUBMITTED_']`                        | No                                                                            |
| MaxCount                   | number   | `10`                                     | No                                                                            |
| RequestedFromDate          | Date     | `new Date()`                             | No                                                                            |
| RequestedToDate            | Date     | `new Date()`                             | No                                                                            |

* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestList.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportRequestList()
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportRequestListByNextToken
**Parameters**
| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportRequestListByNextToken(new NextToken('GetReportRequestList', '123'))
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)


### getReportRequestCount
**Parameters**
| Name                       | Type     | Example                                  | Required |
| -------------------------- | -------- | ---------------------------------------- | -------- |
| ReportTypeList             | string[] | `['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_']` | No       |
| ReportProcessingStatusList | string[] | `['_SUBMITTED_']`                        | No       |
| RequestedFromDate          | Date     | `new Date()`                             | No       |
| RequestedToDate            | Date     | `new Date()`                             | No       |
* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestCount.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportRequestCount()
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)


### cancelReportRequests
**Parameters**

| Name                       | Type     | Example                                  | Required |
| -------------------------- | -------- | ---------------------------------------- | -------- |
| ReportRequestIdList        | string[] | `['12345']`                              | No       |
| ReportTypeList             | string[] | `['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_']` | No       |
| ReportProcessingStatusList | string[] | `['_SUBMITTED_']`                        | No       |
| RequestedFromDate          | Date     | `new Date()`                             | No       |
| RequestedToDate            | Date     | `new Date()`                             | No       |

* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestList.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.cancelReportRequests()
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportList
**Parameters**

| Name                | Type     | Example                                  | Required |
| ------------------- | -------- | ---------------------------------------- | -------- |
| MaxCount            | number   | `10`                                     | No       |
| ReportTypeList      | string[] | `['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_']` | No       |
| Acknowledged        | boolean  | `true`                                   | No       |
| ReportRequestIdList | string[] | `['12345']`                              | No       |
| AvailableFromDate   | Date     | `new Date()`                             | No       |
| AvailableToDate     | Date     | `new Date()`                             | No       |

* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportList()
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportListByNextToken
**Parameters**

| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportListByNextToken(new NextToken('GetReportList', '123'))
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)
### getReportCount
**Parameters**

| Name              | Type     | Example                                  | Required |
| ----------------- | -------- | ---------------------------------------- | -------- |
| ReportTypeList    | string[] | `['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_']` | No       |
| Acknowledged      | boolean  | `true`                                   | No       |
| AvailableFromDate | Date     | `new Date()`                             | No       |
| AvailableToDate   | Date     | `new Date()`                             | No       |

* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportCount()
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReport
**Parameters**
| Name     | Type   | Example | Required |
| -------- | ------ | ------- | -------- |
| ReportId | string | '12345' | Yes      |

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReport('12345')
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

*Depending on the ReportType, this will either be a tab-delimited flat file, an XML document, or a PDF.*
*Because of this, this action returns a `string` instead of a JS object and it is up to the user to determine how to handle the file*

### manageReportSchedule
**Parameters**
| Name         | Type   | Example                                | Required |
| ------------ | ------ | -------------------------------------- | -------- |
| ReportType   | string | `'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'` | Yes      |
| Schedule     | string | `'_15_MINUTES_'`                       | Yes      |
| ScheduleDate | Date   | `new Date()`                           | No       |
* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)
* [Possible values for Schedule](http://docs.developer.amazonservices.com/en_CA/reports/Reports_Schedule.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.manageReportSchedule({
  ReportType: '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_',
  Schedule: '_15_MINUTES_'
})
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportScheduleList

**Parameters**

| Name           | Type     | Example                                  | Required |
| -------------- | -------- | ---------------------------------------- | -------- |
| ReportTypeList | string[] | `['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_']` | No       |
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportScheduleList()
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportScheduleListByNextToken
[Currently this operation can never be called because the GetReportScheduleList operation cannot return more than 100 results. It is included for future compatibility.](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportScheduleListByNextToken.html)

### getReportScheduleCount
**Parameters**
| Name           | Type     | Example                                  | Required |
| -------------- | -------- | ---------------------------------------- | -------- |
| ReportTypeList | string[] | `['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_']` | No       |
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportScheduleCount()
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### updateReportAcknowledgements

**Parameters**
| Name         | Type     | Example     | Required |
| ------------ | -------- | ----------- | -------- |
| ReportIdList | string[] | `['12345']` | Yes      |
| Acknowledged | boolean  | `true`      | No       |

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.updateReportAcknowledgements({ ReportIdList: ['12345'] })
```

**Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START SUBSCRIPTIONS///////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## Subscriptions
[Amazon MWS Subscriptions official API](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_Overview.html)

### Types used in `Subscriptions`

#### Subscription
**Properties**
| Name             | Type        | Example                       | Required |
| ---------------- | ----------- | ----------------------------- | -------- |
| NotificationType | string      | `'AnyOfferChanged'`           | Yes      |
| Destination      | Destination | [`Destination`](#destination) | Yes      |
| IsEnabled        | boolean     | `true`                        | Yes      |

* [Possible values for NotificationType](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_NotificationType.html)

#### Destination
**Properties**
| Name            | Type              | Example                               | Required |
| --------------- | ----------------- | ------------------------------------- | -------- |
| DeliveryChannel | string            | `'SQS'`                               | Yes      |
| AttributeList   | AttributeKeyValue | [AttribueKeyValue](#attribuekeyvalue) | Yes      |

* [Possible values for DeliveryChannel](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_Datatypes.html#Destination)

#### AttribueKeyValue
**Properties**
| Name  | Type   | Example                                                              | Required |
| ----- | ------ | -------------------------------------------------------------------- | -------- |
| Key   | string | 'sqsQueueUrl'                                                        | Yes      |
| Value | string | 'https://sqs.us-east-1.amazonaws.com/51471EXAMPLE/mws_notifications' | Yes      |

* [Possible values for Key](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_Datatypes.html#AttributeKeyValue)

### registerDestination
**Parameters**

| Name          | Type        | Example                       | Required |
| ------------- | ----------- | ----------------------------- | -------- |
| MarketplaceId | string      | `'A2EUQ1WTGCTBG2'`            | Yes      |
| Destination   | Destination | [`Destination`](#destination) | Yes      |

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.registerDestination({
      MarketplaceId: 'A2EUQ1WTGCTBG2' ,
      Destination: {
          AttributeList: [
            {
              Key: 'sqsQueueUrl',
              Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
            },
          ],
          DeliveryChannel: 'SQS',
        }
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### deregisterDestination
**Parameters**

| Name          | Type        | Example                       | Required |
| ------------- | ----------- | ----------------------------- | -------- |
| MarketplaceId | string      | `'A2EUQ1WTGCTBG2'`            | Yes      |
| Destination   | Destination | [`Destination`](#destination) | Yes      |

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.deregisterDestination({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
      Destination: {
          AttributeList: [
            {
              Key: 'sqsQueueUrl',
              Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
            },
          ],
          DeliveryChannel: 'SQS',
        }
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### listRegisteredDestinations
**Parameters**
| Name          | Type   | Example            | Required |
| ------------- | ------ | ------------------ | -------- |
| MarketplaceId | string | `'A2EUQ1WTGCTBG2'` | Yes      |

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.listRegisteredDestinations({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### sendTestNotificationToDestination
**Parameters**

| Name          | Type        | Example                       | Required |
| ------------- | ----------- | ----------------------------- | -------- |
| MarketplaceId | string      | `'A2EUQ1WTGCTBG2'`            | Yes      |
| Destination   | Destination | [`Destination`](#destination) | Yes      |

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.sendTestNotificationToDestination({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
      Destination: {
          AttributeList: [
            {
              Key: 'sqsQueueUrl',
              Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
            },
          ],
          DeliveryChannel: 'SQS',
        }
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### createSubscription
**Parameters**
| Name          | Type         | Example                         | Required |
| ------------- | ------------ | ------------------------------- | -------- |
| MarketplaceId | string       | `'A2EUQ1WTGCTBG2'`              | Yes      |
| Subscription  | Subscription | [`Subscription`](#subscription) | Yes      |

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.createSubscription({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
      Subscription: {
        IsEnabled: true,
        NotificationType: 'AnyOfferChanged',
        Destination: {
          AttributeList: [
            {
              Key: 'sqsQueueUrl',
              Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
            },
          ],
          DeliveryChannel: 'SQS',
        },
      }
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### getSubscription
**Parameters**

| Name             | Type        | Example                       | Required |
| ---------------- | ----------- | ----------------------------- | -------- |
| MarketplaceId    | string      | `'A2EUQ1WTGCTBG2'`            | Yes      |
| NotificationType | string      | `'AnyOfferChanged'`           | Yes      |
| Destination      | Destination | [`Destination`](#destination) | Yes      |

* [Possible values for NotificationType](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_NotificationType.html)

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.getSubscription({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
      NotificationType: 'AnyOfferChanged',
      Destination: {
        AttributeList: [
          {
            Key: 'sqsQueueUrl',
            Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
          },
        ],
        DeliveryChannel: 'SQS',
      },
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)

### deleteSubscription
**Parameters**

| Name             | Type        | Example                       | Required |
| ---------------- | ----------- | ----------------------------- | -------- |
| MarketplaceId    | string      | `'A2EUQ1WTGCTBG2'`            | Yes      |
| NotificationType | string      | `'AnyOfferChanged'`           | Yes      |
| Destination      | Destination | [`Destination`](#destination) | Yes      |

* [Possible values for NotificationType](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_NotificationType.html)

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.deleteSubscription({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
      NotificationType: 'AnyOfferChanged',
      Destination: {
        AttributeList: [
          {
            Key: 'sqsQueueUrl',
            Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
          },
        ],
        DeliveryChannel: 'SQS',
      },
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### listSubscriptions
**Parameters**
| Name          | Type   | Example            | Required |
| ------------- | ------ | ------------------ | -------- |
| MarketplaceId | string | `'A2EUQ1WTGCTBG2'` | Yes      |


**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.listSubscriptions({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)

### updateSubscription
**Parameters**
| Name          | Type         | Example                         | Required |
| ------------- | ------------ | ------------------------------- | -------- |
| MarketplaceId | string       | `'A2EUQ1WTGCTBG2'`              | Yes      |
| Subscription  | Subscription | [`Subscription`](#subscription) | Yes      |

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.updateSubscription({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
      Subscription: {
        IsEnabled: true,
        NotificationType: 'AnyOfferChanged',
        Destination: {
          AttributeList: [
            {
              Key: 'sqsQueueUrl',
              Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
            },
          ],
          DeliveryChannel: 'SQS',
        },
      }
    })
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### getServiceStatus
**Parameters**

| None |
| ---- |


**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.getServiceStatus()
```

**Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START FULFILLMENTINVENTORY////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## FulfillmentInventory

[Amazon MWS Fulfillment Inventory official documentation](http://docs.developer.amazonservices.com/en_CA/fba_inventory/FBAInventory_Overview.html)

### listInventorySupply
**Parameters**
| Name               | Type     | Example            | Required                                                                      |
| ------------------ | -------- | ------------------ | ----------------------------------------------------------------------------- |
| SellerSkus         | string[] | `['SAMPLESKU']`    | Yes, if QueryStartDateTime is not specified. Specifying both returns an error |
| QueryStartDateTime | Date     | `new Date()`       | Yes, if SellerSkus is not specified. Specifying both returns an error         |
| ResponseGroup      | string   | `'Basic'`          | No                                                                            |
| MarketplaceId      | string   | `'A2EUQ1WTGCTBG2'` | No                                                                            |

* [Possible values for ResponseGroup](http://docs.developer.amazonservices.com/en_CA/fba_inventory/FBAInventory_ListInventorySupply.html)

**Example**

```typescript
const fulfillmentInventory = new FulfillmentInventory(httpClient)
const [response, meta] = fulfillmentInventory.listInventorySupply({
  SellerSkus: ['SAMPLESKU'],
})
```

**Response**

[See fulfillment inventory test snapshot](../test/unit/__snapshots__/fulfillment-inventory.test.ts.snap)

### listInventorySupplyByNextToken
**Parameters**
| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const fulfillmentInventory = new FulfillmentInventory(httpClient)
const [response, meta] = fulfillmentInventory.listInventorySupplyByNextToken(new NextToken('ListInventorySupply', '123'))
```

**Response**

[See fulfillment inventory test snapshot](../test/unit/__snapshots__/fulfillment-inventory.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const fulfillmentInventory = new FulfillmentInventory(httpClient)
const [response, meta] = fulfillmentInventory.getServiceStatus()
```

**Response**

[See fulfillment inventory test snapshot](../test/unit/__snapshots__/fulfillment-inventory.test.ts.snap)

---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START FEEDS///////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->


## Feeds

[Amazon MWS Feeds API official documentation](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_Overview.html)

### submitFeed
**Parameters**
| Name              | Type     | Example                 | Required |
| ----------------- | -------- | ----------------------- | -------- |
| FeedContent       | string   | `'<XML></XML>'`         | Yes      |
| FeedType          | string   | `'_POST_PRODUCT_DATA_'` | Yes      |
| MarketplaceIdList | string[] | `['A2EUQ1WTGCTBG2']`    | No       |
| PurgeAndReplace   | boolean  | `false`                 | No       |
| AmazonOrderId     | string   | `'902-3159896-1390916'` | No       |
| DocumentId        | string   | `'DCMNTID'`             | No       |

* `FeedContent` is the actual content of the feed itself, in XML or flat file format as a string.

**Example**

```typescript
const feeds = new Feeds(httpClient)
const [response, meta] = feeds.submitFeed({
  FeedContent: getMyXmlFileAsString(),
  FeedType: '_POST_PRODUCT_DATA_',
})
```

**Response**

[See feeds test snapshot](../test/unit/__snapshots__/feeds.test.ts.snap)

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)
### getFeedSubmissionList
**Parameters**

| Name                     | Type     | Example                             | Required |
| ------------------------ | -------- | ----------------------------------- | -------- |
| FeedSubmissionIdList     | string[] | `['FEEDID']`                        | No       |
| MaxCount                 | number   | `10`                                | No       |
| FeedTypeList             | string[] | `['_POST_PRODUCT_DATA_']`           | No       |
| FeedProcessingStatusList | string[] | `['_AWAITING_ASYNCHRONOUS_REPLY_']` | No       |
| SubmittedFromDate        | Date     | `new Date()`                        | No       |
| SubmittedToDate          | Date     | `new Date()`                        | No       |

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)
* [Possible values for FeedProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedProcessingStatus.html)

**Example**

```typescript
const feeds = new Feeds(httpClient)
const [response, meta] = feeds.getFeedSubmissionList()
```

**Response**

[See feeds test snapshot](../test/unit/__snapshots__/feeds.test.ts.snap)

### getFeedSubmissionListByNextToken
**Parameters**
| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const feeds = new Feeds(httpClient)
const [response, meta] = feeds.getFeedSubmissionListByNextToken(new NextToken('GetFeedSubmissionList', '123'))
```

**Response**

[See feeds test snapshot](../test/unit/__snapshots__/feeds.test.ts.snap)

### getFeedSubmissionCount
**Parameters**

| Name                     | Type     | Example                             | Required |
| ------------------------ | -------- | ----------------------------------- | -------- |
| FeedTypeList             | string[] | `['_POST_PRODUCT_DATA_']`           | No       |
| FeedProcessingStatusList | string[] | `['_AWAITING_ASYNCHRONOUS_REPLY_']` | No       |
| SubmittedFromDate        | Date     | `new Date()`                        | No       |
| SubmittedToDate          | Date     | `new Date()`                        | No       |

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)
* [Possible values for FeedProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedProcessingStatus.html)

**Example**

```typescript
const feeds = new Feeds(httpClient)
const [response, meta] = feeds.getFeedSubmissionCount()
```

**Response**

[See feeds test snapshot](../test/unit/__snapshots__/feeds.test.ts.snap)

### cancelFeedSubmissions
**Parameters**
| Name                 | Type     | Example                   | Required |
| -------------------- | -------- | ------------------------- | -------- |
| FeedSubmissionIdList | string[] | `['FEEDID']`              | No       |
| FeedTypeList         | string[] | `['_POST_PRODUCT_DATA_']` | No       |
| SubmittedFromDate    | Date     | `new Date()`              | No       |
| SubmittedToDate      | Date     | `new Date()`              | No       |

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)

**Example**

```typescript
const feeds = new Feeds(httpClient)
const [response, meta] = feeds.cancelFeedSubmissions()
```

**Response**

[See feeds test snapshot](../test/unit/__snapshots__/feeds.test.ts.snap)


### getFeedSubmissionResult
**Parameters**

| Name             | Type   | Example    | Required |
| ---------------- | ------ | ---------- | -------- |
| FeedSubmissionId | string | `'FEEDID'` | Yes      |

**Example**

```typescript
const feeds = new Feeds(httpClient)
const [response, meta] = feeds.getFeedSubmissionResult({
  FeedSubmissionId: 'FEEDID'
})
```

**Response**

* Amazon MWS returns an XML file that contains the response to a successful request or subscription.
* Response is type `string`

[See feeds test snapshot](../test/unit/__snapshots__/feeds.test.ts.snap)

---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START PRODUCTS////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## Products
[Amazon MWS Finances API official documentation](http://docs.developer.amazonservices.com/en_CA/products/Products_Overview.html)

### Types used in `Products`
#### FeesEstimateRequest
**Properties**

| Name                | Type                | Example                                       | Required |
| ------------------- | ------------------- | --------------------------------------------- | -------- |
| MarketplaceId       | string              | `'A2EUQ1WTGCTBG2'`                            | Yes      |
| IdType              | string              | `'ASIN'`                                      | Yes      |
| IdValue             | string              | `'MY-ASIN-1'`                                 | Yes      |
| PriceToEstimateFees | PriceToEstimateFees | [`PriceToEstimateFees`](#pricetoestimatefees) | Yes      |
| Identifier          | string              | `'request1'`                                  | Yes      |
| IsAmazonFulfilled   | boolean             | `true`                                        | Yes      |

#### PriceToEstimateFees
**Properties**
| Name         | Type      | Example                   | Required |
| ------------ | --------- | ------------------------- | -------- |
| ListingPrice | MoneyType | [`MoneyType`](#moneytype) | Yes      |
| Shipping     | MoneyType | [`MoneyType`](#moneytype) | No       |
| Points       | Points    | [`Points`](#points)       | No       |

#### MoneyType
**Properties**
| Name         | Type   | Example | Required |
| ------------ | ------ | ------- | -------- |
| Amount       | number | `1000`  | No       |
| CurrencyCode | string | `'USD'` | No       |

* [Possible values for CurrencyCode](http://docs.developer.amazonservices.com/en_CA/products/Products_Datatypes.html#MoneyType)

#### Points
**Properties**
| Name                | Type      | Example                   | Required |
| ------------------- | --------- | ------------------------- | -------- |
| PointsNumber        | number    | `1000`                    | Yes      |
| PointsMonetaryValue | MoneyType | [`MoneyType`](#moneytype) | Yes      |

### listMatchingProducts
**Parameters**
| Name           | Type   | Example              | Required |
| -------------- | ------ | -------------------- | -------- |
| MarketplaceId  | string | `'A2EUQ1WTGCTBG2'`   | Yes      |
| Query          | string | `'harry potter dvd'` | Yes      |
| QueryContextId | string | `'ArtsAndCrafts'`    | No       |

* [Possible values for QueryContextId](http://docs.developer.amazonservices.com/en_CA/products/Products_QueryContextIDs.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.listMatchingProducts({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  Query: 'harry potter dvd',
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getMatchingProduct
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| ASINList      | string[] | `['MY-ASIN-1']`    | Yes      |

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getMatchingProduct({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  ASINList: ['MY-ASIN-1'],
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getMatchingProductForId
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| IdType        | string   | `'ASIN'`           | Yes      |
| IdList        | string[] | `['MY-ASIN-1']`    | No       |

* [Possible values for IdType](http://docs.developer.amazonservices.com/en_CA/products/Products_GetMatchingProductForId.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getMatchingProductForId({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  IdType: 'ASIN',
  IdList: ['MY-ASIN-1'],
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getCompetitivePricingForSku
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| SellerSKUList | string[] | `['MY-SKU-1']`     | Yes      |

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getCompetitivePricingForSku({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  SellerSKUList: ['MY-SKU-1'],
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getCompetitivePricingForAsin
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| ASINList      | string[] | `['MY-ASIN-1']`    | Yes      |

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getCompetitivePricingForAsin({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  ASINList: ['MY-ASIN-1'],
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getLowestOfferListingsForSku
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| SellerSKUList | string[] | `['MY-SKU-1']`     | Yes      |
| ItemCondition | string   | `'New'`            | No       |

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getLowestOfferListingsForSku({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  SellerSKUList: ['MY-SKU-1'],
  ItemCondition: 'New',
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getLowestOfferListingsForAsin
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| ASINList      | string[] | `['MY-ASIN-1']`    | Yes      |
| ItemCondition | string   | `'New'`            | No       |

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForASIN.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getLowestOfferListingsForAsin({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  ASINList: ['MY-ASIN-1'],
  ItemCondition: 'New',
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getLowestPricedOffersForSku
**Parameters**
| Name          | Type   | Example            | Required |
| ------------- | ------ | ------------------ | -------- |
| MarketplaceId | string | `'A2EUQ1WTGCTBG2'` | Yes      |
| SellerSKU     | string | `'MY-SKU-1'`       | Yes      |
| ItemCondition | string | `'New'`            | Yes      |

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getLowestPricedOffersForSku({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  SellerSKU: 'MY-SKU-1',
  ItemCondition: 'New',
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getLowestPricedOffersForAsin
**Parameters**
| Name          | Type   | Example            | Required |
| ------------- | ------ | ------------------ | -------- |
| MarketplaceId | string | `'A2EUQ1WTGCTBG2'` | Yes      |
| ASIN          | string | `'MY-ASIN-1'`      | Yes      |
| ItemCondition | string | `'New'`            | Yes      |

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getLowestPricedOffersForAsin({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  ASIN: 'MY-ASIN-1',
  ItemCondition: 'New',
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getMyFeesEstimate
**Parameters**
| Name                    | Type                  | Example                                       | Required |
| ----------------------- | --------------------- | --------------------------------------------- | -------- |
| FeesEstimateRequestList | FeesEstimateRequest[] | [`FeesEstimateRequest`](#feesestimaterequest) | Yes      |

**Example**

```typescript
const moneyType: MoneyType = {
  CurrencyCode: 'USD',
  Amount: 1000,
}

const sampleFee: FeesEstimateRequest = {
  MarketplaceId: '',
  IdType: 'ASIN',
  IdValue: 'ASD',
  PriceToEstimateFees: {
    ListingPrice: moneyType,
  },
  Identifier: 'request1',
  IsAmazonFulfilled: false,
}

const products = new Products(httpClient)
const [response, meta] = products.getMyFeesEstimate({
  FeesEstimateRequestList: [sampleFee]
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getMyPriceForSku
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| SellerSKUList | string[] | `['MY-SKU-1']`     | Yes      |
| ItemCondition | string   | `'New'`            | No       |
* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getMyPriceForSku({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  SellerSKUList: ['MY-SKU-1'],
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getMyPriceForAsin
**Parameters**
| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| ASINList      | string[] | `['MY-ASIN-1']`    | Yes      |
| ItemCondition | string   | `'New'`            | No       |
* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getMyPriceForAsin({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  ASINList: ['MY-ASIN-1'],
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getProductCategoriesForSku
**Parameters**
| Name          | Type   | Example            | Required |
| ------------- | ------ | ------------------ | -------- |
| MarketplaceId | string | `'A2EUQ1WTGCTBG2'` | Yes      |
| SellerSKU     | string | `'MY-SKU-1'`       | Yes      |

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getProductCategoriesForSku({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  SellerSKU: 'MY-SKU-1',
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getProductCategoriesForAsin
**Parameters**
| Name          | Type   | Example            | Required |
| ------------- | ------ | ------------------ | -------- |
| MarketplaceId | string | `'A2EUQ1WTGCTBG2'` | Yes      |
| ASIN          | string | `'MY-ASIN-1'`      | Yes      |

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getProductCategoriesForAsin({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  ASIN: 'MY-ASIN-1',
})
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const products = new Products(httpClient)
const [response, meta] = products.getServiceStatus()
```

**Response**

[See products test snapshot](../test/unit/__snapshots__/products.test.ts.snap)

---
[go back to table of contents](#table-of-contents)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START FINANCES///////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## Finances
[Amazon MWS Finances API official documentation](http://docs.developer.amazonservices.com/en_CA/finances/Finances_Overview.html)

### listFinancialEventGroups
**Parameters**
| Name                             | Type   | Example      | Required |
| -------------------------------- | ------ | ------------ | -------- |
| MaxResultsPerPage                | number | `10`         | No       |
| FinancialEventGroupsStartedAfter | Date   | `new Date()` | Yes      |
| FinancialEventGroupStartedBefore | Date   | `new Date()` | No       |

**Example**

```typescript
const finances = new Finances(httpClient)
const [response, meta] = finances.listFinancialEventGroups({
  FinancialEventGroupsStartedAfter: new Date(),
})
```

**Response**

[See finances test snapshot](../test/unit/__snapshots__/finances.test.ts.snap)

### listFinancialEventGroupsByNextToken
**Parameters**
| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const finances = new Finances(httpClient)
const [response, meta] = finances.listFinancialEventGroupsByNextToken(new NextToken('ListFinancialEventGroups', '123'))
```

**Response**

[See finances test snapshot](../test/unit/__snapshots__/finances.test.ts.snap)

### listFinancialEvents
**Parameters**
| Name                  | Type   | Example                 | Required                                                                                                                                         |
| --------------------- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| MaxResultsPerPage     | number | `10`                    | No                                                                                                                                               |
| AmazonOrderId         | string | `'902-3159896-1390916'` | Yes but you can only specify one of the following filter criteria: AmazonOrderId, FinancialEventGroupId, PostedAfter and optionally PostedBefore |
| FinancialEventGroupId | string | `'FNCLEVTGRPID'`        | Yes but you can only specify one of the following filter criteria: AmazonOrderId, FinancialEventGroupId, PostedAfter and optionally PostedBefore |
| PostedAfter           | Date   | `new Date()`            | Yes but you can only specify one of the following filter criteria: AmazonOrderId, FinancialEventGroupId, PostedAfter and optionally PostedBefore |
| PostedBefore          | Date   | `new Date()`            | No                                                                                                                                               |

**Example**

```typescript
const finances = new Finances(httpClient)
const [response, meta] = finances.listFinancialEvents({
  AmazonOrderId: '902-3159896-1390916',
})
```

**Response**

[See finances test snapshot](../test/unit/__snapshots__/finances.test.ts.snap)

### listFinancialEventsByNextToken
**Parameters**
| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const finances = new Finances(httpClient)
const [response, meta] = finances.listFinancialEvents(new NextToken('ListFinancialEvents', '123'))
```

**Response**

[See finances test snapshot](../test/unit/__snapshots__/finances.test.ts.snap)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START MERCHANTFULFILLMENT/////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## MerchantFulfillemnt

### Types used in MerchantFulfillemnt

#### ShipmentRequestDetails

**Properties**

| Name                   | Type                   | Example                                             | Required |
| ---------------------- | ---------------------- | --------------------------------------------------- | -------- |
| AmazonOrderId          | string                 | `'902-3159896-1390916'`                             | Yes      |
| SellerOrderId          | string                 | `'SellerId'`                                        | No       |
| ItemList               | Item[]                 | `[Item](#item)`                                     | Yes      |
| ShipFromAddress        | Address                | [`Address`](#address)                               | Yes      |
| PackageDimensions      | PackageDimensions      | [`PackageDimensions`](#packagedimensions)           | Yes      |
| Weight                 | Weight                 | [`Weight`](#weight)                                 | Yes      |
| MustArriveByDate       | Date                   | `new Date()`                                        | No       |
| ShipDate               | Date                   | `new Date()`                                        | No       |
| ShippingServiceOptions | ShippingServiceOptions | [`ShippingServiceOptions`](#shippingserviceoptions) | Yes      |
| LabelCustomization     | LabelCustomization     | [`LabelCustomization`](#labelcustomization)         | No       |

#### Item

**Properties**

| Name                      | Type                     | Example                                             | Required |
| ------------------------- | ------------------------ | --------------------------------------------------- | -------- |
| OrderItemId               | string                   | `'1234'`                                            | Yes      |
| Quantity                  | number                   | `1`                                                 | Yes      |
| ItemWeight                | Weight                   | [`Weight`](#weight)                                 | No       |
| ItemDescription           | string                   | `'This is an item'`                                 | No       |
| TransparencyCodeList      | string[]                 | `'CODE'`                                            | No       |
| ItemLevelSellerInputsList | AdditionalSellerInputs[] | [`AdditionalSellerInputs`](#additionalsellerinputs) | Yes      |

#### Address

**Properties**

| Name                | Type                   | Example                 | Required                                                                                                 |
| ------------------- | ---------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Name                | string                 | `'Jane Doe'`            | Yes                                                                                                      |
| AddressLine1        | string                 | `'#123 Address Street'` | Yes                                                                                                      |
| AddressLine2        | string                 | `'Address Boulevard'`   | No                                                                                                       |
| AddressLine3        | string                 | `'Address Town'`        | No                                                                                                       |
| DistrictOrCounty    | string                 | `'Address County'`      | No                                                                                                       |
| Email               | string                 | `'email@example.com'`   | Yes                                                                                                      |
| City                | string                 | `'Gotham City'`         | Yes                                                                                                      |
| StateOrProvinceCode | string                 | `'WI'`                  | No. Required in the Canada, US, and UK marketplaces. Also required for shipments originating from China. |
| PostalCode          | ShippingServiceOptions | `'99501'`               | Yes                                                                                                      |
| CountryCode         | string                 | `'US'`                  | Yes                                                                                                      |
| Phone               | string                 | `'5555551234'`          | Yes                                                                                                      |

#### PackageDimensions

**Properties**

| Name                        | Type   | Example            | Required                                                                        |
| --------------------------- | ------ | ------------------ | ------------------------------------------------------------------------------- |
| Length                      | number | `10`               | No. Unless a value for `PredefinedPackageDimensions` is not specified           |
| Width                       | number | `10`               | No. Unless a value for `PredefinedPackageDimensions` is not specified           |
| Height                      | number | `10`               | No. Unless a value for `PredefinedPackageDimensions` is not specified           |
| Unit                        | string | `'inches'`         | No. Unless a value for `PredefinedPackageDimensions` is not specified           |
| PredefinedPackageDimensions | string | `'FedEx_Box_10kg'` | No. Unless values for `Length`, `Width`, `Height` and `Unit` were not specified |

* Possible values for `Unit`: '`inches'` or `'centimeters'`
* [Possible values for PredefinedPackageDimensions](http://docs.developer.amazonservices.com/en_CA/merch_fulfill/MerchFulfill_PrePackDimenEnum.html)

#### Weight

**Parameters**
| Name  | Type   | Example    | Required |
| ----- | ------ | ---------- | -------- |
| Value | number | `10`       | Yes      |
| Unit  | string | `'ounces'` | Yes      |

* Possible values for `Unit`: `'ounces'` or `'grams'`

#### ShippingServiceOptions

**Parameters**

| Name               | Type           | Example                                    | Required |
| ------------------ | -------------- | ------------------------------------------ | -------- |
| DeliveryExperience | number         | `'DeliveryConfirmationWithAdultSignature'` | Yes      |
| DeclaredValue      | CurrencyAmount | [`CurrencyAmount`](#currencyamount)        | No       |
| CarrierWillPickUp  | boolean        | `false`                                    | Yes      |
| LabelFormat        | string         | `Label Format`                             | No       |

* [Possible values for DeliveryExperience](http://docs.developer.amazonservices.com/en_CA/merch_fulfill/MerchFulfill_Datatypes.html#ShippingServiceOptions)

#### LabelCustomization

**Parameters**

| Name               | Type   | Example                | Required |
| ------------------ | ------ | ---------------------- | -------- |
| CustomTextForLabel | string | `'CustomTextForLabel'` | No       |
| StandardIdForLabel | string | `'StandardIdForLabel'` | No       |

#### AdditionalSellerInputs
**Parameters**

| Name                  | Type                  | Example                                           | Required |
| --------------------- | --------------------- | ------------------------------------------------- | -------- |
| DataType              | string                | `'SENDER_ADDRESS_TRANSLATED'`                     | Yes      |
| AdditionalSellerInput | AdditionalSellerInput | [`AdditionalSellerInput`](#additionalsellerinput) | Yes      |

#### AdditionalSellerInput
**Parameters**

| Name             | Type              | Example                                    | Required |
| ---------------- | ----------------- | ------------------------------------------ | -------- |
| DataType         | string            | `'String'`                                 | Yes      |
| ValueAsString    | string            | `'MyValue'`                                | No       |
| ValueAsBoolean   | boolean           | `false`                                    | No       |
| ValueAsInteger   | number            | `10`                                       | No       |
| ValueAsTimestamp | Date              | `new Date()`                               | No       |
| ValueAsAddress   | Address           | [`Address`](#address)                      | No       |
| ValueAsWeight    | Weight            | [`Weight`](#weight)                        | No       |
| ValueAsDimension | PackageDimensions | [`PackageDimensions`](#packagedimensions)` | No       |
| ValueAsCurrency  | CurrencyAmount    | [`CurrencyAmount`](#currencyamount)        | No       |

* Possible values for `DataType`:   `'String'`, `'Boolean'`, `'Integer'`, `'Timestamp'`, `'Address'`, `'Weight'`, `'Dimension'`, `'Currency'`,

#### CurrencyAmount
**Parameters**
| Name         | Type   | Example | Required |
| ------------ | ------ | ------- | -------- |
| CurrencyCode | string | `'USD'` | Yes      |
| Amount       | number | `100`   | Yes      |

#### LabelFormatOption
**Parameters**
| Name                        | Type    | Example | Required |
| --------------------------- | ------- | ------- | -------- |
| IncludePackingSlipWithLabel | boolean | `true`  | Yes      |

#### ShippingOfferingFilter
**Parameters**
| Name                          | Type    | Example | Required |
| ----------------------------- | ------- | ------- | -------- |
| IncludeComplexShippingOptions | boolean | `true`  | No       |

### getEligibleShippingServices

**Parameters**

| Name                   | Type                   | Example                                             | Required |
| ---------------------- | ---------------------- | --------------------------------------------------- | -------- |
| ShipmentRequestDetails | ShipmentRequestDetails | [`ShipmentRequestDetails`](#shipmentrequestdetails) | Yes      |
| ShippingOfferingFilter | ShippingOfferingFilter | [`ShippingOfferingFilter`](#shippingofferingfilter) | No       |

**Example**

```typescript
    const Address = {
      Name: '',
      AddressLine1: '',
      Email: '',
      City: '',
      PostalCode: '',
      CountryCode: '',
      Phone: '',
    }

    const PackageDimensions = {
      PredefinePackageDimensions: 'FedEx_Box_10kg',
    }

    const Weight = {
      Value: 1,
      Unit: 'ounces',
    }

    const ShippingServiceOptions = {
      DeliveryExperience: 'DeliveryConfirmationWithAdultSignature',
      CarrierWillPickup: false,
    }

    const ShipmentRequestDetails = {
      AmazonOrderId: '',
      SellerOrderId: '',
      ItemList: [],
      ShipFromAddress: Address,
      PackageDimensions,
      Weight,
      MustArriveByDate: new Date(),
      ShipDate: new Date(),
      ShippingServiceOptions,
    }

    const parameters = {
      ShipmentRequestDetails,
    }

    const merchantFulfillment = new MerchantFulfillment(httpClient)
    const [response, meta] = merchantFulfillment.getEligibleShippingServices(parameters)
```

**Response**

[See merchant fulfillment test snapshot](../test/unit/__snapshots__/merchant-fulfillment.test.ts.snap)

### getAddtionalSellerInputs

**Parameters**

| Name              | Type    | Example               | Required |
| ----------------- | ------- | --------------------- | -------- |
| OrderId           | string  | `'ORDERID'`           | Yes      |
| ShippingServiceId | number  | `'SHIPPINGSERVICEID'` | Yes      |
| ShipFromAddress   | Address | [`Address`](#address) | Yes      |

**Example**

```typescript
    const Address = {
      Name: '',
      AddressLine1: '',
      Email: '',
      City: '',
      PostalCode: '',
      CountryCode: '',
      Phone: '',
    }

    const parameters = {
      OrderId: 'ORDERID',
      ShippingServiceId: 'SHIPPINGSERVICEID',
      ShipmentRequestDetails,
    }

    const merchantFulfillment = new MerchantFulfillment(httpClient)
    const [response, meta] = merchantFulfillment.getAdditionalSellerInputs(parameters)
```

**Response**

[See merchant fulfillment test snapshot](../test/unit/__snapshots__/merchant-fulfillment.test.ts.snap)

### createShipment

**Parameters**

| Name                          | Type                     | Example                                               | Required |
| ----------------------------- | ------------------------ | ----------------------------------------------------- | -------- |
| ShipmentRequestDetails        | ShipmentRequestDetails   | [`ShipmentRequestDetails`](#shipmentrequestdetails)   | Yes      |
| ShippingServiceId             | string                   | `'SHIPPINGSERVICEID'`                                 | Yes      |
| ShippingServiceOfferId        | string                   | `'ShippingServiceOfferId'`                            | No       |
| HazmatType                    | string                   | `'LQHazmat'`                                          | No       |
| LabelFormatOption             | LabelFormatOption        | [`LabelFormatOption`](#labelformatoption)             | No       |
| ShipmentLevelSellerInputsList | AdditionalSellerInputs[] | [`[AdditionalSellerInputs]`](#additionalsellerinputs) | No       |

* [Possible values for HazmatType](http://docs.developer.amazonservices.com/en_CA/merch_fulfill/MerchFulfill_Datatypes.html#HazmatType)

**Example**

```typescript
    const Address = {
      Name: '',
      AddressLine1: '',
      Email: '',
      City: '',
      PostalCode: '',
      CountryCode: '',
      Phone: '',
    }

    const PackageDimensions = {
      PredefinePackageDimensions: 'FedEx_Box_10kg',
    }

    const Weight = {
      Value: 1,
      Unit: 'ounces',
    }

    const ShippingServiceOptions = {
      DeliveryExperience: 'DeliveryConfirmationWithAdultSignature',
      CarrierWillPickup: false,
    }

    const ShipmentRequestDetails = {
      AmazonOrderId: '',
      SellerOrderId: '',
      ItemList: [],
      ShipFromAddress: Address,
      PackageDimensions,
      Weight,
      MustArriveByDate: new Date(),
      ShipDate: new Date(),
      ShippingServiceOptions,
    }

    const parameters = {
      ShipmentRequestDetails,
      ShippingServiceId: 'SHIPPINGSERVICEID',
    }

    const merchantFulfillment = new MerchantFulfillment(httpClient)
    const [response, meta] = merchantFulfillment.createShipment(parameters)
```


**Response**

[See merchant fulfillment test snapshot](../test/unit/__snapshots__/merchant-fulfillment.test.ts.snap)

### getShipment

| Name       | Type   | Example     -  | Required |
| ---------- | ------ | -------------- | -------- |
| ShipmentId | string | `'SHIPMENTID'` | Yes      |

**Example**

```typescript
    const parameters = { ShipmentId: 'SHIPMENTID' }

    const merchantFulfillment = new MerchantFulfillment(httpClient)
    const [response, meta] = merchantFulfillment.getShipment(parameters)
```

**Response**

[See merchant fulfillment test snapshot](../test/unit/__snapshots__/merchant-fulfillment.test.ts.snap)

### cancelShipment 

| Name       | Type   | Example     -  | Required |
| ---------- | ------ | -------------- | -------- |
| ShipmentId | string | `'SHIPMENTID'` | Yes      |

**Example**

```typescript
    const parameters = { ShipmentId: 'SHIPMENTID' }

    const merchantFulfillment = new MerchantFulfillment(httpClient)
    const [response, meta] = merchantFulfillment.cancelShipment(parameters)
```

**Response**

[See merchant fulfillment test snapshot](../test/unit/__snapshots__/merchant-fulfillment.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const merchantFulfillment = new MerchantFulfillment(httpClient)
const [response, meta] = merchantFulfillment.getServiceStatus()
```

**Response**

[See merchant fulfillment test snapshot](../test/unit/__snapshots__/merchant-fulfillment.test.ts.snap)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START SHIPMENTINVOICING///////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->


## ShipmentInvoicing

### getFbaOutboundShipmentDetail

**Parameters**

| Name             | Type   | Example            | Required |
| ---------------- | ------ | ------------------ | -------- |
| MarketplaceId    | string | `'A2EUQ1WTGCTBG2'` | Yes      |
| AmazonShipmentId | string | `'SHIPMENTID'`     | Yes      |

**Example**

```typescript
const parameters = {
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  AmazonShipmentId: 'SHIPMENTID',
}

const shipmentInvoicing = new ShipmentInvoicing(httpClient)
const [response, meta] = shipmentInvoicing.getFbaOutboundShipmentDetail(parameters)
```

**Response**

[See shipment invoicing test snapshot](../test/unit/__snapshots__/shipment-invoicing.test.ts.snap)

### submitFBAOutboundShipmentInvoice

**Parameters**
| Name             | Type   | Example            | Required |
| ---------------- | ------ | ------------------ | -------- |
| MarketplaceId    | string | `'A2EUQ1WTGCTBG2'` | Yes      |
| AmazonShipmentId | string | `'SHIPMENTID'`     | Yes      |
| InvoiceContent   | string | `'<XML></XML>'`    | Yes      |

**Example**
```typescript
const parameters = {
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  AmazonShipmentId: 'SHIPMENTID',
  InvoiceContent: '<XML></XML>',
}

const shipmentInvoicing = new ShipmentInvoicing(httpClient)
const [response, meta] = shipmentInvoicing.submitFBAOutboundShipmentInvoice(parameters)
```

**Response**

[See shipment invoicing test snapshot](../test/unit/__snapshots__/shipment-invoicing.test.ts.snap)


### getFBAOutboundShipmentInvoiceStatus

**Parameters**

| Name             | Type   | Example            | Required |
| ---------------- | ------ | ------------------ | -------- |
| MarketplaceId    | string | `'A2EUQ1WTGCTBG2'` | Yes      |
| AmazonShipmentId | string | `'SHIPMENTID'`     | Yes      |

**Example**
```typescript
const parameters = {
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  AmazonShipmentId: 'SHIPMENTID',
}

const shipmentInvoicing = new ShipmentInvoicing(httpClient)
const [response, meta] = shipmentInvoicing.getFBAOutboundShipmentInvoiceStatus(parameters)
```

[See shipment invoicing test snapshot](../test/unit/__snapshots__/shipment-invoicing.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const shipmentInvoicing = new ShipmentInvoicing(httpClient)
const [response, meta] = shipmentInvoicing.getServiceStatus()
```

**Response**

[See shipment invoicing test snapshot](../test/unit/__snapshots__/shipment-invoicing.test.ts.snap)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////START RECOMMENDATIONS/////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->


## Recommendations 

[Amazon MWS Recommendations API official documentation](http://docs.developer.amazonservices.com/en_CA/recommendations/Recommendations_Overview.html)

### Types used in Recommendations

#### CategoryQuery

| Name                   | Type   | Example               | Required |
| ---------------------- | ------ | --------------------- | -------- |
| RecommendationCategory | string | `'Selection '`        | Yes      |
| FilterOptions          | string | `'QualitySet=Defect'` | Yes      |

* [Possible values for RecommendationCategory and FilterOptions ](http://docs.developer.amazonservices.com/en_CA/recommendations/Recommendations_ListRecommendations.html)

### getLastUpdatedTimeForRecommendations

**Parameters**

| Name          | Type   | Example     -      | Required |
| ------------- | ------ | ------------------ | -------- |
| MarketplaceId | string | `'A2EUQ1WTGCTBG2'` | Yes      |

**Example**

```typescript
const parameters = { MarketplaceId: 'A2EUQ1WTGCTBG2' }

const recommendations = new Recommendations(httpClient)
const [response, meta] = recommendations.getLastUpdatedTimeForRecommendations(parameters)
```

**Response**

[See recommendations test snapshot](../test/unit/__snapshots__/recommendations.test.ts.snap)

### listRecommendations

**Parameters**

| Name                   | Type            | Example     -                       | Required                                                                        |
| ---------------------- | --------------- | ----------------------------------- | ------------------------------------------------------------------------------- |
| MarketplaceId          | string          | `'A2EUQ1WTGCTBG2'`                  | Yes                                                                             |
| RecommendationCategory | string          | `'Inventory'`                       | No. To retrieve all recommendations, do not specify a value for this parameter. |
| CategoryQueryList      | CategoryQuery[] | [`[CategoryQuery]`](#categoryquery) | No                                                                              |

* [Possible values for RecommendationCategory ](http://docs.developer.amazonservices.com/en_CA/recommendations/Recommendations_ListRecommendations.html)

**Example**

```typescript
const parameters = { MarketplaceId: 'A2EUQ1WTGCTBG2' }

const recommendations = new Recommendations(httpClient)
const [response, meta] = recommendations.listRecommendations(parameters)
```

**Response**

[See recommendations test snapshot](../test/unit/__snapshots__/recommendations.test.ts.snap)


### listRecommendationsByNextToken

**Parameters**

| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const parameters = { MarketplaceId: 'A2EUQ1WTGCTBG2' }

const recommendations = new Recommendations(httpClient)
const [response, meta] = recommendations.listRecommendationsByNextToken(new NextToken('ListRecommendations', '123'))
```

**Response**

[See recommendations test snapshot](../test/unit/__snapshots__/recommendations.test.ts.snap)


### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const recommendations = new Recommendations(httpClient)
const [response, meta] = recommendations.getServiceStatus()
```

**Response**

[See recommendations test snapshot](../test/unit/__snapshots__/recommendations.test.ts.snap)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////START FULFILLMENTINBOUNDSHIPMENT///////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## FulfillmentInboundShipment 

[Amazon MWS FulfillmentInboundShipment API official documentation](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_Overview.html)

### Types used in FulfillmentInboundShipment

#### Address

**Properties**

| Name                | Type                   | Example                 | Required                                                                                                                                                                                                                          |
| ------------------- | ---------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name                | string                 | `'Jane Doe'`            | Yes                                                                                                                                                                                                                               |
| AddressLine1        | string                 | `'#123 Address Street'` | Yes                                                                                                                                                                                                                               |
| AddressLine2        | string                 | `'Address Boulevard'`   | No                                                                                                                                                                                                                                |
| City                | string                 | `'Gotham City'`         | Yes                                                                                                                                                                                                                               |
| DistrictOrCounty    | string                 | `'Address County'`      | No                                                                                                                                                                                                                                |
| StateOrProvinceCode | string                 | `'WI'`                  | No. If state or province codes are used in your marketplace, it is recommended that you include one with your request. This helps Amazon to select the most appropriate Amazon fulfillment center for your inbound shipment plan. |
| CountryCode         | string                 | `'US'`                  | Yes                                                                                                                                                                                                                               |
| PostalCode          | ShippingServiceOptions | `'99501'`               | No. If postal codes are used in your marketplace, it is recommended that you include one with your request. This helps Amazon to select the most appropriate Amazon fulfillment center for your inbound shipment plan             |

#### InboundShipmentPlanRequestItem

**Properties**

| Name            | Type        | Example                       | Required |
| --------------- | ----------- | ----------------------------- | -------- |
| SellerSKU       | string      | `'Jane Doe'`                  | Yes      |
| ASIN            | string      | `'#123 Address Street'`       | No       |
| Condition       | string      | `'Address Boulevard'`         | No       |
| Quantity        | number      | `'Gotham City'`               | Yes      |
| QuantityInCase  | number      | `'Address County'`            | No       |
| PrepDetailsList | PrepDetails | [`PrepDetails`](#prepdetails) | No       |

#### PrepDetails

**Properties**

| Name            | Type   | Example         | Required |
| --------------- | ------ | --------------- | -------- |
| PrepInstruction | string | `'Polybagging'` | Yes      |
| PrepOwner       | string | `'AMAZON'`      | No       |

* [Possible values for PrepInstruction ](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_Datatypes.html#PrepInstruction)
* [Possible values for PrepOwner ](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_Datatypes.html#PrepDetails)


#### InboundShipmentHeader

**Properties**

| Name                           | Type    | Example                 | Required |
| ------------------------------ | ------- | ----------------------- | -------- |
| ShipmentName                   | string  | `'SHIPMENT_NAME'`       | Yes      |
| ShipFromAddress                | Address | [`Address`](#address-1) | Yes      |
| DestinationFulfillmentCenterId | string  | `'ABE2'`                | Yes      |
| LabelPrepPreference            | string  | `'SELLER_LABEL'`        | Yes      |
| AreCasesRequired               | boolean | `true`                  | No       |
| ShipmentStatus                 | string  | `'WORKING'`             | Yes      |
| IntendedBoxContentsSource      | string  | `'NONE'`                | No       |

* [Possible values for LabelPrepPreference, ShipmentStatus, IntendedBoxContentsSource ](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_Datatypes.html#InboundShipmentHeader)

#### InboundShipmentItem

**Properties**

| Name                  | Type          | Example                       | Required |
| --------------------- | ------------- | ----------------------------- | -------- |
| ShipmentId            | string        | `'SKU00001'`                  | No       |
| SellerSKU             | string        | `'SKU00001'`                  | Yes      |
| FulfillmentNetworkSKU | string        | `'SKU00001'`                  | No       |
| QuantityShipped       | number        | `1`                           | Yes      |
| QuantityReceived      | number        | `1`                           | No       |
| QuantityInCase        | number        | `1`                           | No       |
| PrepDetailsList       | PrepDetails[] | [`PrepDetails`](#prepdetails) | No       |
| ReleaseDate           | Date          | `new Date()`                  | No       |

#### TransportDetailInput

**Properties**

| Name                        | Type                             | Example                                                                 | Required                                                                      |
| --------------------------- | -------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| PartneredSmallParcelData    | PartneredSmallParcelDataInput    | [`PartneredSmallParcelDataInput`](#partneredsmallparceldatainput)       | Yes, if no other element from the TransportDetailInput datatype is specified. |
| NonPartneredSmallParcelData | NonPartneredSmallParcelDataInput | [`NonPartneredSmallParcelDataInput`](#nonpartneredsmallparceldatainput) | Yes, if no other element from the TransportDetailInput datatype is specified. |
| PartneredLtlData            | PartneredLtlDataInput            | [`PartneredLtlDataInput`](#partneredltldatainput)                       | Yes, if no other element from the TransportDetailInput datatype is specified. |
| NonPartneredLtlData         | NonPartneredLtlDataInput         | [`NonPartneredLtlDataInput`](#nonpartneredltldatainput)                 | Yes, if no other element from the TransportDetailInput datatype is specified. |


#### Dimensions

**Properties**

| Name   | Type   | Example  | Required |
| ------ | ------ | -------- | -------- |
| Unit   | string | `inches` | Yes      |
| Length | number | `1`      | Yes      |
| Width: | number | `1`      | Yes      |
| Height | number | `1`      | Yes      |

* Possible values for `Unit`: `'inches'`, `'centimeters'`

#### Weight

**Properties**

| Name  | Type   | Example  | Required |
| ----- | ------ | -------- | -------- |
| Unit  | string | `pounds` | Yes      |
| Value | number | `1`      | Yes      |


* Possible values for `Unit`: `'pounds'`, `'kilograms'`

#### PartneredSmallParcelPackageInput

**Properties**

| Name       | Type       | Example                     | Required |
| ---------- | ---------- | --------------------------- | -------- |
| Dimensions | Dimensions | [`Dimensions`](#dimensions) | Yes      |
| Weight     | Weight     | [`Weight`](#weight)         | Yes      |


#### PartneredSmallParcelDataInput

**Properties**
| Name        | Type                               | Example                                                                   | Required |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------- | -------- |
| CarrierName | string                             | `'UNITED_PARCEL_SERVICE_INC'`                                             | Yes      |
| PackageList | PartneredSmallParcelPackageInput[] | [`[PartneredSmallParcelPackageInput]`](#partneredsmallparcelpackageinput) | Yes      |


#### NonPartneredSmallParcelPackageOutput

**Properties**
| Name       | Type   | Example   | Required |
| ---------- | ------ | --------- | -------- |
| TrackingId | string | `'12345'` | Yes      |

#### NonPartneredSmallParcelDataInput

**Properties**
| Name        | Type                                   | Example                                                                           | Required |
| ----------- | -------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| CarrierName | string                                 | `'UNITED_PARCEL_SERVICE_INC'`                                                     | Yes      |
| PackageList | NonPartneredSmallParcelPackageOutput[] | [`[NonPartneredSmallParcelPackageOutput]`](#nonpartneredsmallparcelpackageoutput) | Yes      |

#### Contact

**Properties**

| Name  | Type   | Example               | Required |
| ----- | ------ | --------------------- | -------- |
| Name  | string | `'Name McPerson'`     | Yes      |
| Phone | string | `'12345678'`          | Yes      |
| Email | string | `'email@example.com'` | Yes      |
| Fax   | string | `'12345678'`          | Yes      |

#### Pallet

**Properties**

| Name      | Type       | Example                     | Required |
| --------- | ---------- | --------------------------- | -------- |
| Dimension | Dimensions | [`Dimensions`](#dimensions) | Yes      |
| Weight    | Weight     | [`Weight`](#weight)         | No       |
| IsStacked | boolean    | `true`                      | Yes      |


#### Amount

**Properties**

| Name         | Type   | Example | Required |
| ------------ | ------ | ------- | -------- |
| CurrencyCode | string | `'USD'` | Yes      |
| Value        | number | `100`   | Yes      |

#### PartneredLtlDataInput

**Properties**

| Name                | Type     | Example               | Required |
| ------------------- | -------- | --------------------- | -------- |
| Contact             | Contact  | [`Contact`](#contact) | Yes      |
| BoxCount            | number   | `100`                 | Yes      |
| SellerFreightClass  | string   | `'50'`                | No       |
| FreightReadyDate    | Date     | `new Date()`          | Yes      |
| PalletList          | Pallet[] | [`[Pallet]`](#pallet) | No       |
| TotalWeight         | Weight   | [`Weight`](#weight)   | No       |
| SellerDeclaredValue | Amount   | [`Amount`](#amount)   | No       |

#### NonPartneredLtlDataInput

| Name     | Type   | Example           | Required |
| -------- | ------ | ----------------- | -------- |
| Contact  | string | `'BUSINESS_POST'` | Yes      |
| BoxCount | string | `'1234'`          | Yes      |

### getInboundGuidanceForSku

**Parameters**

| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| SellerSKUList | string[] | `['MY-SKU-1']`     | Yes      |

**Example**

```typescript
const fis = new fis(httpClient)
const [response, meta] = fis.getInboundGuidanceForSku({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  SellerSKUList: ['MY-SKU-1'],
})
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getInboundGuidanceForAsin

**Parameters**

| Name          | Type     | Example            | Required |
| ------------- | -------- | ------------------ | -------- |
| MarketplaceId | string   | `'A2EUQ1WTGCTBG2'` | Yes      |
| ASINList      | string[] | `['MY-ASIN-1']`    | Yes      |

**Example**

```typescript
const fis = new fis(httpClient)
const [response, meta] = fis.getInboundGuidanceForAsin({
  MarketplaceId: 'A2EUQ1WTGCTBG2',
  SellerSKUList: ['MY-ASIN-1'],
})
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)


### createInboundShipmentPlan

**Parameters**

| Name                            | Type                             | Example                                                               | Required                                                                                 |
| ------------------------------- | -------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ShipFromAddress                 | Address                          | [`Address`](#address-1)                                               | Yes                                                                                      |
| ShipToCountryCode               | string                           | `'US'`                                                                | No. Specifying both ShipToCountryCode and ShipToCountrySubdivisionCode returns an error. |
| ShipToCountrySubdivisionCode    | string                           | `IN-AP`                                                               | No. Specifying both ShipToCountryCode and ShipToCountrySubdivisionCode returns an error. |
| LabelPrepPreference             | string                           | `AMAZON_LABEL_ONLY`                                                   | No                                                                                       |
| InboundShipmentPlanRequestItems | InboundShipmentPlanRequestItem[] | [`[InboundShipmentPlanRequestItem]`](#inboundshipmentplanrequestitem) | Yes                                                                                      |

* [Possible values for LabelPrepPreference ](http://docs.developer.amazonservices.com/en_CA/recommendations/Recommendations_ListRecommendations.html)

**Example**

```typescript
const mockAddress = {
  Name: '',
  AddressLine1: '',
  Email: '',
  City: '',
  PostalCode: '',
  CountryCode: '',
  Phone: '',
}

const mockInboundShipmentPlanRequestItem = {
  SellerSKU: '',
  Quantity: 1,
}

const parameters = {
  ShipFromAddress: mockAddress,
  InboundShipmentPlanRequestItems: [mockInboundShipmentPlanRequestItem],
}

const fis = new fis(httpClient)
const [response, meta] = fis.createInboundShipmentPlan(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### createInboundShipment

**Parameters**

| Name                  | Type                  | Example                                             | Required |
| --------------------- | --------------------- | --------------------------------------------------- | -------- |
| ShipmentId            | string                | `'SHPMNTID'`                                        | Yes      |
| InboundShipmentHeader | InboundShipmentHeader | [`InboundShipmentHeader`](#inboundshipmentheader)   | Yes      |
| InboundShipmentItems  | InboundShipmentItem[] | [`[InboundShipmentItem]`](#inboundshipmentplanitem) | Yes      |

**Example**

```typescript
const mockInboundShipmentItem = {
  SellerSKU: '',
  QuantityShipped: 1,
}

const mockAddress = {
  Name: '',
  AddressLine1: '',
  Email: '',
  City: '',
  PostalCode: '',
  CountryCode: '',
  Phone: '',
}

const mockInboundShipmentHeader: InboundShipmentHeader = {
  ShipmentName: '',
  ShipFromAddress: mockAddress,
  DestinationFulfillmentCenterId: '',
  LabelPrepPreference: 'SELLER_LABEL',
  ShipmentStatus: 'WORKING',
}

const parameters = {
  ShipmentId: '',
  InboundShipmentHeader: mockInboundShipmentHeader,
  InboundShipmentItems: [mockInboundShipmentItem],
}

const fis = new fis(httpClient)
const [response, meta] = fis.createInboundShipment(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)


### updateInboundShipment

**Parameters**

| Name                  | Type                  | Example                                           | Required |
| --------------------- | --------------------- | ------------------------------------------------- | -------- |
| ShipmentId            | string                | `'SHPMNTID'`                                      | Yes      |
| InboundShipmentHeader | InboundShipmentHeader | [`InboundShipmentHeader`](#inboundshipmentheader) | Yes      |
| InboundShipmentItems  | InboundShipmentItem[] | [`[InboundShipmentItem]`](#inboundshipmentitem)   | Yes      |

**Example**

```typescript
const mockInboundShipmentItem = {
  SellerSKU: '',
  QuantityShipped: 1,
}

const mockAddress = {
  Name: '',
  AddressLine1: '',
  Email: '',
  City: '',
  PostalCode: '',
  CountryCode: '',
  Phone: '',
}

const mockInboundShipmentHeader: InboundShipmentHeader = {
  ShipmentName: '',
  ShipFromAddress: mockAddress,
  DestinationFulfillmentCenterId: '',
  LabelPrepPreference: 'SELLER_LABEL',
  ShipmentStatus: 'WORKING',
}

const parameters = {
  ShipmentId: '',
  InboundShipmentHeader: mockInboundShipmentHeader,
  InboundShipmentItems: [mockInboundShipmentItem],
}

const fis = new fis(httpClient)
const [response, meta] = fis.updateInboundShipment(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getPreorderInfo

**Parameters**

| Name       | Type   | Example      | Required |
| ---------- | ------ | ------------ | -------- |
| ShipmentId | string | `'SHPMNTID'` | Yes      |

**Example**

```typescript

const parameters = {
  ShipmentId: '',
}

const fis = new fis(httpClient)
const [response, meta] = fis.getPreorderInfo(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### confirmPreorder

**Parameters**

| Name       | Type   | Example      | Required |
| ---------- | ------ | ------------ | -------- |
| ShipmentId | string | `'SHPMNTID'` | Yes      |
| NeedByDate | Date   | `new Date()` | Yes      |

**Example**

```typescript

const parameters = {
  ShipmentId: '',
  NeedByDate: new Date()
}

const fis = new fis(httpClient)
const [response, meta] = fis.confirmPreorder(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getPrepInstructionsForSku

**Parameters**

| Name              | Type     | Example        | Required |
| ----------------- | -------- | -------------- | -------- |
| SellerSKUList     | string[] | `['MY-SKU-1']` | Yes      |
| ShipToCountryCode | string   | `'US'`         | Yes      |

**Example**

```typescript

const parameters = {
  SellerSKUList: ['MY-SKU-1'],
  ShipToCountryCode: 'US'
}

const fis = new fis(httpClient)
const [response, meta] = fis.getPrepInstructionsForSku(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getPrepInstructionsForAsin

**Parameters**

| Name              | Type     | Example         | Required |
| ----------------- | -------- | --------------- | -------- |
| ASINList          | string[] | `['MY-ASIN-1']` | Yes      |
| ShipToCountryCode | string   | `'US'`          | Yes      |

**Example**

```typescript

const parameters = {
  ASINList: ['MY-ASIN-1'],
  ShipToCountryCode: 'US'
}

const fis = new fis(httpClient)
const [response, meta] = fis.getPrepInstructionsForAsin(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### putTransportContent

**Parameters**

| Name             | Type                 | Example                                         | Required |
| ---------------- | -------------------- | ----------------------------------------------- | -------- |
| ShipmentId       | string               | `'SHPMNTID'`                                    | Yes      |
| IsPartnered      | boolean              | `true`                                          | Yes      |
| ShipmentType     | string               | `'SP'`                                          | Yes      |
| TransportDetails | TransportDetailInput | [`TransportDetailInput`](#transportdetailinput) | Yes      |

* [Possible values for ShipmentType ](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_PutTransportContent.html)

**Example**

```typescript
const mockPartneredSmallParcelPackageInput = {
  Dimensions: {
    Unit: 'inches',
    Length: 1,
    Width: 1,
    Height: 1,
  },
  Weight: {
    Unit: 'pounds',
    Value: 1,
  },
}

const mockTransportDetailInput = {
  PartneredSmallParcelData: {
    CarrierName: '',
    PackageList: [mockPartneredSmallParcelPackageInput],
  },
}

const parameters = {
  ShipmentId: '',
  IsPartnered: true,
  ShipmentType: 'SP',
  TransportDetails: mockTransportDetailInput,
}

const fis = new fis(httpClient)
const [response, meta] = fis.putTransportContent(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### estimateTransportRequest

**Parameters**

| Name       | Type   | Example      | Required |
| ---------- | ------ | ------------ | -------- |
| ShipmentId | string | `'SHPMNTID'` | Yes      |

**Example**

```typescript

const parameters = {
  ShipmentId: '',
}

const fis = new fis(httpClient)
const [response, meta] = fis.estimateTransportRequest(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getTransportContent

**Parameters**

| Name       | Type   | Example      | Required |
| ---------- | ------ | ------------ | -------- |
| ShipmentId | string | `'SHPMNTID'` | Yes      |

**Example**

```typescript

const parameters = {
  ShipmentId: '',
}

const fis = new fis(httpClient)
const [response, meta] = fis.estimateTransportRequest(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### confirmTransportRequest

**Parameters**

| Name       | Type   | Example      | Required |
| ---------- | ------ | ------------ | -------- |
| ShipmentId | string | `'SHPMNTID'` | Yes      |

**Example**

```typescript

const parameters = {
  ShipmentId: '',
}

const fis = new fis(httpClient)
const [response, meta] = fis.confirmTransportRequest(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### voidTransportRequest

**Parameters**

| Name       | Type   | Example      | Required |
| ---------- | ------ | ------------ | -------- |
| ShipmentId | string | `'SHPMNTID'` | Yes      |

**Example**

```typescript

const parameters = {
  ShipmentId: '',
}

const fis = new fis(httpClient)
const [response, meta] = fis.voidTransportRequest(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getPackageLabels

**Parameters**

| Name             | Type   | Example                   | Required |
| ---------------- | ------ | ------------------------- | -------- |
| ShipmentId       | string | `'SHPMNTID'`              | Yes      |
| PageType         | string | `'PackageLabel_Letter_2'` | Yes      |
| NumberOfPackages | number | `1`                       | No       |

* [Possible values for PageType](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_GetPackageLabels.html)

**Example**

```typescript

const parameters = {
  ShipmentId: '',
  PageType: 'PackageLabel_Letter_2',
}

const fis = new fis(httpClient)
const [response, meta] = fis.getPackageLabels(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getUniquePackageLabels

**Parameters**

| Name                 | Type     | Example                   | Required |
| -------------------- | -------- | ------------------------- | -------- |
| ShipmentId           | string   | `'SHPMNTID'`              | Yes      |
| PageType             | string   | `'PackageLabel_Letter_2'` | Yes      |
| PackageLabelsToPrint | string[] | `['CartonA', 'CartonB']`  | Yes      |

* [Possible values for PageType](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_GetPackageLabels.html)

**Example**

```typescript

const parameters = {
  ShipmentId: '',
  PageType: 'PackageLabel_Letter_2',
  PackageLabelsToPring: ['CartonA', 'CartonB'],
}

const fis = new fis(httpClient)
const [response, meta] = fis.getUniquePackageLabels(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getPalletLabels

**Parameters**

| Name            | Type   | Example                   | Required |
| --------------- | ------ | ------------------------- | -------- |
| ShipmentId      | string | `'SHPMNTID'`              | Yes      |
| PageType        | string | `'PackageLabel_Letter_2'` | Yes      |
| NumberOfPallets | number | `10`                      | Yes      |

* [Possible values for PageType](http://docs.developer.amazonservices.com/en_CA/fba_inbound/FBAInbound_GetPackageLabels.html)

**Example**

```typescript

const parameters = {
  ShipmentId: '',
  PageType: 'PackageLabel_Letter_2',
  NumberOfPallets: 10,
}

const fis = new fis(httpClient)
const [response, meta] = fis.getPalletLabels(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getBillOfLading

**Parameters**

| Name       | Type   | Example      | Required |
| ---------- | ------ | ------------ | -------- |
| ShipmentId | string | `'SHPMNTID'` | Yes      |

**Example**

```typescript

const parameters = {
  ShipmentId: '',
}

const fis = new fis(httpClient)
const [response, meta] = fis.voidTransportRequest(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### listInboundShipments

**Parameters**

| Name               | Type     | Example         | Required                                                                                                                                                          |
| ------------------ | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ShipmentStatusList | string[] | `['FBA44JV8R']` | Yes, if ShipmentIdList is not specified. If both ShipmentStatusList and ShipmentIdList are specified, only shipments that match both parameters are returned.     |
| ShipmentIdList     | string[] | `['SHPMNTID']`  | Yes, if ShipmentStatusList is not specified. If both ShipmentStatusList and ShipmentIdList are specified, only shipments that match both parameters are returned. |
| LastUpdatedAfter   | Date     | `new Date()`    | No, If LastUpdatedBefore is specified, then LastUpdatedAfter must be specified.                                                                                   |
| LastUpdatedBefore  | Date     | `new Date()`    | No, If LastUpdatedAfter is specified, then LastUpdatedBefore must be specified.                                                                                   |

**Example**

```typescript
const parameters = {
  ShipmentStatusList: ['WORKING'],
  ShipmentIdList: [''],
}

const fis = new fis(httpClient)
const [response, meta] = fis.listInboundShipments(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### listInboundShipmentsByNextToken

**Parameters**

| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const nextToken = new NextToken('ListInboundShipments', '123')

const fis = new fis(httpClient)
const [response, meta] = fis.listInboundShipmentsByNextToken(nextToken)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### listInboundShipmentItems

**Parameters**

| Name              | Type   | Example       | Required                                                                                                                                          |
| ----------------- | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ShipmentId        | string | `'FBA44JV8R'` | Yes, if LastUpdatedAfter and LastUpdatedBefore are not specified. If ShipmentId is specified, LastUpdatedBefore and LastUpdatedAfter are ignored. |
| LastUpdatedAfter  | Date   | `new Date()`  | Yes, if ShipmentId is not specified. If LastUpdatedBefore is specified, then LastUpdatedAfter must be specified.                                  |
| LastUpdatedBefore | Date   | `new Date()`  | Yes, if ShipmentId is not specified. If LastUpdatedAfter is specified, then LastUpdatedBefore must be specified.                                  |

**Example**

```typescript
const parameters = {
  ShipmentStatusList: ['WORKING'],
  ShipmentIdList: [''],
}

const fis = new fis(httpClient)
const [response, meta] = fis.listInboundShipments(parameters)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### listInboundShipmentItemsByNextToken

**Parameters**

| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const nextToken = new NextToken('ListInboundShipmentItems', '123')

const fis = new fis(httpClient)
const [response, meta] = fis.listInboundShipmentItemsByNextToken(nextToken)
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const fis = new FulfillmentInboundShipment(httpClient)
const [response, meta] = fis.getServiceStatus()
```

**Response**

[See FulfillmentInboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-inbound-shipment.test.ts.snap)


<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////START FULFILLMENTOUTBOUNDSHIPMENT//////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->


## FulfillmentOutboundShipment

### Types used in FulfillmentOutboundShipment

#### Address

**Properties**

| Name                | Type                   | Example                 | Required                                                                                                 |
| ------------------- | ---------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Name                | string                 | `'Jane Doe'`            | Yes                                                                                                      |
| Line1               | string                 | `'#123 Address Street'` | Yes                                                                                                      |
| Line2               | string                 | `'Address Boulevard'`   | No                                                                                                       |
| Line3               | string                 | `'Address Town'`        | No                                                                                                       |
| DistrictOrCounty    | string                 | `'Address County'`      | No                                                                                                       |
| City                | string                 | `'Gotham City'`         | Yes                                                                                                      |
| StateOrProvinceCode | string                 | `'WI'`                  | No. Required in the Canada, US, and UK marketplaces. Also required for shipments originating from China. |
| CountryCode         | string                 | `'US'`                  | Yes                                                                                                      |
| PostalCode          | ShippingServiceOptions | `'99501'`               | Yes                                                                                                      |
| PhoneNumber         | string                 | `'5555551234'`          | Yes                                                                                                      |


#### GetFulfillmentPreviewItem

**Properties**

| Name                         | Type   | Example       | Required |
| ---------------------------- | ------ | ------------- | -------- |
| SellerSKU                    | string | `'MY-SKU-1'`  | Yes      |
| SellerFulfillmentOrderItemId | string | `'FLFLMNTID'` | Yes      |
| Quantity                     | number | `123`         | Yes      |

#### Currency

| Name         | Type   | Example  | Required |
| ------------ | ------ | -------- | -------- |
| CurrencyCode | string | `USD`    | Yes      |
| Value        | string | `123.12` | Yes      |

#### CODSettings

**Properties**

| Name              | Type     | Example                 | Required |
| ----------------- | -------- | ----------------------- | -------- |
| IsCODRequired     | boolean  | `true`                  | No       |
| CODCharge         | Currency | [`Currency`](#currency) | No       |
| CODChargeTax      | Currency | [`Currency`](#currency) | No       |
| ShippingCharge    | Currency | [`Currency`](#currency) | No       |
| ShippingChargeTax | Currency | [`Currency`](#currency) | No       |

#### CreateFulfillmentOrderItem

**Properties**

| Name                         | Type     | Example                 | Required |
| ---------------------------- | -------- | ----------------------- | -------- |
| SellerSKU                    | string   | `MY-SKU-1`              | Yes      |
| SellerFulfillmentOrderItemId | string   | `'FLFLMNTID'`           | Yes      |
| Quantity                     | number   | `12`                    | Yes      |
| GiftMessage                  | string   | `'My message'`          | No       |
| DisplayableComment           | string   | `'My comment'`          | No       |
| FulfillmentNetworkSKU        | string   | `'MY-SKU-2'`            | No       |
| PerUnitDeclaredValue         | Currency | [`Currency`](#currency) | No       |
| PerUnitPrice                 | Currency | [`Currency`](#currency) | No       |
| PerUnitTax                   | Currency | [`Currency`](#currency) | No       |

#### DeliveryWindow

**Properties**

| Name          | Type | Example      | Required |
| ------------- | ---- | ------------ | -------- |
| StartDateTime | Date | `new Date()` | Yes      |
| EndDateTime   | Date | `new Date()` | Yes      |

#### CreateReturnItem

**Properties**
| Name                         | Type   | Example         | Required |
| ---------------------------- | ------ | --------------- | -------- |
| SellerReturnItemId           | string | `RETURNID`      | Yes      |
| SellerFulfillmentOrderItemId | string | `'FLFLMNTID'`   | Yes      |
| AmazonShipmentId             | number | `ABCAMAZONID`   | Yes      |
| ReturnReasonCode             | string | `'REASON-CODE'` | Yes      |
| ReturnComment                | string | `'My comment'`  | No       |

* The return reason code assigned to the return item by the seller. Get valid return reason codes by calling the [`listReturnReasonCodes`](#listreturnreasoncodes) operation.

### getFulfillmentPreview
**Parameters**
| Name                         | Type                        | Example                                                     | Required |
| ---------------------------- | --------------------------- | ----------------------------------------------------------- | -------- |
| MarketplaceId                | string                      | `'A2EUQ1WTGCTBG2'`                                          | No       |
| Address                      | Address                     | [`Address`](#address-2)                                     | Yes      |
| Items                        | GetFulfillmentPreviewItem[] | [`[GetFulfillmentPreviewItem]`](#getfulfillmentpreviewitem) | Yes      |
| ShippingSpeedCategories      | string                      | `'Standard'`                                                | No       |
| IncludeCODFulfillmentPreview | boolean                     | `true`                                                      | No       |
| IncludeDeliveryWindows       | boolean                     | `true`                                                      | No       |

* [Possible values for ShippingSpeedCategories](http://docs.developer.amazonservices.com/en_CA/fba_outbound/FBAOutbound_GetFulfillmentPreview.html)

**Example**

```typescript

const mockAddress = {
  Name: '',
  Line1: '',
  Line2: '',
  Line3: '',
  DistrictOrCounty: '',
  City: '',
  StateOrProvinceCode: '',
  CountryCode: '',
  PostalCode: '',
  PhoneNumber: '',
}

const mockGetFulfillmentPreviewItem = {
  SellerSKU: '',
  SellerFulfillmentOrderItemId: '',
  Quantity: 1,
}


const parameters = {
  Address: mockAddress,
  Items: [mockGetFulfillmentPreviewItem],
}


const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.getFulfillmentPreview(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### createFulfillmentOrder
**Parameters**

| Name                     | Type                         | Example                                                       | Required                                                           |
| ------------------------ | ---------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| MarketplaceId            | string                       | `'A2EUQ1WTGCTBG2'`                                            | No                                                                 |
| SellerFulfillmentOrderId | string                       | `'FLFLMNTID'`                                                 | Yes                                                                |
| FulfillmentAction        | string                       | `'Ship'`                                                      | No                                                                 |
| DisplayableOrderId       | string                       | `'ORDERID'`                                                   | Yes                                                                |
| DisplayableOrderDateTime | Date                         | `new Date()`                                                  | Yes                                                                |
| DisplayableOrderComment  | string                       | `Some Comment`                                                | Yes                                                                |
| ShippingSpeedCategory    | string                       | `Standard`                                                    | Yes                                                                |
| DestinationAddress       | Address                      | [`Address`](#address-2)                                       | Yes                                                                |
| FulfillmentPolicy        | string                       | `FillAll`                                                     | No                                                                 |
| NotificationEmailList    | string[]                     | `['email@example.com']`                                       | No                                                                 |
| CODSettings              | CODSettings                  | [`CODSettings`](#codsettings)                                 | No                                                                 |
| Items                    | CreateFulfillmentOrderItem[] | [`[CreateFulfillmentOrderItem]`](#createfulfillmentorderitem) | Yes                                                                |
| DeliveryWindow           | DeliveryWindow               | [`DeliveryWindow`](#deliverywindow)                           | No. Required only if ShippingSpeedCategory = `'ScheduledDelivery'` |

* [Possible values for FulfillmentAction, FulfillmentPolicy](http://docs.developer.amazonservices.com/en_CA/fba_outbound/FBAOutbound_CreateFulfillmentOrder.html)

**Example**

```typescript

const mockAddress = {
  Name: '',
  Line1: '',
  Line2: '',
  Line3: '',
  DistrictOrCounty: '',
  City: '',
  StateOrProvinceCode: '',
  CountryCode: '',
  PostalCode: '',
  PhoneNumber: '',
}

const mockCreateFulfillmentOrderItem = {
  SellerSKU: '',
  SellerFulfillmentOrderItemId: '',
  Quantity: 1,
}

const parameters = {
  SellerFulfillmentOrderId: '',
  DisplayableOrderId: '',
  DisplayableOrderDateTime: new Date(),
  DisplayableOrderComment: '',
  ShippingSpeedCategory: 'Priority',
  DestinationAddress: mockAddress,
  Items: [mockCreateFulfillmentOrderItem],
}

const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.createFulfillmentOrder(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### updateFulfillmentOrder
**Parameters**

| Name                     | Type                         | Example                                                       | Required |
| ------------------------ | ---------------------------- | ------------------------------------------------------------- | -------- |
| MarketplaceId            | string                       | `'A2EUQ1WTGCTBG2'`                                            | No       |
| SellerFulfillmentOrderId | string                       | `'FLFLMNTID'`                                                 | Yes      |
| FulfillmentAction        | string                       | `'Ship'`                                                      | No       |
| DisplayableOrderId       | string                       | `'ORDERID'`                                                   | No       |
| DisplayableOrderDateTime | Date                         | `new Date()`                                                  | No       |
| DisplayableOrderComment  | string                       | `Some Comment`                                                | No       |
| ShippingSpeedCategory    | string                       | `Standard`                                                    | No       |
| DestinationAddress       | Address                      | [`Address`](#address-2)                                       | No       |
| FulfillmentPolicy        | string                       | `FillAll`                                                     | No       |
| NotificationEmailList    | string[]                     | `['email@example.com']`                                       | No       |
| Items                    | CreateFulfillmentOrderItem[] | [`[CreateFulfillmentOrderItem]`](#createfulfillmentorderitem) | No       |

* [Possible values for ShippingSpeedCategory, FulfillmentAction, FulfillmentPolicy](http://docs.developer.amazonservices.com/en_CA/fba_outbound/FBAOutbound_UpdateFulfillmentOrder.html)

**Example**

```typescript
const parameters = {
  SellerFulfillmentOrderId: '',
}


const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.updateFulfillmentOrder(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### listAllFulfillmentOrders
**Parameters**

| Name               | Type | Example      | Required |
| ------------------ | ---- | ------------ | -------- |
| QueryStartDateTime | Date | `new Date()` | No       |

**Example**

```typescript
const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.listAllFulfillmentOrders()
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### getFulfillmentOrder
**Parameters**

| Name                     | Type   | Example           | Required |
| ------------------------ | ------ | ----------------- | -------- |
| SellerFulfillmentOrderId | string | `'SELLERORDERID'` | Yes      |

**Example**

```typescript
const parameters = { SellerFulfillmentOrderId: '' }

const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.getFulfillmentOrder(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### listAllFulfillmentOrdersByNextToken
**Parameters**

| Name      | Type      | Example                                                                                                      | Required |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| NextToken | NextToken | `new NextToken('action', 'nexttoken')`<br>[See examples for sample usage ](../examples/using-next-tokens.ts) | Yes      |

**Example**

```typescript
const nextToken = new NextToken('ListFinancialEvents', '123')

const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.listAllFulfillmentOrdersByNextToken(nextToken)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### getPackageTrackingDetails
**Parameters**

| Name          | Type   | Example | Required |
| ------------- | ------ | ------- | -------- |
| PackageNumber | number | `1234`  | Yes      |

**Example**

```typescript
const parameters = { PackageNumber: 1234 }

const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.getPackageTrackingDetails(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### cancelFulfillmentOrder
**Parameters**

| Name                     | Type   | Example     | Required |
| ------------------------ | ------ | ----------- | -------- |
| SellerFulfillmentOrderId | string | `'ORDERID'` | Yes      |

**Example**

```typescript
const parameters = { SellerFulfillmentOrderId: 'ORDERID' }

const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.cancelFulfillmentOrder(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### listReturnReasonCodes
**Parameters**

| Name                     | Type   | Example            | Required                                                     |
| ------------------------ | ------ | ------------------ | ------------------------------------------------------------ |
| MarketplaceId            | string | `'A2EUQ1WTGCTBG2'` | No. Not required if `SellerFulfillmentOrderId` is specified. |
| SellerFulfillmentOrderId | string | `'ORDERID'`        | No. Not required if `MarketplaceId` is specified.            |
| SellerSKU                | string | `'SELLERSKU'`      | Yes                                                          |
| Language                 | string | `'fr_CA'`          | No                                                           |

**Example**

```typescript
const parameters = {
  SellerFulfillmentOrderId: '',
  SellerSKU: '',
}

const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.listReturnReasonCodes(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### createFulfillmentReturn
**Parameters**

| Name                     | Type               | Example                                 | Required |
| ------------------------ | ------------------ | --------------------------------------- | -------- |
| SellerFulfillmentOrderId | string             | `'ORDERID'`                             | Yes      |
| Items                    | CreateReturnItem[] | [`CreateReturnItem`](#createreturnitem) | Yes      |

**Example**

```typescript
const mockCreateReturnItem = {
  SellerReturnItemId: '',
  SellerFulfillmentOrderItemId: '',
  AmazonShipmentId: '',
  ReturnReasonCode: '',
}

const parameters = {
  SellerFulfillmentOrderId: '',
  Items: [mockCreateReturnItem],
}


const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.createFulfillmentReturn(parameters)
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const fos = new FulfillmentOutboundShipment(httpClient)
const [response, meta] = fos.getServiceStatus()
```

**Response**

[See FulfillmentOutboundShipment test snapshot](../test/unit/__snapshots__/fulfillment-outbound-shipment.test.ts.snap)

<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////START EASYSHIP/////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////////// -->

## EasyShip

### Types used in EasyShip

#### Dimensions

**Properties**

| Name   | Type   | Example      | Required |
| ------ | ------ | ------------ | -------- |
| Length | number | `1`          | Yes      |
| Width  | number | `1`          | Yes      |
| Height | number | `1`          | Yes      |
| Unit   | string | `cm`         | Yes      |
| Name   | string | `Identifier` | No       |

* Unlike other sections `EasyShip` documentation does not specify possible values for `Unit`

#### Weight

**Properties**

| Name  | Type   | Example | Required |
| ----- | ------ | ------- | -------- |
| Value | number | `10`    | Yes      |
| Unit  | string | `'g'`   | Yes      |

* Unlike other sections `EasyShip` documentation does not specify possible values for `Unit`

#### Item
**Properties**

| Name                      | Type     | Example          | Required |
| ------------------------- | -------- | ---------------- | -------- |
| OrderItemId               | string   | `'AMZONORDERID'` | Yes      |
| OrderItemSerialNumberList | string[] | `['1234']`       | Yes      |

#### PickupSlot
**Properties**

| Name            | Type   | Example          | Required |
| --------------- | ------ | ---------------- | -------- |
| SlotId          | string | `'AMZONORDERID'` | Yes      |
| PickupTimeStart | Date   | `new Date()`     | No       |
| PickupTimeEnd   | Date   | `new Date()`     | No       |


#### PackageRequestDetails

**Properties**

| Name              | Type       | Example                       | Required |
| ----------------- | ---------- | ----------------------------- | -------- |
| PackageDimensions | Dimensions | [`Dimensions`](#dimensions-1) | No       |
| PackageWeight     | Weight     | [`Weight`](#weight-2)         | No       |
| PackageItemList   | Item[]     | [`[Item]`](#item-1)           | No       |
| PackagePickupSlot | PickupSlot | [`PickupSlot`](#pickupslot)   | Yes      |
| PackageIdentifier | strign     | `'PackageIdentifier'`         | No       |

#### ScheduledPackageUpdateDetails

**Properties**

| Name               | Type               | Example                                     | Required |
| ------------------ | ------------------ | ------------------------------------------- | -------- |
| ScheduledPackageId | ScheduledPackageId | [`ScheduledPackageId`](#scheduledpackageid) | No       |
| PackagePickupSlot  | PickupSlot         | [`PickupSlot`](#pickupslot)                 | Yes      |

#### ScheduledPackageId
**Properties**

| Name          | Type   | Example          | Required |
| ------------- | ------ | ---------------- | -------- |
| AmazonOrderId | string | `'AMZONORDERID'` | Yes      |
| PackageId     | string | `'PKGID'`        | Yes      |


### listPickupSlots

**Parameters**

| Name              | Type       | Example                       | Required |
| ----------------- | ---------- | ----------------------------- | -------- |
| MarketplaceId     | string     | `'A2EUQ1WTGCTBG2'`            | Yes      |
| AmazonOrderId     | string     | `'AMZONORDERID'`              | Yes      |
| PackageDimensions | Dimensions | [`Dimensions`](#dimensions-1) | Yes      |
| PackageWeight     | Weight     | [`Weight`](#weight-2)         | Yes      |

**Example**

```typescript
const mockDimensions = {
  Length: 1,
  Width: 1,
  Height: 1,
  Unit: 'cm',
}

const mockWeight = {
  Value: 1,
  Unit: 'g',
}

const parameters = {
  MarketplaceId: '',
  AmazonOrderId: '',
  PackageDimensions: mockDimensions,
  PackageWeight: mockWeight,
}

const easyShip = new EasyShip(httpClient)
const [response, meta] = easyShip.listPickupSlots(parameters)
```

**Response**

[See EasyShip test snapshot](../test/unit/__snapshots__/easy-ship.test.ts.snap)


### createScheduledPackage

**Parameters**

| Name                  | Type                  | Example                                           | Required |
| --------------------- | --------------------- | ------------------------------------------------- | -------- |
| AmazonOrderId         | string                | `'AMZONORDERID'`                                  | Yes      |
| MarketplaceId         | string                | `'A2EUQ1WTGCTBG2'`                                | Yes      |
| PackageRequestDetails | PackageRequestDetails | [`PackageRequestDetails`](#packagerequestdetails) | Yes      |

**Example**

```typescript
const mockPickupSlot = {
  SlotId: '',
  PickupTimeStart: new Date(),
  PickupTimeEnd: new Date(),
}

const mockPackageRequestDetails = {
  PackagePickupSlot: mockPickupSlot,
}
const parameters = {
  AmazonOrderId: '',
  MarketplaceId: '',
  PackageRequestDetails: mockPackageRequestDetails,
}

const easyShip = new EasyShip(httpClient)
const [response, meta] = easyShip.createScheduledPackage(parameters)
```

**Response**

[See EasyShip test snapshot](../test/unit/__snapshots__/easy-ship.test.ts.snap)

### updateScheduledPackages

**Parameters**

| Name                              | Type                            | Example                                                             | Required |
| --------------------------------- | ------------------------------- | ------------------------------------------------------------------- | -------- |
| AmazonOrderId                     | string                          | `'AMZONORDERID'`                                                    | Yes      |
| ScheduledPackageUpdateDetailsList | ScheduledPackageUpdateDetails[] | [`[ScheduledPackageUpdateDetails]`](#scheduledpackageupdatedetails) | Yes      |

**Example**

```typescript

const mockScheduledPackageId = {
  AmazonOrderId: '',
}

const mockPickupSlot = {
  SlotId: '',
  PickupTimeStart: new Date(),
  PickupTimeEnd: new Date(),
}

const mockScheduledPackageUpdateDetails = {
  ScheduledPackageId: mockScheduledPackageId,
  PackagePickupSlot: mockPickupSlot,
}
const parameters = {
  MarketplaceId: '',
  ScheduledPackageUpdateDetailsList: [mockScheduledPackageUpdateDetails],
}

const easyShip = new EasyShip(httpClient)
const [response, meta] = easyShip.updateScheduledPackages(parameters)
```

**Response**

[See EasyShip test snapshot](../test/unit/__snapshots__/easy-ship.test.ts.snap)

### getScheduledPackage

**Parameters**

| Name               | Type               | Example                                     | Required |
| ------------------ | ------------------ | ------------------------------------------- | -------- |
| ScheduledPackageId | ScheduledPackageId | [`ScheduledPackageId`](#scheduledpackageid) | Yes      |
| MarketplaceId      | string             | `'A2EUQ1WTGCTBG2'`                          | Yes      |

**Example**

```typescript

const mockScheduledPackageId = {
  AmazonOrderId: '',
}

const parameters = {
  ScheduledPackageId: mockScheduledPackageId,
  MarketplaceId: '',
}

const easyShip = new EasyShip(httpClient)
const [response, meta] = easyShip.getScheduledPackage(parameters)
```

**Response**

[See EasyShip test snapshot](../test/unit/__snapshots__/easy-ship.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
| ---- |

**Example**

```typescript
const easyShip = new EasyShip(httpClient)
const [response, meta] = easyShip.getServiceStatus()
```

**Response**

[See EasyShip test snapshot](../test/unit/__snapshots__/easy-ship.test.ts.snap)
