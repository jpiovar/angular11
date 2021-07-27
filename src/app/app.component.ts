import { Component, OnDestroy } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// import { HttpBaseService } from './core/services/http.base.service';
import { AppState } from './state';
import { ConfigState } from './state/config/config.models';
import { StartSpinner, StopSpinner } from './state/spinner/spinner.actions';

import * as plantandgo from '@plantandgo/helpers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'angular11-12';
  openedSidenav: boolean = false;
  subscription: Subscription = new Subscription();
  configData$: ConfigState = null;
  languageParam = { value: 'intro' };
  translation: any;

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService,
    // private titleService: Title,
    // private router: Router,
    // private httpBase: HttpBaseService,
  ) {
    console.log('current browser is Explorer ', plantandgo.isExplorer());
    translate.addLangs(['sk']);
    translate.setDefaultLang('sk');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/sk/) ? browserLang : 'sk');

    this.translationSubscribe();

    // this.subscription.add(
    //   this.store.select('router').subscribe((res) => {
    //     // debugger;
    //     if (res?.state?.data) {
    //       let resPoint = '';
    //       if (res?.state?.data?.label) {
    //         resPoint = res.state.data.label;
    //       }
    //       if (resPoint) {
    //         this.titleService.setTitle(`${resPoint} Angular11`);
    //       } else {
    //         this.titleService.setTitle(`Angular11`);
    //       }
    //     }
    //   })
    // );

    this.subscription.add(
      this.store.select('config').subscribe(({ data, loading, error }) => {
        // debugger;
        this.configData$ = { data, loading, error };

        if (this.configData$ && this.configData$.loading) {
          this.store.dispatch(new StartSpinner());
        } else {
          this.store.dispatch(new StopSpinner());
        }
      })
    );

  }

  translationSubscribe() {
    // currently just for example of usage
    this.subscription.add(
      this.translate.get('MAIN.APP-NAME', this.languageParam).subscribe((res: string) => {
        console.log(res);
      })
    );

    this.subscription.add(
      this.translate.get('HOME').subscribe(obj => this.translation = obj)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
