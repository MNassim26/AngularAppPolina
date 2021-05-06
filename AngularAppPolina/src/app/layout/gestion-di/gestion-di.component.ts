import { Component, OnInit } from '@angular/core';
import { DemandeInvestissementService } from 'src/app/services/demandeInvestissement/demande-investissement.service';
import { DemandeServiceService } from 'src/app/services/demandeService/demande-service.service';
import { ProduitService } from 'src/app/services/produit/produit.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-gestion-di',
  templateUrl: './gestion-di.component.html',
  styleUrls: ['./gestion-di.component.css']
})
export class GestionDIComponent implements OnInit {
  demandeInvestissement:any={};
  demandeInvestissementListe:any=[];
  demandeService: any={};
  ds:any={};
  listProduit:any=[];
  listProduitDs:any=[];
  prixTotal=0;
  prixTotalDs=0;
  personne:any={};
  listPersonne:any=[];
  produitDi:any={};
  produitDs:any={};
  
  tmpId:Number;
  tmpDemandeI:any={}
  recherche:String;
  
  imageUrl="";
  fileToUpload : File = null;

  erreur=false;
  
  constructor(private demandeInvestissementService:DemandeInvestissementService,private demandeServiceService :DemandeServiceService,private produitService:ProduitService) { }

  ngOnInit() {
    this.getAllDi();
  }

  openAdd(){
    this.resetDi()
    $('.add').slideDown(1000);
    $('.addButton').fadeOut();
  }

  closeAdd(){
    this.demandeService={};
    this.produitDi={};
    this.listProduit= new Array();
    this.prixTotal=0;
  
    $('.add').slideUp(1000);
    $('.addButton').fadeIn(1000);
    }

  addPersonne(){
    if(this.personne.nomPrenom!=null){
      this.listPersonne.push(this.personne);
      this.personne={};
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
    if(this.demandeInvestissement.numero !=null && this.demandeInvestissement.objet!=null && 
      this.demandeInvestissement.date!=null &&  this.demandeInvestissement.rapportExplicatif!=null 
      && this.listProduit.length!=0 && this.listPersonne.length!=0){
      this.demandeInvestissementService.ajouterDemandeInvestissement(this.demandeInvestissement).subscribe(
        (data)=>{
          this.getAllDi();
          this.erreur=false;
        },
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      );
      
      $('.add').slideUp(1000);
      $('.addButton').fadeIn();
      this.resetDi();
    }
    else
    {
      this.erreur=true;
    }
  }

  resetDi(){
    this.erreur=false;
    this.demandeInvestissement={};
    this.produitDi={};
    this.listProduit=[];
    this.listPersonne=[];
    this.prixTotal=0;
    this.personne={};
    }

  getAllDi(){
    this.demandeInvestissementService.afficherDemandeInvestissement().subscribe(
      (data)=>{
        this.demandeInvestissementListe=data;
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );
  }

  beforeDelete(di){
    this.tmpDemandeI=di;
  }

  delete(){
    if(this.tmpDemandeI.demandeService!=null){
    this.produitService.deleteProduitbyDemandeServiceId(this.tmpDemandeI.demandeService.id).subscribe(
      (data)=>{
        
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );

    this.demandeServiceService.deleteByDemandeInvestissementId(this.tmpDemandeI.id).subscribe(
      (data)=>{

      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );
  }
    this.produitService.deleteProduitbyDemandeInvestissementId(this.tmpDemandeI.id).subscribe(
      (data)=>{

      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );

    this.demandeInvestissementService.deletePersonne(this.tmpDemandeI.id).subscribe(
      (data)=>{

      },
      (err)=>{
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      }
    );

    this.demandeInvestissementService.deleteById(this.tmpDemandeI.id).subscribe(
      (data)=>{
        this.getAllDi();
      },
      (err)=>{
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      }
    );
  }


  openCheck(id){
    this.demandeInvestissementService.trouverDemandeInvestissement(id).subscribe(
      (data)=>{
        this.demandeInvestissement=data;
        this.listProduit=this.demandeInvestissement.produit;
        this.listPersonne=this.demandeInvestissement.personne;
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );

    this.demandeServiceService.trouverDemandeServiceByDemandeInvestissementId(id).subscribe(
      (data)=>{
        this.demandeService=data;
        if(this.demandeService !=null)
        this.listProduitDs=this.demandeService.produit
      }
    )

    $('.add').slideUp(1000);
    $('.edit').slideUp(1000);
    $('.check').slideDown(1000);
    
    $('.addButton').fadeOut(1000)
  }

  closeCheck(){
    $('.check').slideUp(1000);
    $('.addButton').fadeIn(1000);
  }

  openEdit(id){
    this.tmpId=id;
    this.demandeInvestissementService.trouverDemandeInvestissement(id).subscribe(
      (data)=>{
        this.demandeInvestissement=data;
        // this.listProduit=this.demandeInvestissement.produit;
        // this.listPersonne=this.demandeInvestissement.personne;
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );

    this.demandeServiceService.trouverDemandeServiceByDemandeInvestissementId(id).subscribe(
      (data)=>{
        this.demandeService=data;
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    )

    $('.check').slideUp(1000);
    $('.edit').slideDown(1000);
    $('.add').slideUp(1000);
    $('.addButton').fadeOut()
  }

  closeEdit(){
    $('.edit').slideUp(1000);
    $('.addButton').fadeIn(1000);
  }


  closeEditDs(){
    this.demandeServiceService.trouverDemandeServiceByDemandeInvestissementId(this.tmpId).subscribe(
      (data)=>{
        this.demandeService=data;
      }
    )
    this.listProduitDs=[];
  }


  edit(){
    this.demandeInvestissementService.update(this.demandeInvestissement).subscribe(
      (data)=>{
        this.getAllDi();
      },
      (err)=>{
        console.log(err)
      }
    )

    if(this.demandeService!=null){
        this.demandeService.demandeInvestissement=this.demandeInvestissement;
        this.demandeServiceService.update(this.demandeService).subscribe(
        (data)=>{
          this.getAllDi();
        },
        (err)=>{
          console.log(err);
        }
      );
      
    } else{
      this.addDs();
      this.getAllDi();
    }
    this.listProduitDs=[];
    $('.edit').slideUp(1000);
    $('.addButton').fadeIn(1000);
  }

  addProduitDs(){
    if (this.produitDs.designation !=null && this.produitDs.quantite !=null && this.produitDs.prixUnitaire !=null ){
      this.calcPrixTotalDs();
      this.listProduitDs.push(this.produitDs);
      this.produitDs={};
    }
  }

  calcPrixTotalDs(){
    this.prixTotalDs=this.prixTotalDs+this.produitDs.quantite*this.produitDs.prixUnitaire;
    this.ds.prixTotal=this.prixTotalDs;
  }

  addDs(){
    this.ds.demandeInvestissement=this.demandeInvestissement;
    if (this.produitDs.designation !=null && this.produitDs.quantite !=null && this.produitDs.prixUnitaire !=null ){
      this.calcPrixTotalDs();  
      this.listProduitDs.push(this.produitDs);
    }

    this.ds.produit=this.listProduitDs;
    if(this.ds.numero !=null && this.ds.objet!=null && 
      this.ds.destinataire!=null && this.listProduitDs.length!=0){
      this.demandeServiceService.ajouterDemandeService(this.ds).subscribe(
        (data)=>{
          
        },
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      );
      
      
      this.resetDs();
    }
  }

  resetDs(){
    this.produitDs={};
    this.ds={};
    this.listProduitDs= new Array();
    this.prixTotalDs=0;
  }

  closeAddDs(){
    this.ds={};
  }

  search(){
    if(this.recherche!="" ){
      this.demandeInvestissementService.search(this.recherche).subscribe(
        (data)=>{
            if(data ==null){
              console.log("works")
              this.demandeInvestissementListe=[];
            } 
            else{
              this.demandeInvestissementListe=[];
              this.demandeInvestissementListe.push(data);
            }

        },
        (err)=>{
          console.log("erreur");
        }
      );
    }
    if(this.recherche=="")
    this.getAllDi();
  }

  addBonCommande(file:FileList){
    this.fileToUpload=file.item(0);
    var reader = new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=""+reader.result;
      this.demandeService.bonCommande=this.imageUrl;
    }
    this.imageUrl=""
    reader.readAsDataURL(this.fileToUpload)
  }

  addFacture(file:FileList){
    this.fileToUpload=file.item(0);
    var reader = new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=""+reader.result;
      this.demandeService.facture=this.imageUrl;
    }
    this.imageUrl=""
    reader.readAsDataURL(this.fileToUpload)
  }


}
