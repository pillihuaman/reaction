import { Observable } from "rxjs";
import { BaseRepository } from "./baseRepository";
import { TreeNode } from "../@data/model/general/treeNode";
import { GeneralConstans } from "./generalConstant";

export class BaseImplementation implements BaseRepository {
  page: number = GeneralConstans.page;
  pageSize: number = GeneralConstans.perPage;
  result?:any;
  customizePropertyNames(data: any[], columnNamesMapping: { [key: string]: string }): TreeNode<any>[] {
    
    return data.map((value, index) => {
      let transformedData: any = {};
      for (const key in value) {
        if (columnNamesMapping[key]) {
          transformedData[columnNamesMapping[key]] = value[key];
        } else {
         // transformedData[key] = value[key];
        }
      }

      let costuItem: TreeNode<any> = { data: transformedData }
      return costuItem;
    });
  }
  revertPropertyNames(data: TreeNode<any>[], columnNamesMapping: { [key: string]: string }): any[] {
    //debuger
    return data.map((node) => {
      //debuger
      let revertedData: any = {};
      for (const key in node.data) {
        const originalKey = Object.keys(columnNamesMapping).find(mappedKey => columnNamesMapping[mappedKey] === key);
        revertedData[originalKey || key] = node.data[key];
      }
      return revertedData;
    });
  }
  

  onPageSizeChange(pageSize: number): void {
    ;
    //this.pageSize = pageSize;
    //this.findPages();
  }
   onPageChange(page: number): void {
    this.page = page;
    console.log("emitter pageChange->>>employee " + this.page);
    this.findByDefualt(); // Adjust as needed
  }

  /*

  checkInputs() {
    //declare input to find 
    const idToFind = this.pageRequestForm.get('idToFind')?.value || '';
    const titleToFind = this.pageRequestForm.get('titleToFind')?.value || '';
    const contentToFind = this.pageRequestForm.get('contentToFind')?.value || '';
    const urlToFind = this.pageRequestForm.get('urlToFind')?.value || '';

    this.searchButtonDisabled = !(idToFind || titleToFind || contentToFind || urlToFind);
    if (this.searchButtonDisabled) {
      this.typeOfSearch === GeneralConstans.typeSearchDefault
      this.findPagesProcess();
    }
    this.validateObjectID();
  }*/

  findByparameter() {
 
    //  lista de errores
    /*
    this.listError = this.validateObjectID();
    if (this.listError.length === 0) {
      this.pageRequestForm.get('idToFind')?.markAsTouched();
      this.page = GeneralConstans.page
      this.pageSize = GeneralConstans.perPage;
      this.typeOfSearch = GeneralConstans.typeSearchEspecific
     Mthod to find  this.findPagesProcess();*/
    
  }
  findByDefualt() {
/*
    this.typeOfSearch = GeneralConstans.typeSearchDefault
    this.findPagesProcess();
  }*/

}
}