import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeInvestissementService {
  public url:string='http://localhost:8080/demandeInvestissement/';
  public urlPersonne:string='http://localhost:8080/personne/';
  constructor(private http:HttpClient) { }

  ajouterDemandeInvestissement(demandeInvestissement){
    return this.http.post(this.url+"add",demandeInvestissement);
  }

  afficherDemandeInvestissement(){
    return this.http.get(this.url+"findAll")
  }

  deleteById(id){
    return this.http.delete(this.url+"delete/"+id);
  }

  deletePersonne(id){
    return this.http.delete(this.urlPersonne+"deleteByDemandeInvestissementId/"+id);
  }

  trouverDemandeInvestissement(id){
    return this.http.get(this.url+"findOne/"+id);
  }

  update(demandeInvestissement){
    return this.http.patch(this.url+"update/"+demandeInvestissement.id,demandeInvestissement);
  }

  search(recherche){
    return this.http.get(this.url+"search/"+recherche);
  }


}
