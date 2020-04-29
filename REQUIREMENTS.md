# Amazon MWS API TypeScript SDK

## Goals

To create a TypeScript SDK library for Amazon MWS API that is fully featured and has an excellent developer experience and ergonomics.

## High Level Design

This is a high level spec for the design of the module, but I am open to suggestions and recommendations.

Each section represented in the API, should be represented by a separate class.

Both params and response data should be validated. In another project I create a decorator for that, that takes in params validator and response validator and runs it on every method call. I can share that code, but it's for `io-ts`.

We don't have to replicate the params interface 1:1 with the API. Sometimes their params are not user friendly. For example, sometimes for lists of things they expect: "Foo.1", "Foo.2", this is better represented by an array, and then converted to what the API expects.

All returned data should properly typed.

Discriminated unions shall be used where possible.

### HttpClient

There shall be a generic HttpClient class that encapsulates the logic of the communication with the API. There are quite a few moving parts, like query string sorting, and request signing.

This should be swappable with custom implementations. The reason we want this, is because potentially this can be swapped out with a "proxy" HttpClient that runs requests via a cloud function that encapsulates the secrets.

But also, of course, it is just good software design to modularize and encapsulate :)

### Throttling Limits

Amazon has request [throttling limits](http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_Throttling.html). They return these as part of the response. I think there are two different ways. Sometimes it is part of the response body, and sometimes it is a header. We need to standardize this somehow and also think about how to return this with the data.

I am thinking there are a few ways:

* Tuple. E.g. `[ data, meta ]`
* Plain Object. E.g. `{ data, meta }`
* Class Object. E.g. `new Response(data, meta)`

Please research this and let me know what you think is best.

### Testing

The project should have a solid test coverage - 90% minimum.

Testing should be done via Jest.

If we need to record HTTP request / response sequences, we should use `@scaleleap/jest-polly` package.

Note: because of the sensitive nature of the data, I cannot share the MWS auth keys, and will have to do these live calls myself.

## XSD and TypeScript

**NOTE**: This section can be wrong!

Amazon uses and provides [XSD](https://www.w3.org/TR/xmlschema11-2/#built-in-datatypes) for all data types (see References below). I think we could parse these files and codegen some validation / interfaces code from these. All of their models have unique names.

Here are some examples of the types they provide: https://github.com/dmichael/amazon-mws/blob/master/examples/xsd/amzn-base.xsd

There seems to be a [library](https://github.com/khusamov/wsdl-xsd-parser) for parsing these, even in TypeScript! I think we can use that to codegen, or maybe not, I didn't look closely.

We can also use a tool to convert XML Schema to JSON schema. There are a few listed [here](https://stackoverflow.com/questions/3922026/generate-json-schema-from-xml-schema-xsd).

I did say initially that we may use `purify-ts`, but I changed my mind, I am sorry. Nothing wrong with your library. But I have another approach, which will be more beneficial for integration with other parts of the system. I want to use [typebox](https://github.com/sinclairzx81/typebox), because it creates a valid JSON Schema, which I can then reuse in Fastify webserver, which natively supports request and response validation via JSON Schema.

The goal here is to have an automated way to generating these, starting from XSD file downloads, to generation of schemas. Because if Amazon updates their XSDs then it'd be easy to update everything.

So I think we shall do the following:

* A script that downloads all of the `.xsd` files from Amazon and stores them locally, committed to the git.
* A script that parses these files and creates JSON Schema models.

## Error Classes

We should have well-defined error classes for each error type as [described in the API](http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_Errors.html), and detect these errors in the response and throw the specific error class, rather than a generic error object.

## Plan for Section Completion

We should complete the sections (under API References menu item) in the following order:

1. Sellers (*not important, but an easy one to get warmed up*)
2. Orders
3. Fulfillment Inventory
4. Products
5. Reports
6. Subscriptions
7. Finances
8. Feeds

The following sections will **not** be completed at the moment:

1. Merchant Fulfillment
2. Shipment Invoicing
3. Recommendations
4. Fulfillment Inbound Shipment
5. Fulfillment Outbound Shipment
6. Easy Ship

## Existing Libraries

* NodeJS: I have compiled the [list of all of the available libraries](https://docs.google.com/spreadsheets/d/1IC4X_tDygVEXbHhoFsugWmifksCRGjSoIDELpG8KXoI/edit#gid=0). Only few have basic TypeScript support. None have great developer experience. But all of them can be used to learn from.
* [Rust](https://github.com/fluxxu/mws-rs): don't know much about rust, except that the types here seem to be great!
* [Perl](https://github.com/interchange/Amazon-MWS): yes, Perl is an old language, but the library is up-to-date and is being actively maintained. I'm an ex-Perl developer and can help understanding this one, if necessary.
* [Ruby](https://github.com/hakanensari/peddler): this is a fully-featured Ruby library, lots to learn from. They also have "[cassettes](https://github.com/hakanensari/peddler/tree/master/test/vcr_cassettes)" for tests for actual live calls, from which we can borrow some XML return examples. There are several JS/Node ports of VCR listed under "[Ports in Other Languages](https://github.com/vcr/vcr)" readme section. E.g. [vcr.js](https://github.com/elcuervo/vcr.js).
* [Python](https://github.com/python-amazon-mws/python-amazon-mws): it's an ok and maintained library, can be used for cross checking with others.

## Raw XML Sample Data

When we need XML sample data examples for development and/or testing of the parser, please let me know specifically which section or request you need the data for. Please open an issue and assign it to me and I'll get these from the API, anonymize it and commit to the repo.

## References

* [Amazon MWS Documentation](https://developer.amazonservices.ca/gp/mws/docs.html)
* [Amazon MWS XML / XSD references](https://images-na.ssl-images-amazon.com/images/G/01/rainier/help/XML_Documentation_Intl.pdf).
* [Create your own MWS client library](http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_ClientLibraries.html)
* [Official Amazon MWS client libraries](https://developer.amazonservices.com/tools) - Available in Java, PHP, and C3. These *can* be outdated, but they can be helpful to study. I have experimented with an approach where C# classes can be converted to TypeScript classes. Worked ok.