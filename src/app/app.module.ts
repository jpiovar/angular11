import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './shared/shared.module';

import { MaterialModule } from './material.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment.prod';

import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer, NavigationActionTiming } from '@ngrx/router-store';
import { CustomSerializer, MergedRouterStateSerializer } from './shared/utils/routerStateSerializer';


import { reducer as spinner } from './state/spinner/spinner.reducer';
import { reducer as config } from './state/config/config.reducer';
import { reducer as toastr } from './state/toastr/toastr.reducer';
import { reducer as records } from './state/records/records.reducer';

import { ConfigEffects } from './state/config/config.effects';
import { RecordsEffects } from './state/records/records.effects';

import { AppState } from './state';
import { ConfigLoad } from './state/config/config.actions';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'sk',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      router: routerReducer,
      spinner,
      config,
      toastr,
      records
    }),
    EffectsModule.forRoot([
      ConfigEffects,
      RecordsEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'NgRx tracker state', logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      // serializer: CustomSerializer,         // contains router: { state: { url, params, queryParams }, navigationId }
      serializer: MergedRouterStateSerializer, // contains router: { state: { url, params, queryParams, data }, navigationId }
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),
    NgbModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store<AppState>) {
    // here can go main idea from app.component.ts,
    // idea of isLocalConfigRouteValid, ConfigLoadFromLocal, ConfigLoad and covered in checkinterval
    // in case checkinterval applied then we need mainly ConfigLoad to load fresh be data to ngrx config state
    // no side issue of rerendering detected
    // module initialized once after main module route changed, after component level route changed no call
    console.log('App Module initialized');

    console.log('ConfigLoad execution');
    // debugger;
    const endPoint = environment.beHomeEndPoint;
    this.store.dispatch(new ConfigLoad(endPoint));
  }
}
