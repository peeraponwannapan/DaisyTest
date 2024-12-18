export interface Product {
  id: number
  name: string
  productType: ProductType
  price: number
  expiredDate: number
}

export interface ProductType {
  id: number
  name: string
  image: string
  condition: string
}
