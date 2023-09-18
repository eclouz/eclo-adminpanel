export class ProductDetailCreateDto{
    ProductId:Number;
    ImagePath:string;
    Color:string;
    constructor(){
        this.ProductId = 0 ;
        this.ImagePath = "";
        this.Color = "";
    }
}