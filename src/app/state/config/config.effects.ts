import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { MockService } from '../../core/services/mock.service';

import {
  CONFIG_LOAD,
  CONFIG_LOAD_SUCCESS,
  CONFIG_LOAD_FAIL,
  ConfigLoad,
  ConfigLoadSuccess,
  ConfigLoadFail
} from './config.actions';

import { ConfigState } from './config.models';

@Injectable()
export class ConfigEffects {
  constructor(
    private actions$: Actions,
    private mockService: MockService
  ) { }

  // loadConfig$ = createEffect(() => this.actions$.pipe(
  //   ofType(CONFIG_LOAD),
  //   mergeMap(() => this.mockService.getCombined1()
  //   // mergeMap(() => this.mockService.getCombined2()
  //   // mergeMap(() => this.mockService.getData1()
  //   // mergeMap(() => this.mockService.getData2()
  //   // mergeMap((action: ConfigLoad) => this.mockService.getData1() // works as well positive case
  //   // mergeMap((action: ConfigLoad) => this.mockService.getError1() // works as well error case
  //     .pipe(
  //       map((config: any) => {

  //         return new ConfigLoadSuccess(config);
  //       }),
  //       catchError(error => {

  //         return of(new ConfigLoadFail(error));
  //       })
  //     ))
  //   )
  // );

  // @Effect()
  // loadConfig$ = this.actions$.pipe(
  loadConfig$ = createEffect(() => this.actions$.pipe(
    ofType(CONFIG_LOAD),
    switchMap(
      (action: ConfigLoad) => {
        // debugger;
        const endPoint: any = action.payload;
        // return this.httpBase.getCommon(`${this.origin}${urlRecords}`).pipe(
        return this.mockService.getCombined1(endPoint).pipe( // to call correct be side
        // return this.mockService.getCombined2().pipe(
        // return this.mockService.getCombinedData().pipe(
          map(
            (config: any) => {
              // debugger;
              return new ConfigLoadSuccess(config);
            }
          ),
          catchError(error => {
            // debugger;
            return of(new ConfigLoadFail(error));
          })
        );
      }
    )
  )
  );


}
