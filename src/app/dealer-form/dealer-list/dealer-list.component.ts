import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { DealerData } from '../../dealer-data';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.css'],
})
export class DealerListComponent implements OnInit {
  dealers: any[] = [];
  selectedDealer: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchDealers();
  }

  fetchDealers() {
    this.dataService.getDealers().subscribe((dealers) => {
      this.dealers = dealers;
    });
  }

  openDealerModal(dealer?: any): void {
    this.selectedDealer = dealer ? { ...dealer } : null;
    console.log(this.selectedDealer);
    document.getElementById('dealerModal')!.style.display = 'block';
  }

  closeDealerModal(event: { refresh: boolean; dealer?: any }): void {
    document.getElementById('dealerModal')!.style.display = 'none';
    if (event.refresh) {
      if (event.dealer) {
        if (this.selectedDealer) {
          const index = this.dealers.findIndex((d) => d.id === event.dealer.id);
          if (index !== -1) {
            this.dealers[index] = event.dealer;
          } else {
            this.dealers.push(event.dealer);
          }
        } else {
          this.fetchDealers();
        }
      }
      this.selectedDealer = null;
    }
  }

  deleteDealer(id: number): void {
    if (confirm('Are you sure you want to delete this dealer?')) {
      this.dataService.deleteDealer(id).subscribe(() => {
        this.dealers = this.dealers.filter((dealer) => dealer.id !== id);
      });
    }
  }
}
