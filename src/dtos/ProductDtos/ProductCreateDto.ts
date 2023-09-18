export class ProductCreateDto{
    brandId : Number;
    subCategoryId: Number;
    name: String ;
    unitPrice: Number ;
    description: String ;
    constructor(){
        this.brandId = 0;
        this.subCategoryId = 0;
        this.name = "" ;
        this.unitPrice = 0;
        this.description = "";
    }
}