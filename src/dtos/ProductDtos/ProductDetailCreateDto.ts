export class ProductDetailCreateDto{
    ProductId:Number;
    ImagePath:String;
    Color:String;
    constructor(){
        this.ProductId = 0 ;
        this.ImagePath = "";
        this.Color = "";
    }
}