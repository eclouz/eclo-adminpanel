export class ProductDetailSizeCreateDto{
    ProductDetailId :  Number ; 
    Size : String ;
    Quantity : Number ;
    constructor(){
        this.ProductDetailId = 0 ;
        this.Size = "" ;
        this.Quantity = 0 ;        
    }
}