export class ProductCreateDto{
    BrandId : Number;
    SubCategoryId: Number;
    Name: String ;
    UnitPrice: Number ;
    Description: String ;
    constructor(){
        this.BrandId = 0;
        this.SubCategoryId = 0;
        this.Name = "" ;
        this.UnitPrice = 0;
        this.Description = "";
    }
}