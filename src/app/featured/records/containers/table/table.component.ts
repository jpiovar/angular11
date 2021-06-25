import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { compareValues } from 'src/app/shared/utils/helper';
import { AppState } from 'src/app/state';
import { RecordsLoad } from 'src/app/state/records/records.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tableDataEndPoint: string;
  origin: string;
  originalRecords: any[];
  records: any[];
  pages: any[] = [];
  itemsPerPage: number = 5;
  activePage: number = 0;
  sortBy: string = 'firstname';

  constructor(private store: Store<AppState>) {
    this.origin = environment.beOrigin;
    this.tableDataEndPoint = environment.beTableDataEndPoint;
    this.triggerTableLoad(this.origin, this.tableDataEndPoint);
    this.tableDataSubscription();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  triggerTableLoad(origin: string, dataEndPoint: string): void {
    // debugger;
    const url = `${origin}${dataEndPoint}`;
    this.store.dispatch(new RecordsLoad(url));
  }

  tableDataSubscription() {
    this.subscription.add(
      this.store.select('records')
        // .pipe(last())
        .subscribe((res: any) => {
          //  debugger;
          if (res && res.data) {
            // debugger;
            this.originalRecords = JSON.parse(JSON.stringify(res.data));
            this.processRecords(this.originalRecords);
          }
        })
    );
  }

  processRecords(records: any[]) {
    // debugger;
    this.pages = new Array(Math.ceil(records.length / this.itemsPerPage));
    this.records = records.slice(this.activePage*this.itemsPerPage, this.activePage*this.itemsPerPage+this.itemsPerPage);
  }

  jumpToPage(page: number): void {
    // debugger;
    this.activePage = page;
    this.processRecords(this.originalRecords);
  }

  previousPage() {
    // debugger;
    if(this.activePage >= 1) {
      this.activePage--;
      this.processRecords(this.originalRecords);
    }
  }

  nextPage() {
    // debugger;
    if(this.activePage < this.pages.length-1) {
      this.activePage++;
      this.processRecords(this.originalRecords);
    }
  }

  sortByColumn(colname: string) {
    // debugger;
    let direction = '';
    if (this.sortBy !== colname) {
      direction = 'asc';
      this.sortBy = colname;
    } else {
      direction = 'desc';
      this.sortBy = '';
    }
    // this.records.sort(compareValues(colname, direction));
    this.originalRecords.sort(compareValues(colname, direction));
    this.processRecords(this.originalRecords);
  }


}
