export class ProductCreateDto{
    brandId : number;
    subCategoryId: number;
    name: string ;
    unitPrice: number ;
    description: string ;
    constructor(){  
        this.brandId = 0;
        this.subCategoryId = 0;
        this.name = "" ;
        this.unitPrice = 0;
        this.description = "";
    }
}