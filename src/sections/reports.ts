import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const REPORTS_API_VERSION = '2009-01-01'
/**
 * List of supported strings
 * Should probably define an enum for this
 * http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html#ReportTypeCategories__ListingsReports
 */
type ReportType = string

export class Reports {
  constructor(private httpClient: HttpClient) {}

  async requestReport(parameters: { ReportType: ReportType }) {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Report,
      version: REPORTS_API_VERSION,
      action: 'RequestReport',
      parameters,
    })

    return [response, meta]
  }

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Report, REPORTS_API_VERSION)
  }
}
