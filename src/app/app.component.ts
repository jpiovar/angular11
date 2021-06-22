import { Component, OnDestroy } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { HttpBaseService } from './core/services/http.base.service';
import { AppState } from './state';
import { ConfigState } from './state/config/config.models';
import { StartSpinner, StopSpinner } from './state/spinner/spinner.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'angular11';
  openedSidenav: boolean = false;
  subscription: Subscription = new Subscription();
  configData$: ConfigState = null;

  constructor(
    private store: Store<AppState>,
    // private titleService: Title,
    // private router: Router,
    // private httpBase: HttpBaseService,
  ) {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
