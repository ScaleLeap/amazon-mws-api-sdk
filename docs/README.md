# Table of Contents
- [Table of Contents](#table-of-contents)
- [Basics](#basics)
- [Sections](#sections)
  * [Sellers](#sellers)
    + [listMarketplaceParticipations](#listmarketplaceparticipations)
    + [listMarketplaceParticipationsByNextToken](#listmarketplaceparticipationsbynexttoken)
    + [getServiceStatus](#getservicestatus)
  * [Orders](#orders)
    + [listOrders](#listorders)
    + [listOrdersByNextToken](#listordersbynexttoken)
    + [getOrder](#getorder)
    + [listOrderItems](#listorderitems)
    + [listOrderItemsByNextToken](#listorderitemsbynexttoken)
    + [getServiceStatus](#getservicestatus-1)
  * [Reports](#reports)
    + [requestReport](#requestreport)
    + [getReportRequestList](#getreportrequestlist)
    + [getReportRequestListByNextToken](#getreportrequestlistbynexttoken)
    + [getReportRequestCount](#getreportrequestcount)
    + [cancelReportRequests](#cancelreportrequests)
    + [getReportList](#getreportlist)
    + [getReportListByNextToken](#getreportlistbynexttoken)
    + [getReportCount](#getreportcount)
    + [getReport](#getreport)
    + [manageReportSchedule](#managereportschedule)
    + [getReportScheduleList](#getreportschedulelist)
    + [getReportScheduleListByNextToken](#getreportschedulelistbynexttoken)
    + [getReportScheduleCount](#getreportschedulecount)
    + [updateReportAcknowledgements](#updatereportacknowledgements)
  * [Subscriptions](#subscriptions)
    + [Types used in Subscriptions](#types-used-in-subscriptions)
      - [Subscription](#subscription)
      - [Destination](#destination)
      - [AttribueKeyValue](#attribuekeyvalue)
    + [registerDestination](#registerdestination)
    + [deregisterDestination](#deregisterdestination)
    + [listRegisteredDestinations](#listregistereddestinations)
    + [sendTestNotificationToDestination](#sendtestnotificationtodestination)
    + [createSubscription](#createsubscription)
    + [getSubscription](#getsubscription)
    + [deleteSubscription](#deletesubscription)
    + [listSubscriptions](#listsubscriptions)
    + [updateSubscription](#updatesubscription)
    + [getServiceStatus](#getservicestatus-2)
  * [FulfillmentInventory](#fulfillmentinventory)
    + [listInventorySupply](#listinventorysupply)
    + [listInventorySupplyByNextToken](#listinventorysupplybynexttoken)
    + [getServiceStatus](#getservicestatus-3)
  * [Feeds](#feeds)
    + [submitFeed](#submitfeed)
    + [getFeedSubmissionList](#getfeedsubmissionlist)
    + [getFeedSubmissionListByNextToken](#getfeedsubmissionlistbynexttoken)
    + [getFeedSubmissionCount](#getfeedsubmissioncount)
    + [cancelFeedSubmissions](#cancelfeedsubmissions)
    + [getFeedSubmissionResult](#getfeedsubmissionresult)
  * [Products](#products)
    + [Types used in Products](#types-used-in-products)
      - [FeesEstimateRequest](#feesestimaterequest)
      - [PriceToEstimateFees](#pricetoestimatefees)
      - [MoneyType](#moneytype)
      - [Points](#points)
    + [listMatchingProducts](#listmatchingproducts)
    + [getMatchingProduct](#getmatchingproduct)
    + [getMatchingProductForId](#getmatchingproductforid)
    + [getCompetitivePricingForSku](#getcompetitivepricingforsku)
    + [getCompetitivePricingForAsin](#getcompetitivepricingforasin)
    + [getLowestOfferListingsForSku](#getlowestofferlistingsforsku)
    + [getLowestOfferListingsForAsin](#getlowestofferlistingsforasin)
    + [getLowestPricedOffersForSku](#getlowestpricedoffersforsku)
    + [getLowestPricedOffersForSku](#getlowestpricedoffersforsku-1)
    + [getMyFeesEstimate](#getmyfeesestimate)
    + [getMyPriceForSku](#getmypriceforsku)
    + [getMyPriceForAsin](#getmypriceforasin)
    + [getProductCategoriesForSku](#getproductcategoriesforsku)
    + [getProductCategoriesForAsin](#getproductcategoriesforasin)
    + [getServiceStatus](#getservicestatus-4)
  * [Finances](#finances)
    + [listFinancialEventGroups](#listfinancialeventgroups)
    + [listFinancialEventGroupsByNextToken](#listfinancialeventgroupsbynexttoken)
    + [listFinancialEvents](#listfinancialevents)
    + [listFinancialEventsByNextToken](#listfinancialeventsbynexttoken)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# Basics

amazon-mws-api-sdk is divided up into different sections representing the different sections of the Amazon MWS API.
Under each section are methods that perform "actions" on the MWS API parses the response, returns it and the request metadata in a JS object 

# Sections

## Sellers

[Amazon MWS Sellers API official documentation](http://docs.developer.amazonservices.com/en_CA/sellers/Sellers_Overview.html)

### listMarketplaceParticipations
**Parameters** 

| None |
|------|

### listMarketplaceParticipationsByNextToken

**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |
### getServiceStatus

**Parameters**

| None |
|------|

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

### listOrdersByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getOrder
**Parameters**
| Name          | Type     | Example                 | Required |
|---------------|----------|-------------------------|----------|
| AmazonOrderId | string[] | ['902-3159896-1390916'] | Yes      |

### listOrderItems
**Parameters**
| Name          | Type   | Example               | Required |
|---------------|--------|-----------------------|----------|
| AmazonOrderId | string | '902-3159896-1390916' | Yes      |
### listOrderItemsByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |
### getServiceStatus

**Parameters**

| None |
|------|

## Reports

[Amazon MWS Reports API official documentation](http://docs.developer.amazonservices.com/en_CA/reports/Reports_Overview.html)

### requestReport
**Parameters**
| Name              	| Type     	| Example                              	| Required 	|
|-------------------	|----------	|--------------------------------------	|----------	|
| ReportType        	| string   	| '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_' 	| Yes      	|
| StartDate         	| Date     	| new Date()                           	| No       	|
| EndDate           	| Date     	| new Date()                           	| No       	|
| ReportOptions     	| string   	| 'Report Option'                      	| No       	|
| MarketplaceIdList 	| string[] 	| ['A2EUQ1WTGCTBG2']                   	| No       	|

* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportRequestList
**Parameters**
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
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getReportRequestCount
**Parameters**
| Name                       	| Type     	| Example                                	| Required 	|
|----------------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList             	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
| ReportProcessingStatusList 	| string[] 	| ['_SUBMITTED_']                        	| No       	|
| RequestedFromDate          	| Date     	| new Date()                             	| No       	|
| RequestedToDate            	| Date     	| new Date()                             	| No       	|
* [Possible values for ReportProcessingStatusList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportRequestCount.html)
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### cancelReportRequests
**Parameters**

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
**Parameters**

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
**Parameters**

| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getReportCount
**Parameters**

| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
| Acknowledged      	| boolean  	| true                                   	| No       	|
| AvailableFromDate 	| Date     	| new Date()                             	| No       	|
| AvailableToDate   	| Date     	| new Date()                             	| No       	|

* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReport
**Parameters**
| Name              	| Type    	| Example    	| Required 	|
|-------------------	|---------	|------------	|----------	|
| ReportId          	| string  	| '12345'    	| Yes      	|

### manageReportSchedule
**Parameters**
| Name            	| Type   	| Example                              	| Required 	|
|-----------------	|--------	|--------------------------------------	|----------	|
| ReportType      	| string 	| '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_' 	| Yes      	|
| Schedule        	| string 	| '_15_MINUTES_'                       	| Yes      	|
| ScheduleDate    	| Date   	| new Date()                           	| No       	|
* [Possible values for ReportType](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)
* [Possible values for Schedule](http://docs.developer.amazonservices.com/en_CA/reports/Reports_Schedule.html)

### getReportScheduleList
**Parameters**

| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### getReportScheduleListByNextToken
[Currently this operation can never be called because the GetReportScheduleList operation cannot return more than 100 results. It is included for future compatibility.](http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportScheduleListByNextToken.html)

### getReportScheduleCount
**Parameters**
| Name              	| Type     	| Example                                	| Required 	|
|-------------------	|----------	|----------------------------------------	|----------	|
| ReportTypeList    	| string[] 	| ['_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'] 	| No       	|
* [Possible values for ReportTypeList](http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html)

### updateReportAcknowledgements
**Parameters**
| Name            	| Type     	| Example    	| Required 	|
|-----------------	|----------	|------------	|----------	|
| ReportIdList    	| string[] 	| ['12345']  	| Yes      	|
| Acknowledged    	| boolean  	| true       	| No       	|

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

### deregisterDestination
**Parameters**

| Name          	| Type        	| Example                     | Required 	|
|---------------	|-------------	|-----------------------------|-------------|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2'            | Yes      	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

### listRegisteredDestinations
**Parameters**
| Name          	| Type        	| Example          	| Required 	|
|---------------	|-------------	|------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	| Yes      	|

### sendTestNotificationToDestination
**Parameters**

| Name          	| Type        	| Example                     | Required 	|
|---------------	|-------------	|-----------------------------|-------------|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2'            | Yes      	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

### createSubscription
**Parameters**
| Name          	| Type        	| Example          	            | Required 	|
|---------------	|-------------	|---------------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	            | Yes      	|
| Subscription   	| Subscription 	| [Subscription](#subscription) | Yes      	|

### getSubscription
**Parameters**

| Name          	| Type        	| Example          	          | Required 	|
|---------------	|-------------	|------------------	          |----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	          | Yes      	|
| NotificationType 	| string      	| 'AnyOfferChanged'           | Yes     	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|


* [Possible values for NotificationType](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_NotificationType.html)

### deleteSubscription
**Parameters**

| Name          	| Type        	| Example          	          | Required 	|
|---------------	|-------------	|------------------	          |----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	          | Yes      	|
| NotificationType 	| string      	| 'AnyOfferChanged'           | Yes     	|
| Destination   	| Destination 	| [Destination](#destination) | Yes      	|

* [Possible values for NotificationType](http://docs.developer.amazonservices.com/en_CA/subscriptions/Subscriptions_NotificationType.html)

### listSubscriptions
**Parameters**
| Name          	| Type        	| Example          	| Required 	|
|---------------	|-------------	|------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	| Yes      	|

### updateSubscription
**Parameters**
| Name          	| Type        	| Example          	            | Required 	|
|---------------	|-------------	|---------------------------	|----------	|
| MarketplaceId 	| string      	| 'A2EUQ1WTGCTBG2' 	            | Yes      	|
| Subscription   	| Subscription 	| [Subscription](#subscription) | Yes      	|


### getServiceStatus
**Parameters**

| None |
|------|

## FulfillmentInventory

[Amazon MWS Fulfillment Inventory official documentation](http://docs.developer.amazonservices.com/en_CA/fba_inventory/FBAInventory_Overview.html)

### listInventorySupply
**Parameters**
| Name               	| Type     	| Example          	| Required                                                                      	|
|--------------------	|----------	|------------------	|-------------------------------------------------------------------------------	|
| SellerSkus         	| string[] 	| 'SAMPLESKU'      	| Yes, if QueryStartDateTime is not specified. Specifying both returns an error 	|
| QueryStartDateTime 	| Date     	| new Date()       	| Yes, if SellerSkus is not specified. Specifying both returns an error         	|
| ResponseGroup      	| string   	| 'Basic'          	| No                                                                            	|
| MarketplaceId      	| string   	| 'A2EUQ1WTGCTBG2' 	| No                                                                            	|

* [Possible values for ResponseGroup](http://docs.developer.amazonservices.com/en_CA/fba_inventory/FBAInventory_ListInventorySupply.html)

### listInventorySupplyByNextToken
**Parameters**
| Name      | Type      | Example                                                               | Required |
|-----------|-----------|-----------------------------------------------------------------------|----------|
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

### getServiceStatus

**Parameters**

| None |
|------|

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
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

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
| CurrencyCode        	| string              	| 'USD'      	| Yes      	|

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
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

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
| NextToken | NextToken | new NextToken('action', 'nexttoken')<br>See examples for sample usage | Yes      |

