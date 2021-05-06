import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  public url:string='http://localhost:8080/produit/';
  produit:any=[];
  constructor(private http:HttpClient) { }

  deleteProduitbyDemandeServiceId(id){
    return this.http.delete(this.url+"deleteByDemandeServiceId/"+id);
  }

  deleteProduitbyDemandeInvestissementId(id){
    return this.http.delete(this.url+"deleteByDemandeInvestissementId/"+id);
  }

  ajouterProduit(produit){
    return this.http.post(this.url+"add",produit);
  }

  trouverProduitByIdDs(id){
    return this.http.get(this.url+"findByDemandeService/"+id);
  }

  trouverProduitByIdDi(id){
    return this.http.get(this.url+"findByDemandeInvestissement/"+id);
  }
}
