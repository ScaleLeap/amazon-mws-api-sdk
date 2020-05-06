import { amazonMarketplaces, HttpClient } from '../../src'
import { MWS } from '../../src/mws'

const mockMws = new MWS(
  new HttpClient(
    {
      awsAccessKeyId: '',
      marketplace: amazonMarketplaces.CA,
      mwsAuthToken: '',
      secretKey: '',
      sellerId: '',
    },
    () =>
      Promise.resolve({
        data: `<ListMarketplaceParticipationsResponse xmlns="https://mws.amazonservices.com/Sellers/2011-07-01"> 
            <ListMarketplaceParticipationsResult> 
              <ListParticipations> 
                <Participation> 
                  <MarketplaceId>A2EUQ1WTGCTBG2</MarketplaceId> 
                  <SellerId>x</SellerId> 
                  <HasSellerSuspendedListings>No</HasSellerSuspendedListings> 
                </Participation> 
                <Participation> 
                  <MarketplaceId>A6W85IYQ5WB1C</MarketplaceId> 
                  <SellerId>x</SellerId> 
                  <HasSellerSuspendedListings>No</HasSellerSuspendedListings> 
                </Participation> 
              </ListParticipations> 
              <ListMarketplaces> 
                <Marketplace> 
                  <MarketplaceId>A2EUQ1WTGCTBG2</MarketplaceId> 
                  <DefaultCountryCode>CA</DefaultCountryCode> 
                  <DomainName>www.amazon.ca</DomainName> 
                  <Name>Amazon.ca</Name> 
                  <DefaultCurrencyCode>CAD</DefaultCurrencyCode> 
                  <DefaultLanguageCode>en_CA</DefaultLanguageCode> 
                </Marketplace> 
                <Marketplace> 
                  <MarketplaceId>A6W85IYQ5WB1C</MarketplaceId> 
                  <DefaultCountryCode>US</DefaultCountryCode> 
                  <DomainName>iba.login.amazon.com</DomainName> 
                  <Name>IBA</Name> 
                  <DefaultCurrencyCode>USD</DefaultCurrencyCode> 
                  <DefaultLanguageCode>en_US</DefaultLanguageCode> 
                </Marketplace> 
              </ListMarketplaces> 
            </ListMarketplaceParticipationsResult> 
            <ResponseMetadata> 
              <RequestId>bd71c84f-d2a6-4ce0-ae41-6dc8a13ce637</RequestId> 
            </ResponseMetadata> 
          </ListMarketplaceParticipationsResponse>`,
        headers: {
          'x-mws-request-id': '0',
          'x-mws-timestamp': '2020-05-06T08:22:23.582Z',
          'x-mws-quota-max': '1000',
          'x-mws-quota-remaining': '999',
          'x-mws-quota-resetson': '2020-05-06T10:22:23.582Z',
        },
      }),
  ),
)

describe('sellers', () => {
  it('listMarketplaceParticipations', async () => {
    expect.assertions(1)

    expect(await mockMws.sellers.listMarketplaceParticipations()).toMatchSnapshot()
  })
})
