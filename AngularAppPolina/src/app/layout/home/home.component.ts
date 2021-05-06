import { Component, OnInit } from '@angular/core';

import { DemandeServiceService } from 'src/app/services/demandeService/demande-service.service';
import { DemandeInvestissementService } from 'src/app/services/demandeInvestissement/demande-investissement.service';
import { ProduitService } from 'src/app/services/produit/produit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  demandeService: any={};
  produit:any={};
  listProduit= new Array();
  prixTotal=0;

  demandeInvestissement:any={};
  personne:any={};
  listPersonne=new Array();
  produitDi:any={};
  
  erreur=false;
  erreur2=false;
 
  constructor(private demandeServiceService :DemandeServiceService, private produitService :ProduitService,private demandeInvestissementService:DemandeInvestissementService) { }

  ngOnInit() {
     
  }

  onSubmitDs(){
    if (this.produit.designation !=null && this.produit.quantite !=null && this.produit.prixUnitaire !=null ){
      this.calcPrixTotalDs();  
      this.listProduit.push(this.produit);
    }

    this.demandeService.produit=this.listProduit;
    if(this.demandeService.numero !=null && this.demandeService.objet!=null && 
      this.demandeService.destinataire!=null && this.listProduit.length!=0){
      this.demandeServiceService.ajouterDemandeService(this.demandeService).subscribe(
        (data)=>{
          this.erreur=false;
        },
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      );
      
      this.resetDs();
    }
    else
    { 
      this.erreur=true;
    
    }
}
  addProduitDs(){
    if (this.produit.designation !=null && this.produit.quantite !=null && this.produit.prixUnitaire !=null ){
      this.calcPrixTotalDs();
      this.listProduit.push(this.produit);
      console.log(this.listProduit)
      this.produit={};
    }
  }


  calcPrixTotalDs(){
    this.prixTotal=this.prixTotal+this.produit.quantite*this.produit.prixUnitaire;
    this.demandeService.prixTotal=this.prixTotal;
  }

  resetDs(){
    this.erreur=false;
    this.demandeService={};
    this.produit={};
    this.listProduit= new Array();
    this.prixTotal=0;
  }

  addPersonne(){
    if(this.personne.nomPrenom!=null){
      this.listPersonne.push(this.personne);
      this.personne={};
      console.log("aa"+this.demandeInvestissement.rapportExplicatif)
    }
  }
  
  addProduitDi(){
    if (this.produitDi.designation !=null && this.produitDi.quantite !=null && this.produitDi.prixUnitaire !=null ){
      this.calcPrixTotalDi();
      this.listProduit.push(this.produitDi);
      this.produitDi={};
    }
  }

  calcPrixTotalDi(){
    this.prixTotal=this.prixTotal+this.produitDi.quantite*this.produitDi.prixUnitaire;
    this.demandeInvestissement.prixTotal=this.prixTotal;
  }

  onSubmitDi(){
    if (this.produitDi.designation !=null && this.produitDi.quantite !=null && this.produitDi.prixUnitaire !=null ){
      this.calcPrixTotalDi();  
      this.listProduit.push(this.produitDi);
    }

    if (this.personne.nomPrenom !=null ){
      this.listPersonne.push(this.personne);
    }

    this.demandeInvestissement.produit=this.listProduit;
    this.demandeInvestissement.personne=this.listPersonne;
    // this.demandeInvestissement.demandeService={};
    if(this.demandeInvestissement.numero !=null && this.demandeInvestissement.objet!=null && 
      this.demandeInvestissement.date!=null &&  this.demandeInvestissement.rapportExplicatif!=null 
      && this.listProduit.length!=0 && this.listPersonne.length!=0){
      this.demandeInvestissementService.ajouterDemandeInvestissement(this.demandeInvestissement).subscribe(
        (data)=>{
          this.erreur2=false;
        },
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      );
      
      this.resetDi();
    }
    else
    {
      console.log(this.demandeInvestissement.numero)
      console.log(this.demandeInvestissement.objet)
      console.log(this.demandeInvestissement.date)
      console.log(this.demandeInvestissement.rapportExplicatif)
      this.erreur2=true;
    }
  }

  resetDi(){
    this.erreur2=false;
    this.demandeInvestissement={};
    this.produitDi={};
    this.listProduit= new Array();
    this.prixTotal=0;
    this.personne={};
    }

}
