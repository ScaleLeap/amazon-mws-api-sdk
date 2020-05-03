import crypto from 'crypto'

export const sign = (queryString: string, secret: string): string => {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(queryString, 'utf8')
  return hmac.digest('base64')
}
