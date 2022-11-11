import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { OrderSortableService, SortEvent } from './orders-sortable.directive'

import { OrderService } from './orders.service'
import { Orders } from './orders.model'
import { ordersData } from './data'
import { CommandesService } from '../../../core/services/commandes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrderService, DecimalPipe]

})
export class OrdersComponent implements OnInit {
  // breadcrumb items
  breadCrumbItems: Array<{}>;

  ordersData: Orders[];

  orders$: Observable<Orders[]>;
  total$: Observable<number>;
  model: NgbDateStruct;
  @ViewChildren(OrderSortableService) headers: QueryList<OrderSortableService>;
  user: any;
  commandes:any[]=[];

  constructor(public service: OrderService, private cmdService: CommandesService, private router: Router) {
    // this.orders$ = service.orders$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'Orders', active: true }];

    this.ordersData = ordersData;
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.getCommandes(this.user.id)
  }

  getCommandes(id: string){
    console.log(id);

    this.cmdService.getCommandes(id).subscribe(data =>{
      // console.log(data)
      this.commandes = data.map(fav=>{
        // console.log(fav);
        return {

          uid: fav.payload.doc.id,

          ...fav.payload.doc.data() as {}
        }
      })
      // this.orders$ = this.commandes
      console.log(this.commandes);

    })
  }

  update(commande:any, etat:string){
    let cmd = commande;
    cmd.etat = etat
    this.cmdService.updateCommande(cmd,cmd.uid)
  }

  detail(table){
    localStorage.setItem('commande',JSON.stringify(table));
    this.router.navigate(['invoices/detail'])
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
