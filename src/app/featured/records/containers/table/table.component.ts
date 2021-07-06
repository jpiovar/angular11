import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { compareValues, getIndexBasedId, getItemBasedId } from 'src/app/shared/utils/helper';
import { AppState } from 'src/app/state';
import { RecordLoadDetail, RecordsLoad } from 'src/app/state/records/records.actions';
import { environment } from 'src/environments/environment';
import { compare } from 'natural-orderby';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tableDataEndPoint: string;
  tableRecordEndPoint: string;
  origin: string;
  originalRecords: any[];
  records: any[];
  pages: any[] = [];
  itemsPerPage: number = 5;
  activePage: number = 0;
  sortBy: string = 'firstname';
  sortByCol: any = {};
  dialogRef: MatDialogRef<any>;
  openDialogId: string = '';
  dialogAction: string = '';

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.origin = environment.beOrigin;
    this.tableDataEndPoint = environment.beTableDataEndPoint;
    this.tableRecordEndPoint = environment.beTableRecordEndPoint;
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

  triggerTableRecordLoad(origin: string, dataEndPoint: string, id: string): void {
    // debugger;
    const url = `${origin}${dataEndPoint}/${id}`;
    this.store.dispatch(new RecordLoadDetail({ id, detail: url, storeMode: true }));
  }

  tableDataSubscription() {
    this.subscription.add(
      this.store.select('records')
        // .pipe(last())
        .subscribe((res: any) => {
          //  debugger;
          if (res && !res.loading && res.data) {
            debugger;
            this.originalRecords = JSON.parse(JSON.stringify(res.data));
            if (!this.openDialogId && !this.dialogAction) {
              this.processRecords(this.originalRecords);
            } else if (this.openDialogId) {
              // debugger;
              this.processTargetRecord(this.openDialogId);
              this.openViewEditDialog(this.openDialogId);
            }
          }
        })
    );
  }

  processTargetRecord(recordId: string) {
    const indexR = getIndexBasedId(this.records, recordId);
    const indexOr = getIndexBasedId(this.originalRecords, recordId);
    this.records[indexR] = JSON.parse(JSON.stringify(this.originalRecords[indexOr]));
  }

  processRecords(records: any[]) {
    // debugger;
    this.pages = new Array(Math.ceil(records.length / this.itemsPerPage));
    this.records = records.slice(this.activePage * this.itemsPerPage, this.activePage * this.itemsPerPage + this.itemsPerPage);
  }

  jumpToPage(page: number): void {
    // debugger;
    this.activePage = page;
    this.processRecords(this.originalRecords);
  }

  previousPage() {
    // debugger;
    if (this.activePage >= 1) {
      this.activePage--;
      this.processRecords(this.originalRecords);
    }
  }

  nextPage() {
    // debugger;
    if (this.activePage < this.pages.length - 1) {
      this.activePage++;
      this.processRecords(this.originalRecords);
    }
  }

  sortByColumn(colname: string) {
    this.sortByCol = {};
    let direction: 'asc'|'desc';
    if (this.sortBy !== colname) {
      direction = 'asc';
      this.sortBy = colname;
      this.sortByCol[colname] = 'asc';
    } else {
      direction = 'desc';
      this.sortBy = '';
      this.sortByCol[colname] = 'desc';
    }
    // this.records.sort(compareValues(colname, direction));
    // this.originalRecords.sort(compareValues(colname, direction));
    this.originalRecords.sort((a, b) => compare({ order: direction })(a[colname], b[colname]));
    this.processRecords(this.originalRecords);
  }

  triggerOpenViewEditDialog(item: any) {
    // debugger;
    this.openDialogId = item.id;
    this.triggerTableRecordLoad(this.origin, this.tableRecordEndPoint, item.id);
  }

  openViewEditDialog(id: string) {
    debugger;
    this.dialogAction = '';
    const recordDetail = getItemBasedId(this.records, id);
    this.dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'view-edit-dialog-class',
      id: `view-edit-dialog-id-${id}`,
      // width: '800px',
      // height: '300px',
      data: {
        title: 'Details dialog View/Edit',
        details: {
          firstname: recordDetail?.data?.firstname,
          surname: recordDetail?.data?.surname,
          age: recordDetail?.data?.age,
          details: recordDetail?.data?.details,
          id: recordDetail?.data?.id
        },
        mode: 'view'
      }
    });

    this.dialogRef.beforeClosed().subscribe(result => {
      debugger;
      console.log(`Dialog result: ${result}`);
      this.dialogAction = result;
      this.openDialogId = '';
    });

    // this.dialogRef.afterClosed().subscribe(result => {
    //   debugger;
    //   console.log(`Dialog result: ${result}`);
    //   this.openDialogId = '';
    // });
  }


}
