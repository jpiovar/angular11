import { Injectable } from '@angular/core';
import { of, throwError, combineLatest, zip, Observable, Observer } from 'rxjs';
import { delay, map, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { environment } from '../../../environments/environment';
import { DataProviderService } from './data.provider.service';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  homeEndPoint: string;
  origin: string;
  adisVersion: any;
  adisVersionEndPoint: string;

  data1: Array<object> = [
    { name: 'Conor McGregor', wins: 21, losses: 3 },
    { name: 'Tony Ferguson', wins: 23, losses: 3 },
    { name: 'Max Holloway', wins: 19, losses: 3 },
    { name: 'Jon Jones', wins: 22, losses: 1 },
    { name: 'Daniel Cormier', wins: 21, losses: 1 },
    { name: 'Brock Lesnar', wins: 5, losses: 3 }
  ];

  data2: Array<object> = [
    { name: 'janko', wins: 21, losses: 3 },
    { name: 'hrasko', wins: 23, losses: 3 },
    { name: 'anka', wins: 19, losses: 3 },
    { name: 'mudra', wins: 22, losses: 1 }
  ];

  userData1: object = {
    id: '1',
    name: 'James',
    surname: 'Bond',
    jwtToken: 'jwtString'
  };

  userData2: object = {
    id: '',
    name: '',
    surname: '',
    jwtToken: ''
  };

  constructor(
    private dataProviderService: DataProviderService
  ) {
    this.origin = environment.beOrigin;
    this.homeEndPoint = environment.beHomeEndPoint;
    this.adisVersionEndPoint = environment.beAdisVersionEndPoint;
    // debugger;
    // this.dataProviderService.data;
  }

  // async fetchDataAdisVersion() {
  fetchDataAdisVersion() {
    return new Promise((resolve, reject) => {
      // debugger;
      ajax.getJSON(`${this.origin}${this.adisVersionEndPoint}`)
        .subscribe(
          res => {
            this.adisVersion = res;
            resolve({ case: 'success', dataRes: res });
          },
          err => {
            resolve({ case: 'error', dataRes: err });
          }
        );
    });
  }

  getData1() {
    return of(this.data1);
  }

  getError1() {
    console.error('data1 error');
    return throwError('data1 error case');
  }

  getData2() {
    return of(this.data2).pipe(delay(2000));
  }

  getData3() {
    return of(this.data1).pipe(delay(1000));
  }

  toObject(arr: any[]) {
    const rv = {};
    for (let i = 0; i < arr.length; ++i) {
      const prop = Object.keys(arr[i])[0];
      rv[prop] = arr[i];
    }
    return rv;
  }

  getCombined1(endPoint: string): Observable<any> {
    // debugger;
    const homeReq = ajax.getJSON(`${this.origin}${this.homeEndPoint}`);
    return new Observable((observer: Observer<any>) => {

      // debugger;
      this.fetchDataAdisVersion().then((response) => {
        // debugger;
        console.log('fetchDataAdisVersion resolved', response);

        homeReq.subscribe((data: any) => {
          // debugger;
          // const content = ajax.getJSON(`${this.origin}${data.collection.content.dataTableContent.href}`);
          // const arrObs = data.collection.links.map((link: any) => {
          const res = {};
          const arrObs = data.links.map((link: any, index: number) => {
            // debugger;
            const rel = link?.rel || `link${index}`;

            let resource = link.href;
            if (resource.startsWith('/')) {
              resource = resource.substring(1);
            }
            res[rel] = {};
            res[rel]['index'] = index;
            res[rel]['linkData'] = link;
            return ajax.getJSON(`${this.origin}${resource}`);
            // return res;
          });
          // arrObs.unshift(initialReq);

          // arrObs.unshift(arrObs.pop());

          // const jj =[];
          // for (let i=0; i < arrObs.length; i++) {
          //   jj.push(arrObs[i].pipe(mapTo('FIRST!')));
          // }
          // debugger;
          // const obj = this.toObject(arrObs);
          // if (content) {
          // debugger;
          // arrObs.unshift(content);
          zip(...arrObs).subscribe(
            (sub: any) => {
              console.log(sub);
              // debugger;

              sub.push(this.adisVersion);
              res['adisVersion'] = { index: sub.length - 1 };

              Object.keys(res).forEach((key: string, index: number) => {
                // debugger;
                res[key]['contentData'] = sub[index];
              });
              // debugger;
              // return observer.next(sub);
              return observer.next(res);
            },
            error => throwError(error),
            () => observer.complete()
          );
          // }
        });

      })
        .catch(error => {
          // debugger;
          console.log('fetchDataAdisVersion error process done');
        })
        .finally(() => {
          // debugger;
          console.log('fetchDataAdisVersion process done');
        });

      // });
      // }

    });

  }


  getCombinedData(): Observable<any> {
    // debugger;
    const homeData = this.dataProviderService.data[this.homeEndPoint];
    const res = {};
    res['adisVersion'] = this.dataProviderService.data['adisVersion'];
    homeData?.links?.map((link: any, index: number) => {
      // debugger;
      const rel = link?.rel || `link${index}`;
      let resource = link?.href;
      if (resource.startsWith('/')) {
        resource = resource.substring(1);
      }
      res[rel] = {};
      res[rel]['index'] = index;
      res[rel]['linkData'] = link;
      res[rel]['contentData'] = this.dataProviderService.data[resource];
    });
    return of(res);
  }


  getCombined2() {
    return combineLatest([this.getData1(), this.getData2(), this.getData3()]);
  }


  getUserData1() {
    return of(this.userData1);
  }

  getUserData2() {
    return of(this.userData2);
  }

  getUserError1() {
    console.error('userData1 error');
    return throwError('userData1 error case');
  }

  getUserDataCombined1() {
    return combineLatest([this.getUserData1(), this.getUserData2()]);
  }

}
