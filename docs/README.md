# Table of Contents
- [Table of Contents](#table-of-contents)
- [Basics](#basics)
- [Sections](#sections)
  * [Sellers](#sellers)
    + [listMarketplaceParticipations](#listmarketplaceparticipations)
      - [Parameters](#parameters)
    + [listMarketplaceParticipationsByNextToken](#listmarketplaceparticipationsbynexttoken)
      - [Parameters](#parameters-1)
    + [getServiceStatus](#getservicestatus)
      - [Parameters](#parameters-2)
  * [Orders](#orders)
    + [listOrders](#listorders)
      - [Parameters](#parameters-3)
    + [listOrdersByNextToken](#listordersbynexttoken)
      - [Parameters](#parameters-4)
    + [getOrder](#getorder)
      - [Parameters](#parameters-5)
    + [listOrderItems](#listorderitems)
      - [Parameters](#parameters-6)
    + [listOrderItemsByNextToken](#listorderitemsbynexttoken)
      - [Parameters](#parameters-7)
    + [getServiceStatus](#getservicestatus-1)
      - [Parameters](#parameters-8)
  * [Reports](#reports)
    + [requestReport](#requestreport)
      - [Parameters](#parameters-9)
    + [getReportRequestList](#getreportrequestlist)
      - [Parameters](#parameters-10)
    + [getReportRequestListByNextToken](#getreportrequestlistbynexttoken)
      - [Parameters](#parameters-11)
    + [getReportRequestCount](#getreportrequestcount)
      - [Parameters](#parameters-12)
    + [cancelReportRequests](#cancelreportrequests)
      - [Parameters](#parameters-13)
    + [getReportList](#getreportlist)
      - [Parameters](#parameters-14)
    + [getReportListByNextToken](#getreportlistbynexttoken)
      - [Parameters](#parameters-15)
    + [getReportCount](#getreportcount)
      - [Parameters](#parameters-16)
    + [getReport](#getreport)
      - [Parameters](#parameters-17)
    + [manageReportSchedule](#managereportschedule)
      - [Parameters](#parameters-18)
    + [getReportScheduleList](#getreportschedulelist)
      - [Parameters](#parameters-19)
    + [getReportScheduleListByNextToken](#getreportschedulelistbynexttoken)
    + [getReportScheduleCount](#getreportschedulecount)
      - [Parameters](#parameters-20)
    + [updateReportAcknowledgements](#updatereportacknowledgements)
      - [Parameters](#parameters-21)
  * [Subscriptions](#subscriptions)
  * [FulfillmentInventory](#fulfillmentinventory)
  * [Feeds](#feeds)
  * [Products](#products)
  * [Finances](#finances)

# Basics

amazon-mws-api-sdk is divided up into different sections representing the different sections of the Amazon MWS API.
Under each section are methods that perform "actions" on the MWS API parses the response, returns it and the request metadata in a JS object 

# Sections

## Sellers

[Amazon MWS Sellers API official documentation](http://docs.developer.amazonservices.com/en_CA/sellers/Sellers_Overview.html)

### listMarketplaceParticipations
#### Parameters 

| None |
|------|

### listMarketplaceParticipationsByNextToken

#### Parameters
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |
### getServiceStatus

#### Parameters

| None |
|------|

## Orders

[Amazon MWS Orders API official documentation](http://docs.developer.amazonservices.com/en_CA/orders-2013-09-01/Orders_Overview.html)

### listOrders
#### Parameters

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
#### Parameters
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getOrder
#### Parameters
| Name          | Type     | Example                 | Required |
|---------------|----------|-------------------------|----------|
| AmazonOrderId | string[] | ['902-3159896-1390916'] | Yes      |

### listOrderItems
#### Parameters
| Name          | Type   | Example               | Required |
|---------------|--------|-----------------------|----------|
| AmazonOrderId | string | '902-3159896-1390916' | Yes      |
### listOrderItemsByNextToken
#### Parameters
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |
### getServiceStatus

#### Parameters

| None |
|------|

## Reports

[Amazon MWS Reports API official documentation](http://docs.developer.amazonservices.com/en_CA/reports/Reports_Overview.html)

### requestReport
#### Parameters
| Name              	| Type     	| Example                              	| Required 	|
|-------------------	|----------	|--------------------------------------	|----------	|
| ReportType        	| string   	| '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_' 	| Yes      	|
| StartDate         	| Date     	| new Date()                           	| No       	|
| EndDate           	| Date     	| new Date()                           	| No       	|
| ReportOptions     	| string   	| 'Report Option'                      	| No       	|
| MarketplaceIdList 	| string[] 	| ['A2EUQ1WTGCTBG2']                   	| No       	|

* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportRequestList
#### Parameters
| Name                       	| Type     	| Example                                	| Required                                                                      	|
|----------------------------	|----------	|----------------------------------------	|-------------------------------------------------------------------------------	|
| ReportRequestIdList        	| string[] 	| ['12345']                              	| No. If you pass in ReportRequestId values, other query conditions are ignored 	|
| ReportTypeList             	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No                                                                            	|
| ReportProcessingStatusList 	| string[] 	| ['_SUBMITTED_']                        	| No                                                                            	|
| MaxCount                   	| number   	| 10                                     	| No                                                                            	|
| RequestedFromDate          	| Date     	| new Date()                             	| No                                                                            	|
| RequestedToDate            	| Date     	| new Date()                             	| No                                                                            	|

* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestList.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportRequestListByNextToken
#### Parameters
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getReportRequestCount
#### Parameters
| Name                       	| Type     	| Example                                	| Required 	|
|----------------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList             	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
| ReportProcessingStatusList 	| string[] 	| ['_SUBMITTED_']                        	| No       	|
| RequestedFromDate          	| Date     	| new Date()                             	| No       	|
| RequestedToDate            	| Date     	| new Date()                             	| No       	|
* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestCount.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### cancelReportRequests
#### Parameters

| Name                       	| Type     	| Example                                	| Required 	|
|----------------------------	|----------	|----------------------------------------	|----------	|
| ReportRequestIdList        	| string[] 	| ['12345']                              	| No       	|
| ReportTypeList             	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
| ReportProcessingStatusList 	| string[] 	| ['_SUBMITTED_']                        	| No       	|
| RequestedFromDate          	| Date     	| new Date()                             	| No       	|
| RequestedToDate            	| Date     	| new Date()                             	| No       	|

* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestList.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportList
#### Parameters

| Name                	| Type     	| Example                                	| Required 	|
|---------------------	|----------	|----------------------------------------	|----------	|
| MaxCount            	| number   	| 10                                     	| No       	|
| ReportTypeList      	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
| Acknowledged        	| boolean  	| true                                   	| No       	|
| ReportRequestIdList 	| string[] 	| ['12345']                              	| No       	|
| AvailableFromDate   	| Date     	| new Date()                             	| No       	|
| AvailableToDate     	| Date     	| new Date()                             	| No       	|

* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportListByNextToken
#### Parameters

| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getReportCount
#### Parameters

| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
| Acknowledged      	| boolean  	| true                                   	| No       	|
| AvailableFromDate 	| Date     	| new Date()                             	| No       	|
| AvailableToDate   	| Date     	| new Date()                             	| No       	|

* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReport
#### Parameters
| Name              	| Type    	| Example    	| Required 	|
|-------------------	|---------	|------------	|----------	|
| ReportId          	| string  	| '12345'    	| Yes      	|

### manageReportSchedule
#### Parameters
| Name            	| Type   	| Example                              	| Required 	|
|-----------------	|--------	|--------------------------------------	|----------	|
| ReportType      	| string 	| '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_' 	| Yes      	|
| Schedule        	| string 	| '_15_MINUTES_'                       	| Yes      	|
| ScheduleDate    	| Date   	| new Date()                           	| No       	|
* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)
* [Possible values for Schedule](http://docs.developer.amazonservices.com/en_CA/reports/Reports_Schedule.html)

### getReportScheduleList
#### Parameters

| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportScheduleListByNextToken
[Currently this operation can never be called because the GetReportScheduleList operation cannot return more than 100 results. It is included for future compatibility.](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportScheduleListByNextToken.html)

### getReportScheduleCount
#### Parameters
| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### updateReportAcknowledgements
#### Parameters
| Name            	| Type     	| Example    	| Required 	|
|-----------------	|----------	|------------	|----------	|
| ReportIdList    	| string[] 	| ['12345']  	| Yes      	|
| Acknowledged    	| boolean  	| true       	| No       	|

## Subscriptions

_in progress_

## FulfillmentInventory

_in progress_

## Feeds

_in progress_

## Products

_in progress_

## Finances

_in progress_
