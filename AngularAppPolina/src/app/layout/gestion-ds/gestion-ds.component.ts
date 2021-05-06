import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from 'src/app/services/demandeService/demande-service.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-gestion-ds',
  templateUrl: './gestion-ds.component.html',
  styleUrls: ['./gestion-ds.component.css']
})
export class GestionDSComponent implements OnInit {
  demandeService: any={};
  demandeServiceListe: any=[];
  produit:any={};
  listProduit:any=[];
  tmpId=Number;
  prixTotal=0;
  recherche:String;

  imageUrl="";
  fileToUpload : File = null;

  erreur=false;

  constructor(private demandeServiceService :DemandeServiceService, private produitService :ProduitService) { }

  ngOnInit() {
    this.getAllDs();
  }

  getAllDs(){
    this.demandeServiceService.afficherDemandeService().subscribe(
      (data)=>{
        this.demandeServiceListe=data;
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );
    
  }

  resetDs(){
    this.erreur=false;
    this.demandeService={};
    this.produit={};
    this.listProduit= new Array();
    this.prixTotal=0;
  }

  onSubmit(){
    if (this.produit.designation !=null && this.produit.quantite !=null && this.produit.prixUnitaire !=null ){
      this.calcPrixTotal();  
      this.listProduit.push(this.produit);
    }

    this.demandeService.produit=this.listProduit;
    if(this.demandeService.numero !=null && this.demandeService.objet!=null && 
      this.demandeService.destinataire!=null && this.listProduit.length!=0){
      this.demandeServiceService.ajouterDemandeService(this.demandeService).subscribe(
        (data)=>{
          this.getAllDs();
          this.erreur=false;
        },
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      );
      
      
      this.resetDs();

      $('.add').slideUp(1000);
      $('.addButton').fadeIn();
    }
    else
    {
      this.erreur=true;
    }
}
  addProduit(){
    if (this.produit.designation !=null && this.produit.quantite !=null && this.produit.prixUnitaire !=null ){
      this.calcPrixTotal();
      this.listProduit.push(this.produit);
      this.produit={};
    }
  }


  calcPrixTotal(){
    this.prixTotal=this.prixTotal+this.produit.quantite*this.produit.prixUnitaire;
    this.demandeService.prixTotal=this.prixTotal;
  }

  beforeDelete(id){
    this.tmpId=id;
  }

  delete(){
    this.produitService.deleteProduitbyDemandeServiceId(this.tmpId).subscribe(
      (data)=>{
        
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    )
     
    this.demandeServiceService.deleteById(this.tmpId).subscribe(
      (data)=>{
        this.getAllDs();
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );
  }

  
  openAdd(){
    this.resetDs()
    $('.add').slideDown(1000);
    $('.addButton').fadeOut();
  }

  closeAdd(){
    this.resetDs()
    $('.add').slideUp(1000);
    $('.addButton').fadeIn(1000);
    }

  openCheck(id){
    this.demandeServiceService.trouverDemandeService(id).subscribe(
      (data)=>{
        this.demandeService=data;
        this.listProduit=this.demandeService.produit
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );
    
    // this.produitService.trouverProduitByIdDs(id).subscribe(
    //   (data)=>{
    //    this.listProduit=data;
    //   },
    //   (err)=>{
    //     alert("erreur");
    //     console.log(err);
    //   }
    // )
    
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
    this.demandeServiceService.trouverDemandeService(id).subscribe(
      (data)=>{
        this.demandeService=data;
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );

    $('.check').slideUp(1000);
    $('.edit').slideDown(1000);
    $('.add').slideUp(1000);
    $('.addButton').fadeOut()
  }

  closeEdit(){
    $('.edit').slideUp(1000);
    $('.addButton').fadeIn(1000);
  }

  edit(){
    this.demandeServiceService.update(this.demandeService).subscribe(
      (data)=>{
        this.getAllDs();
      },
      (err)=>{
        alert("erreur");
        console.log(err);
      }
    );
    $('.edit').slideUp(1000);
    $('.addButton').fadeIn(1000);
  }


  addBonCommande(file:FileList){
    this.fileToUpload=file.item(0);
    var reader = new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=""+reader.result;
      console.log(this.imageUrl)
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
      console.log(this.imageUrl)
      this.demandeService.facture=this.imageUrl;
    }
    this.imageUrl=""
    reader.readAsDataURL(this.fileToUpload)
  }

  search(){
    if(this.recherche!="" ){
      this.demandeServiceService.search(this.recherche).subscribe(
        (data)=>{
            if(data ==null){
              console.log("works")
              this.demandeServiceListe=[];
            } 
            else{
              this.demandeServiceListe=[];
              this.demandeServiceListe.push(data);
            }

        },
        (err)=>{
          console.log("erreur");
        }
      );
    }
    if(this.recherche=="")
    this.getAllDs();
  }


}
