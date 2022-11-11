import { Component, OnInit } from '@angular/core';

import { listData } from './data';

import { InvoiceList } from './list.model';
import { CommandesService } from '../../../core/services/commandes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * Invoices list component
 */
export class ListComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  listData: InvoiceList[];
  user: any;
  commandes:any[]=[];

  constructor(private cmdService: CommandesService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Invoice List', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.getCommandes(this.user.id)

    /**
     * fetches the data
     */
    this._fetchData();
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
      console.log(this.commandes);

    })
  }

  /**
   * fetches the invoice list data
   */
  private _fetchData() {
    this.listData = listData;
  }
}
