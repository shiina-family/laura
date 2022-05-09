import fs from 'fs'
import { join } from 'path'

type ISO = 'JPY' | 'USD'
type Prices = Map<ISO, number>
interface IDomain {
  domain: string
  ownerId: string
  price: number
  currency: ISO
  wannaExpire: boolean
  billingDate: Date
}

export class Domain {
  static readonly path = join('data', 'domains.json')
  static domains: Array<IDomain> = []

  public static add(domain: IDomain) {
    this.domains.push(domain)
  }

  public static load() {
    this.domains = JSON.parse(fs.readFileSync(this.path, 'utf8'))
  }

  public static save() {
    fs.writeFileSync(this.path, JSON.stringify(this.domains, null, 2))
  }

  static collectDomainEachOwner(
    _domains: Array<IDomain> = this.domains
  ): Record<string, Array<IDomain>> {
    const result: Record<string, Array<IDomain>> = {}

    _domains.forEach((domain) => result[domain.ownerId].push(domain))

    return result
  }

  static sumPricesEachCurrency(prices: Array<[ISO, number]>): Prices {
    const result: Prices = new Map()

    prices.forEach(([currency, price]) => {
      if (result.has(currency))
        result.set(currency, result.get(currency)! + price)
      else result.set(currency, price)
    })

    return result
  }

  static sumPricesEachOwner(data: Record<string, Array<IDomain>>) {
    const result: Map<string, Prices> = new Map()

    Object.entries(data).forEach(([ownerId, domains]) => {
      const prices = this.sumPricesEachCurrency(
        domains.map(({ currency, price }) => [currency, price])
      )
      result.set(ownerId, prices)
    })

    return result
  }

  static calcPriceEachOwner(): Map<string, Prices> {
    const data = this.collectDomainEachOwner(this.domains)

    return this.sumPricesEachOwner(data)
  }

  static calcPriceWithinMonthEachOwner(months: number): Map<string, Prices> {
    const shouldCalc = (domain: IDomain): boolean =>
      !domain.wannaExpire &&
      domain.billingDate.getMonth() - new Date().getMonth() <= months
    const domains = this.domains.filter(shouldCalc)
    const data = this.collectDomainEachOwner(domains)

    return this.sumPricesEachOwner(data)
  }
}
