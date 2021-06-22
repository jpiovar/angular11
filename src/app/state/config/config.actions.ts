import { Action } from '@ngrx/store';
import { ConfigState } from './config.models';

export const CONFIG_LOAD = '[Config] Load Config';
export const CONFIG_LOAD_FROM_LOCAL = '[Config] Load Config From Local';
export const CONFIG_LOAD_SUCCESS = '[Config] Load Config Success';
export const CONFIG_LOAD_FAIL = '[Config] Load Config Fail';


export class ConfigLoad implements Action {
  readonly type = CONFIG_LOAD;
  constructor(public payload: string) {
    // debugger;
  }
}

export class ConfigLoadFromLocal implements Action {
  readonly type = CONFIG_LOAD_FROM_LOCAL;
  constructor(public payload: ConfigState) {

  }
}

export class ConfigLoadSuccess implements Action {
  readonly type = CONFIG_LOAD_SUCCESS;
  constructor(public payload: ConfigState) {

  }
}

export class ConfigLoadFail implements Action {
  readonly type = CONFIG_LOAD_FAIL;
  constructor(public payload: any) {}
}

export type Actions = | ConfigLoad | ConfigLoadFromLocal | ConfigLoadSuccess | ConfigLoadFail;
