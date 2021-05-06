import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeServiceService {
  public url:string='http://localhost:8080/demandeService/';
  
  constructor(private http:HttpClient) { }

  ajouterDemandeService(demandeService){
    return this.http.post(this.url+"add",demandeService);
  }

  afficherDemandeService(){
    return this.http.get(this.url+"findAllDemandeServiceOnly")
  }

  deleteById(id){
    return this.http.delete(this.url+"delete/"+id);
  }

  deleteByDemandeInvestissementId(id){
    return this.http.delete(this.url+"deleteByDemandeInvestissementId/"+id);
  }

  trouverDemandeService(id){
    return this.http.get(this.url+"findOne/"+id);
  }

  update(demandeService){
    return this.http.patch(this.url+"update/"+demandeService.id,demandeService);
  }

  

  trouverDemandeServiceByDemandeInvestissementId(id){
    return this.http.get(this.url+"/findByDemandeServiceInvestissementId/"+id)
  }

  search(recherche){
    return this.http.get(this.url+"search/"+recherche);
  }
}
