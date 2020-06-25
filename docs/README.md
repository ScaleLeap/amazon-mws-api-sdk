## Table of Contents
* [Table of Contents](#table-of-contents)
* [Sellers](#sellers)
    * [listMarketplaceParticipations](#listmarketplaceparticipations)
    * [listMarketplaceParticipationsByNextToken](#listmarketplaceparticipationsbynexttoken)
    * [getServiceStatus](#getservicestatus)
* [Orders](#orders)
    * [listOrders](#listorders)
    * [listOrdersByNextToken](#listordersbynexttoken)
    * [getOrder](#getorder)
    * [listOrderItems](#listorderitems)
    * [listOrderItemsByNextToken](#listorderitemsbynexttoken)
    * [getServiceStatus](#getservicestatus-1)
* [Reports](#reports)
    * [requestReport](#requestreport)
    * [getReportRequestList](#getreportrequestlist)
* [Subscriptions](#subscriptions)
* [FulfillmentInventory](#fulfillmentinventory)
* [Feeds](#feeds)
* [Products](#products)
* [Finances](#finances)

## Sellers

[Amazon MWS Sellers API official documentation](http://docs.developer.amazonservices.com/en_CA/sellers/Sellers_Overview.html)

### listMarketplaceParticipations
Parameters 

| None |
|------|

### listMarketplaceParticipationsByNextToken

Parameters
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |
### getServiceStatus

Parameters

| None |
|------|

## Orders

### listOrders
Parameters

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

### listOrdersByNextToken
Parameters
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getOrder
Parameters
| Name          | Type     | Example                 | Required |
|---------------|----------|-------------------------|----------|
| AmazonOrderId | string[] | ['902-3159896-1390916'] | Yes      |

### listOrderItems
Parameters
| Name          | Type   | Example               | Required |
|---------------|--------|-----------------------|----------|
| AmazonOrderId | string | '902-3159896-1390916' | Yes      |
### listOrderItemsByNextToken
Parameters
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |
### getServiceStatus

Parameters

| None |
|------|

## Reports

### requestReport
Parameters
| Name              	| Type     	| Example                              	| Required 	|
|-------------------	|----------	|--------------------------------------	|----------	|
| ReportType        	| string   	| '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_' 	| Yes      	|
| StartDate         	| Date     	| new Date()                           	| No       	|
| EndDate           	| Date     	| new Date()                           	| No       	|
| ReportOptions     	| string   	| 'Report Option'                      	| No       	|
| MarketplaceIdList 	| string[] 	| ['A2EUQ1WTGCTBG2']                   	| No       	|

* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportRequestList
Parameters


## Subscriptions

_coming soon_

## FulfillmentInventory

_in progress_

## Feeds

_in progress_

## Products

_in progress_

## Finances

_in progress_
