import { SlicePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { AppState } from 'src/app/state';
import { ConfigState } from 'src/app/state/config/config.models';
import { StartSpinner, StopSpinner } from 'src/app/state/spinner/spinner.actions';

type dynamicRoutes = '' | 'introduction' | 'getting-started/about-design-system' |
  'getting-started/for-designers' | 'getting-started/for-developers';

declare const $: any;

const DEFAULT_ROUTE = 'introduction';

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.scss']
})
export class DynamicContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dynamicName: string = '';
  dynamicRoute: dynamicRoutes | string = '';
  subscription: Subscription = new Subscription();
  configData$: ConfigState = null;
  contentData: any = null;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private renderer: Renderer2
  ) {
    const $scope = this;
    (<any> $('body')).on('click', '.anchor', function() {
      // debugger;
      const targetId = $(this)?.parent()[0]?.id;
      $scope.scroll(targetId);
      $scope.setUrlHash(targetId);
    });
  }


  ngOnInit(): void { }

  ngOnChanges(): void {
    // debugger;
    // this.dynamicName;
    this.subscription.add(
      combineLatest([this.store.select('router'), this.store.select('config')]).subscribe(
        ([res1, res2]) => {
          // debugger;
          if (res1 && res2) {
            let url = res1?.state?.url;
            if (url[0] === '/') {
              const urlArr = url?.split('');
              urlArr.shift();
              url = urlArr.join('');
            }
            if (url && url?.length > 0) {
              // debugger;
              this.dynamicRoute = url;
              // debugger;
              if (res1?.state?.fragment) {
                this.dynamicRoute = this.getDynamicRouteWithoutFragment(this.dynamicRoute, res1?.state?.fragment);
                if (!this.dynamicRoute) {
                  this.dynamicRoute = DEFAULT_ROUTE;
                }
                // debugger;
                this.scroll(res1?.state?.fragment);
              }
            } else if (!url) {
              this.dynamicRoute = DEFAULT_ROUTE;
            }

            // if (res1?.state?.data) {
            //   let resPoint = '';
            //   if (res1?.state?.data?.label) {
            //     resPoint = res1.state.data.label;
            //   }
            //   if (resPoint) {
            //     this.titleService.setTitle(`${resPoint} DesignSystem`);
            //   } else {
            //     this.titleService.setTitle(`DesignSystem`);
            //   }
            // }

            const { data, loading, error } = res2;
            this.configData$ = { data, loading, error };

            if (this.configData$?.data && JSON.stringify(this.configData$?.data) !== '{}') {
              // debugger;
              this.setRoutedContentData(this.configData$?.data);
              this.setRoutedContentTitle(this.configData$?.data);
            }

            if (this.configData$ && this.configData$.loading) {
              this.store.dispatch(new StartSpinner());
            } else {
              this.store.dispatch(new StopSpinner());
            }
          }
        }
      ));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setRoutedContentData(data: any) {
    // debugger;
    this.contentData = data[this.dynamicRoute]['contentData'];
  }

  setRoutedContentTitle(data: any) {
    // debugger;
    const linkData = data[this.dynamicRoute]['linkData'];
    let resPoint = '';
    if (linkData?.label) {
      resPoint = linkData?.label;
    }
    if (resPoint) {
      this.titleService.setTitle(`${resPoint} MojeDane`);
    } else {
      this.titleService.setTitle(`MojeDane`);
    }
  }

  getDynamicRouteWithoutFragment(dynamicRoute: string, fragment: string) {
    return dynamicRoute.replace(`#${fragment}`, '');
  }

  scroll(scrollElement: string): void {
    setTimeout(() => {
      // debugger;
      if (!!document.getElementById(scrollElement)) {
        const target = this.renderer.selectRootElement(`#${scrollElement}`, true);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    }, 500);
  }

  setUrlHash(fragment: string) {
    // debugger;
    location.hash = fragment;
  }


}
