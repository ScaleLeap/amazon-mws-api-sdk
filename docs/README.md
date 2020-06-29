# Table of Contents
- [Table of Contents](#table-of-contents)
- [Basics](#basics)
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
    - [Types used in Subscriptions](#types-used-in-subscriptions)
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
    - [Types used in Products](#types-used-in-products)
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
    - [getLowestPricedOffersForSku](#getlowestpricedoffersforsku-1)
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

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# Basics

amazon-mws-api-sdk is divided up into different sections representing the different sections of the Amazon MWS API.
Under each section are methods that perform "actions" on the MWS API parses the response, returns it and the request metadata in a JS object

## Basic example

```typescript
const [response, meta] = (new Orders(httpClient)).listMarketplaceParticipations()

const { ListParticipations } = response
const { requestId, timestamp } = meta

console.log(`
  Request ${requestId} made on ${timestamp.toISOString()} returned ${ListParticipations.length} participations!
`)
// Request 598a82be-d4ed-4bb6-802d-8e9150036d43 made on 2020-10-05T14:48:00.000Z returned 2 participations!
```

Each action returns a tuple containing [0] the actual request data and [1] the request metadata

## Actual request data

The actual request data varies between actions. Outside of some exceptions, all request data has been defined.
Finding out the properties of the response object should be as easy as using your text editor's autocomplete 

## Request Metadata**

This is consistent for all actions

**Structure**

| Name           	| Type   	| Example                                	| Description                                	|
|----------------	|--------	|----------------------------------------	|--------------------------------------------	|
| requestId      	| string 	| '598a82be-d4ed-4bb6-802d-8e9150036d43' 	| Amazon MWS Request Id                      	|
| timestamp      	| Date   	| new Date()                             	| Timestamp of the request                   	|
| quotaMax       	| number 	| 200                                    	| Max requests for throttling purposes       	|
| quotaRemaining 	| number 	| 100                                    	| Requests remaining for throttling purposes 	|
| quotaResetOn   	| Date   	| new Date()                             	| Date the quota resets                      	|

["Throttling: Limits to how often you can submit requests"](http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_Throttling.html)

# Sections

## Sellers

[Amazon MWS Sellers API official documentation](http://docs.developer.amazonservices.com/en_CA/sellers/Sellers_Overview.html)

### listMarketplaceParticipations

**Parameters**

| None |
|------|

**Example**

```typescript
const sellers = new Sellers(httpClient)
const [response, meta] = sellers.listMarketplaceParticipations()
```

**Sample Response**

[See sellers test snapshot](../test/unit/__snapshots__/sellers.test.ts.snap)

### listMarketplaceParticipationsByNextToken

**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

**Example**

```typescript
const sellers = new Sellers(httpClient)
const [response, meta] = sellers.listMarketplaceParticipationsByNextToken(new NextToken('ListMarketplaceParticipations', '123'))
```

**Sample Response**

[See sellers test snapshot](../test/unit/__snapshots__/sellers.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
|------|

**Example**

```typescript
const sellers = new Sellers(httpClient)
const [response, meta] = sellers.getServiceStatus()
```

**Sample Response**

[See sellers test snapshot](../test/unit/__snapshots__/sellers.test.ts.snap)


## Orders

[Amazon MWS Orders API official documentation](http://docs.developer.amazonservices.com/en_CA/orders-2013-09-01/Orders_Overview.html)

### listOrders
**Parameters**

| Name               | Type     | Example                    | Required                                |
|--------------------|----------|----------------------------|-----------------------------------------|
| CreatedAfter       | Date     | new Date()                 | Yes if LastUpdatedAfter is not provided |
| CreatedBefore      | Date     | new Date()                 | No                                      |
| LastUpdatedAfter   | Date     | new Date()                 | Yes if CreatedAfter is not provided     |
| LastUpdatedBefore  | Date     | new Date()                 | No                                      |
| OrderStatus        | string   | 'PendingAvailability'      | No                                      |
| MarketplaceId      | string[] | ['A2EUQ1WTGCTBG2']         | No                                      |
| FulfillmentChannel | string[] | ['AFN']                    | No                                      |
| PaymentMethod      | string[] | ['COD']                    | No                                      |
| BuyerEmail         | string   | 'buyer@example.com'        | No                                      |
| SellerOrderId      | string   | 'STRINGID'                 | No                                      |
| MaxResultsPerPage  | number   | 10                         | No                                      |
| EasyShipmentStatus | string[] | ['PendingPickUp']          | No                                      |

* [Possible values for FulfillmentChannel, PaymentMethod and EasyShipmentStatus ](http://docs.developer.amazonservices.com/en_CA/orders-2013-09-01/Orders_ListOrders.html)

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrders({ createdAfter: new Date() })
```

**Sample Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)


### listOrdersByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |


**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrdersByNextToken(new NextToken('ListOrders', '123'))
```

**Sample Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### getOrder
**Parameters**
| Name          | Type     | Example                 | Required |
|---------------|----------|-------------------------|----------|
| AmazonOrderId | string[] | ['902-3159896-1390916'] | Yes      |

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.getOrder({ AmazonOrderId: ['902-3159896-1390916'] })
```

**Sample Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### listOrderItems
**Parameters**
| Name          | Type   | Example               | Required |
|---------------|--------|-----------------------|----------|
| AmazonOrderId | string | '902-3159896-1390916' | Yes      |

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrderItems({ AmazonOrderId: '902-3159896-1390916' })
```

**Sample Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### listOrderItemsByNextToken

**Parameters**

| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.listOrderItemsByNextToken(new NextToken('ListOrderItems', '123'))
```

**Sample Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
|------|

**Example**

```typescript
const orders = new Orders(httpClient)
const [response, meta] = orders.getServiceStatus()
```

**Sample Response**

[See orders test snapshot](../test/unit/__snapshots__/orders.test.ts.snap)

## Reports

[Amazon MWS Reports API official documentation](http://docs.developer.amazonservices.com/en_CA/reports/Reports_Overview.html)

### requestReport
**Parameters**
| Name              	| Type     	| Example                              	  | Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportType        	| string   	| `'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'` 	| Yes      	|
| StartDate         	| Date     	| jsnew Date()                           	| No       	|
| EndDate           	| Date     	| new Date()                           	  | No       	|
| ReportOptions     	| string   	| 'Report Option'                      	  | No       	|
| MarketplaceIdList 	| string[] 	| ['A2EUQ1WTGCTBG2']                   	  | No       	|

* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.requestReport({ ReportType: '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_' })
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)


### getReportRequestList
**Parameters**
| Name                       	| Type     	| Example                                	| Required                                                                      	|
|----------------------------	|----------	|----------------------------------------	|-------------------------------------------------------------------------------	|
| ReportRequestIdList        	| string[] 	| ['12345']                              	| No. If you pass in ReportRequestId values, other query conditions are ignored 	|
| ReportTypeList             	| string[] 	| [`'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`] 	| No                                                                            	|
| ReportProcessingStatusList 	| string[] 	| ['_SUBMITTED_']                        	| No                                                                            	|
| MaxCount                   	| number   	| 10                                     	| No                                                                            	|
| RequestedFromDate          	| Date     	| new Date()                             	| No                                                                            	|
| RequestedToDate            	| Date     	| new Date()                             	| No                                                                            	|

* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestList.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportRequestList()
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportRequestListByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportRequestListByNextToken(new NextToken('GetReportRequestList', '123'))
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)


### getReportRequestCount
**Parameters**
| Name                       	| Type     	| Example                                	| Required 	|
|----------------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList             	| string[] 	| [`'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`] 	| No       	|
| ReportProcessingStatusList 	| string[] 	| ['_SUBMITTED_']                        	| No       	|
| RequestedFromDate          	| Date     	| new Date()                             	| No       	|
| RequestedToDate            	| Date     	| new Date()                             	| No       	|
* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestCount.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportRequestCount()
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)


### cancelReportRequests
**Parameters**

| Name                       	| Type     	| Example                                	| Required 	|
|----------------------------	|----------	|----------------------------------------	|----------	|
| ReportRequestIdList        	| string[] 	| ['12345']                              	| No       	|
| ReportTypeList             	| string[] 	| [`'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`] 	| No       	|
| ReportProcessingStatusList 	| string[] 	| ['_SUBMITTED_']                        	| No       	|
| RequestedFromDate          	| Date     	| new Date()                             	| No       	|
| RequestedToDate            	| Date     	| new Date()                             	| No       	|

* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestList.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.cancelReportRequests()
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportList
**Parameters**

| Name                	| Type     	| Example                                	| Required 	|
|---------------------	|----------	|----------------------------------------	|----------	|
| MaxCount            	| number   	| 10                                     	| No       	|
| ReportTypeList      	| string[] 	| [`'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`] 	| No       	|
| Acknowledged        	| boolean  	| true                                   	| No       	|
| ReportRequestIdList 	| string[] 	| ['12345']                              	| No       	|
| AvailableFromDate   	| Date     	| new Date()                             	| No       	|
| AvailableToDate     	| Date     	| new Date()                             	| No       	|

* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportList()
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportListByNextToken
**Parameters**

| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportListByNextToken(new NextToken('GetReportList', '123'))
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)
### getReportCount
**Parameters**

| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| [`'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`] 	| No       	|
| Acknowledged      	| boolean  	| true                                   	| No       	|
| AvailableFromDate 	| Date     	| new Date()                             	| No       	|
| AvailableToDate   	| Date     	| new Date()                             	| No       	|

* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportCount()
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReport
**Parameters**
| Name              	| Type    	| Example    	| Required 	|
|-------------------	|---------	|------------	|----------	|
| ReportId          	| string  	| '12345'    	| Yes      	|

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReport('12345')
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

*Depending on the ReportType, this will either be a tab-delimited flat file, an XML document, or a PDF.*
*Because of this, this action returns a `string` instead of a JS object and it is up to the user to determine how to handle the file*

### manageReportSchedule
**Parameters**
| Name            	| Type   	| Example                              	| Required 	|
|-----------------	|--------	|--------------------------------------	|----------	|
| ReportType      	| string 	| `'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`| Yes      	|
| Schedule        	| string 	| `'_15_MINUTES_'`                      | Yes      	|
| ScheduleDate    	| Date   	| new Date()                           	| No       	|
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

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportScheduleList

**Parameters**

| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| [`'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`] 	| No       	|
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportScheduleList()
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### getReportScheduleListByNextToken
[Currently this operation can never be called because the GetReportScheduleList operation cannot return more than 100 results. It is included for future compatibility.](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportScheduleListByNextToken.html)

### getReportScheduleCount
**Parameters**
| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| [`'_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'`] 	| No       	|
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.getReportScheduleCount()
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

### updateReportAcknowledgements

**Parameters**
| Name            	| Type     	| Example    	| Required 	|
|-----------------	|----------	|------------	|----------	|
| ReportIdList    	| string[] 	| ['12345']  	| Yes      	|
| Acknowledged    	| boolean  	| true       	| No       	|

**Example**

```typescript
const reports = new Reports(httpClient)
const [response, meta] = reports.updateReportAcknowledgements({ ReportIdList: ['12345'] })
```

**Sample Response**

[See reports test snapshot](../test/unit/__snapshots__/reports.test.ts.snap)

## Subscriptions
[Amazon MWS Subscriptions official API](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_Overview.html)

### Types used in Subscriptions

#### Subscription
**Properties**
| Name             	| Type        	| Example           	      | Required 	|
|------------------	|-------------	|-------------------	      |----------	|
| NotificationType 	| string      	| 'AnyOfferChanged' 	      | Yes      	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|
| IsEnabled        	| boolean     	| true              	      | Yes      	|

* [Possible values for NotificationType](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_NotificationType.html)

#### Destination
**Properties**
| Name            	| Type              	| Example 	                            | Required 	|
|-----------------	|-------------------	|------------------------------------   |----------	|
| DeliveryChannel 	| string            	| 'SQS'   	                            | Yes      	|
| AttributeList   	| AttributeKeyValue 	| [AttribueKeyValue](#attribuekeyvalue) | Yes      	|

* [Possible values for DeliveryChannel](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_Datatypes.html#Destination)

#### AttribueKeyValue
**Properties**
| Name  	| Type   	| Example                                                                        	| Required 	|
|-------	|--------	|--------------------------------------------------------------------------------	|----------	|
| Key   	| string 	| 'sqsQueueUrl'                                                                  	| Yes      	|
| Value 	| string 	| 'https://sqs.us-east-1.amazonaws.com/51471EXAMPLE/mws_notifications' 	| Yes      	|

* [Possible values for Key](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_Datatypes.html#AttributeKeyValue)

### registerDestination
**Parameters**

| Name          	| Type        	| Example                     | Required 	|
|---------------	|-------------	|-----------------------------|-------------|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2'            | Yes      	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

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

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### deregisterDestination
**Parameters**

| Name          	| Type        	| Example                     | Required 	|
|---------------	|-------------	|-----------------------------|-------------|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2'            | Yes      	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

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

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### listRegisteredDestinations
**Parameters**
| Name          	| Type        	| Example          	| Required 	|
|---------------	|-------------	|------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	| Yes      	|

**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.listRegisteredDestinations({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
    })
```

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### sendTestNotificationToDestination
**Parameters**

| Name          	| Type        	| Example                     | Required 	|
|---------------	|-------------	|-----------------------------|-------------|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2'            | Yes      	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

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

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### createSubscription
**Parameters**
| Name          	| Type        	| Example          	            | Required 	|
|---------------	|-------------	|---------------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	            | Yes      	|
| Subscription   	| Subscription 	| [Subscription](#subscription) | Yes      	|

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

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### getSubscription
**Parameters**

| Name          	| Type        	| Example          	          | Required 	|
|---------------	|-------------	|------------------	          |----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	          | Yes      	|
| NotificationType 	| string      | 'AnyOfferChanged'           | Yes     	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

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

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)

### deleteSubscription
**Parameters**

| Name          	| Type        	| Example          	          | Required 	|
|---------------	|-------------	|------------------	          |----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	          | Yes      	|
| NotificationType 	| string      	| 'AnyOfferChanged'           | Yes     	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

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

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### listSubscriptions
**Parameters**
| Name          	| Type        	| Example          	| Required 	|
|---------------	|-------------	|------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	| Yes      	|


**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.listSubscriptions({
      MarketplaceId: 'A2EUQ1WTGCTBG2',
    })
```

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)

### updateSubscription
**Parameters**
| Name          	| Type        	| Example          	            | Required 	|
|---------------	|-------------	|---------------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	            | Yes      	|
| Subscription   	| Subscription 	| [Subscription](#subscription) | Yes      	|

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

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


### getServiceStatus
**Parameters**

| None |
|------|


**Example**

```typescript
const subscriptions = new Subscriptions(httpClient)
const [response, meta] = subscriptions.getServiceStatus()
```

**Sample Response**

[See subscriptions test snapshot](../test/unit/__snapshots__/subscriptions.test.ts.snap)


## FulfillmentInventory

[Amazon MWS Fulfillment Inventory official documentation](http://docs.developer.amazonservices.com/en_CA/fba_inventory/FBAInventory_Overview.html)

### listInventorySupply
**Parameters**
| Name               	| Type     	| Example          	| Required                                                                      	|
|--------------------	|----------	|------------------	|-------------------------------------------------------------------------------	|
| SellerSkus         	| string[] 	| ['SAMPLESKU']     | Yes, if QueryStartDateTime is not specified. Specifying both returns an error 	|
| QueryStartDateTime 	| Date     	| new Date()       	| Yes, if SellerSkus is not specified. Specifying both returns an error         	|
| ResponseGroup      	| string   	| 'Basic'          	| No                                                                            	|
| MarketplaceId      	| string   	| 'A2EUQ1WTGCTBG2' 	| No                                                                            	|

* [Possible values for ResponseGroup](http://docs.developer.amazonservices.com/en_CA/fba_inventory/FBAInventory_ListInventorySupply.html)

**Example**

```typescript
const fulfillmentInventory = new FulfillmentInventory(httpClient)
const [response, meta] = fulfillmentInventory.listInventorySupply({
  SellerSkus: ['SAMPLESKU'],
})
```

**Sample Response**

[See fulfillment inventory test snapshot](../test/unit/__snapshots__/fulfillment-inventory.test.ts.snap)

### listInventorySupplyByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

**Example**

```typescript
const fulfillmentInventory = new FulfillmentInventory(httpClient)
const [response, meta] = fulfillmentInventory.listInventorySupplyByNextToken(new NextToken('ListInventorySupply', '123'))
```

**Sample Response**

[See fulfillment inventory test snapshot](../test/unit/__snapshots__/fulfillment-inventory.test.ts.snap)

### getServiceStatus

**Parameters**

| None |
|------|

**Example**

```typescript
const fulfillmentInventory = new FulfillmentInventory(httpClient)
const [response, meta] = fulfillmentInventory.getServiceStatus()
```

**Sample Response**

[See fulfillment inventory test snapshot](../test/unit/__snapshots__/fulfillment-inventory.test.ts.snap)

## Feeds

[Amazon MWS Feeds API official documentation](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_Overview.html)

### submitFeed
**Parameters**
| Name              	| Type     	| Example               	| Required 	|
|-------------------	|----------	|-----------------------	|----------	|
| FeedContent       	| string   	| '<XML></XML>'         	| Yes      	|
| FeedType          	| string   	| '_POST_PRODUCT_DATA_' 	| Yes      	|
| MarketplaceIdList 	| string[] 	| ['A2EUQ1WTGCTBG2']    	| No       	|
| PurgeAndReplace   	| boolean  	| false                 	| No       	|
| AmazonOrderId     	| string   	| '902-3159896-1390916' 	| No       	|
| DocumentId        	| string   	| 'DCMNTID'             	| No       	|

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)
### getFeedSubmissionList
**Parameters**

| Name                     	| Type     	| Example                           	| Required 	|
|--------------------------	|----------	|-----------------------------------	|----------	|
| FeedSubmissionIdList     	| string[] 	| ['FEEDID']                        	| No       	|
| MaxCount                 	| number   	| 10                                	| No       	|
| FeedTypeList             	| string[] 	| ['_POST_PRODUCT_DATA_']           	| No       	|
| FeedProcessingStatusList 	| string[] 	| ['_AWAITING_ASYNCHRONOUS_REPLY_'] 	| No       	|
| SubmittedFromDate        	| Date     	| new Date()                        	| No       	|
| SubmittedToDate          	| Date     	| new Date()                        	| No       	|

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)

* [Possible values for FeedProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedProcessingStatus.html)
### getFeedSubmissionListByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

### getFeedSubmissionCount
**Parameters**

| Name                     	| Type     	| Example                           	| Required 	|
|--------------------------	|----------	|-----------------------------------	|----------	|
| FeedTypeList             	| string[] 	| ['_POST_PRODUCT_DATA_']           	| No       	|
| FeedProcessingStatusList 	| string[] 	| ['_AWAITING_ASYNCHRONOUS_REPLY_'] 	| No       	|
| SubmittedFromDate        	| Date     	| new Date()                        	| No       	|
| SubmittedToDate          	| Date     	| new Date()                        	| No       	|

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)

* [Possible values for FeedProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedProcessingStatus.html)
### cancelFeedSubmissions
**Parameters**
| Name                     	| Type     	| Example                           	| Required 	|
|--------------------------	|----------	|-----------------------------------	|----------	|
| FeedSubmissionIdList     	| string[] 	| ['FEEDID']                        	| No       	|
| FeedTypeList             	| string[] 	| ['_POST_PRODUCT_DATA_']           	| No       	|
| SubmittedFromDate        	| Date     	| new Date()                        	| No       	|
| SubmittedToDate          	| Date     	| new Date()                        	| No       	|

* [Possible values for FeedType](http://docs.developer.amazonservices.com/en_CA/feeds/Feeds_FeedType.html)

### getFeedSubmissionResult
**Parameters**
| Name                  | Type      | Example                       | Required 	|
| FeedSubmissionId     	| string 	| 'FEEDID'                        	| No       	|


## Products
[Amazon MWS Finances API official documentation](http://docs.developer.amazonservices.com/en_CA/products/Products_Overview.html)

### Types used in Products
#### FeesEstimateRequest
**Properties**

| Name                	| Type                	| Example          	                          | Required 	|
|---------------------	|---------------------	|-------------------------------------------- |----------	|
| MarketplaceId       	| string              	| 'A2EUQ1WTGCTBG2' 	                          | Yes      	|
| IdType              	| string              	| 'ASIN'           	                          | Yes      	|
| IdValue             	| string              	| 'MY-ASIN-1'      	                          | Yes      	|
| PriceToEstimateFees 	| PriceToEstimateFees 	| [PriceToEstimateFees](#pricetoestimatefees) | Yes      	|
| Identifier          	| string              	| 'request1'       	                          | Yes      	|
| IsAmazonFulfilled   	| boolean             	| true             	                          | Yes      	|

#### PriceToEstimateFees
**Properties**
| Name                	| Type                	| Example    	            | Required 	|
|---------------------	|---------------------	|-------------------------- |----------	|
| ListingPrice        	| MoneyType           	| [MoneyType](#moneytype)  	| Yes      	|
| Shipping            	| MoneyType           	| [MoneyType](#moneytype)  	| No       	|
| Points              	| Points              	| [Points](#points)      	| No       	|

#### MoneyType
**Properties**
| Name                	| Type                	| Example    	| Required 	|
|---------------------	|---------------------	|------------	|----------	|
| Amount              	| number              	| 1000       	| No       	|
| CurrencyCode        	| string              	| 'USD'      	| No      	|

* [Possible values for CurrencyCode](http://docs.developer.amazonservices.com/en_CA/products/Products_Datatypes.html#MoneyType)

#### Points
**Properties**
| Name                	| Type                	| Example    	            | Required 	|
|---------------------	|---------------------	|------------------------	|----------	|
| PointsNumber        	| number              	| 1000       	            | Yes      	|
| PointsMonetaryValue 	| MoneyType           	| [MoneyType](#moneytype)  	| Yes      	|

### listMatchingProducts
**Parameters**
| Name           	| Type   	| Example            	| Required 	|
|----------------	|--------	|--------------------	|----------	|
| MarketplaceId  	| string 	| 'A2EUQ1WTGCTBG2'   	| Yes      	|
| Query          	| string 	| 'harry potter dvd' 	| Yes      	|
| QueryContextId 	| string 	| 'ArtsAndCrafts'    	| No       	|

* [Possible values for QueryContextId](http://docs.developer.amazonservices.com/en_CA/products/Products_QueryContextIDs.html)

### getMatchingProduct
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| ASINList       	| string[] 	| ['MY-ASIN-1']    	| Yes      	|

### getMatchingProductForId
**Parameters**
| Name          	| Type     	| Example          	| Required 	|
|---------------	|----------	|------------------	|----------	|
| MarketplaceId 	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| IdType        	| string   	| 'ASIN'           	| Yes      	|
| IdList        	| string[] 	| ['MY-ASIN-1']    	| No       	|

* [Possible values for IdType](http://docs.developer.amazonservices.com/en_CA/products/Products_GetMatchingProductForId.html)

### getCompetitivePricingForSku
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| SellerSKUList     | string[] 	| ['MY-SKU-1']    	| Yes      	|

### getCompetitivePricingForAsin
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| ASINList       	| string[] 	| ['MY-ASIN-1']    	| Yes      	|

### getLowestOfferListingsForSku
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| SellerSKUList     | string[] 	| ['MY-SKU-1']    	| Yes      	|
| ItemCondition     | string 	| 'New'         	| No      	|

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

### getLowestOfferListingsForAsin
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| ASINList       	| string[] 	| ['MY-ASIN-1']    	| Yes      	|
| ItemCondition     | string 	| 'New'         	| No      	|

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForASIN.html)

### getLowestPricedOffersForSku
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| SellerSKU         | string 	| 'MY-SKU-1'    	| Yes      	|
| ItemCondition     | string 	| 'New'         	| Yes      	|

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

### getLowestPricedOffersForSku
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| ASIN              | string 	| 'MY-ASIN-1'    	| Yes      	|
| ItemCondition     | string 	| 'New'         	| Yes      	|

* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

### getMyFeesEstimate
**Parameters**
| Name           	        | Type     	                | Example                                        | Required 	|
|-----------------------	|-----------------------	|----------------------------------------------- |----------	|
| FeesEstimateRequestList  	| FeesEstimateRequest[]   	|  [FeesEstimateRequest](#feesestimaterequest)	 | Yes      	|

### getMyPriceForSku
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| SellerSKUList     | string[] 	| ['MY-SKU-1']    	| Yes      	|
| ItemCondition     | string 	| 'New'         	| No      	|
* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

### getMyPriceForAsin
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| ASINList          | string[] 	| ['MY-ASIN-1']    	| Yes      	|
| ItemCondition     | string 	| 'New'         	| No      	|
* [Possible values for ItemCondition](http://docs.developer.amazonservices.com/en_CA/products/Products_GetLowestOfferListingsForSKU.html)

### getProductCategoriesForSku
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| SellerSKU         | string 	| 'MY-SKU-1'    	| Yes      	|

### getProductCategoriesForAsin
**Parameters**
| Name           	| Type     	| Example          	| Required 	|
|----------------	|----------	|------------------	|----------	|
| MarketplaceId  	| string   	| 'A2EUQ1WTGCTBG2' 	| Yes      	|
| ASIN              | string 	| 'MY-ASIN-1'    	| Yes      	|


### getServiceStatus

**Parameters**

| None |
|------|


## Finances
[Amazon MWS Finances API official documentation](http://docs.developer.amazonservices.com/en_CA/finances/Finances_Overview.html)

### listFinancialEventGroups
**Parameters**
| Name                             	| Type     	| Example                           	| Required 	|
|----------------------------------	|----------	|-----------------------------------	|----------	|
| MaxResultsPerPage                	| number   	| 10                                	| No       	|
| FinancialEventGroupsStartedAfter 	| Date     	| new Date()                        	| Yes      	|
| FinancialEventGroupStartedBefore 	| Date     	| new Date()                        	| No       	|

### listFinancialEventGroupsByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

### listFinancialEvents
**Parameters**
| Name                  	| Type   	| Example               	| Required                                                                                                                                 	|
|-----------------------	|--------	|-----------------------	|------------------------------------------------------------------------------------------------------------------------------------------	|
| MaxResultsPerPage     	| number 	| 10                    	| No                                                                                                                                       	|
| AmazonOrderId         	| string 	| '902-3159896-1390916' 	| You can only specify one of the following filter criteria: AmazonOrderId, FinancialEventGroupId, PostedAfter and optionally PostedBefore 	|
| FinancialEventGroupId 	| string 	| 'FNCLEVTGRPID'        	| You can only specify one of the following filter criteria: AmazonOrderId, FinancialEventGroupId, PostedAfter and optionally PostedBefore 	|
| PostedAfter           	| Date   	| new Date()            	| You can only specify one of the following filter criteria: AmazonOrderId, FinancialEventGroupId, PostedAfter and optionally PostedBefore 	|
| PostedBefore          	| Date   	| new Date()            	| No                                                                                                                                       	|

### listFinancialEventsByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>[See examples for sample usage ](../examples/using-next-tokens.ts)| Yes      |

