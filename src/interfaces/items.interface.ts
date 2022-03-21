export interface Item {
  _id: string,
  imageLink: string,
  name: string,
  externalLink: string,
  description: string,
  category: string,
  property: object,
  unlockable: boolean,
  sensitive: boolean,
  numberOfCopy: number,
  chain: number,
  user: string,
  createdAt: Date,
  updatedAt: Date
}