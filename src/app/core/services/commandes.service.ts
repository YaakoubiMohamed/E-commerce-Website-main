import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  userRef!: AngularFirestoreCollection<Commande>;

  constructor(private db: AngularFirestore) {

    this.userRef = db.collection('/commande');

  }

  getCommandes(id) {

    return this.db.collection('commandes', (ref) => ref.where("article.id_utilisateur", "==", id)).snapshotChanges();

  }

  updateCommande(commande:any, id:string){
    return this.db.collection('commandes').doc(id).update(commande);
  }
}
