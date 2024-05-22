export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public categoria: string,
    public price: number,
    public image: string,
    public onSale: boolean
  ) {}
}
