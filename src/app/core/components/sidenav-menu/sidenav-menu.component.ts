import { Component, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() configData: any = {};
  items: any[] = [];
  subitems: any = {};

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(): void {
    // debugger;
    if (this.configData?.data && JSON.stringify(this.configData?.data) !== '{}') {
      this.setSidenavLinkData(this.configData?.data);
    }
  }

  setSidenavLinkData(cd): void {
    // debugger;
    let i = 0;
    let mdata: any = {};
    const accordions = [];
    for (const [key, value] of Object.entries(cd)) {
      console.log(`${key}: ${value}`);
      i = value && value['index'];
      mdata = value && value['linkData'];
      this.items[i] = mdata;
      if (mdata?.render === 'accordion-label') {
        accordions.push(mdata?.name);
      }
    }
    for (i = 0; i < accordions.length; i++) {
      this.setSubitems(accordions[i]);
    }
  }

  setSubitems(name) {
    // debugger;
    this.subitems[name] = [];
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]?.name?.startsWith(`${name}/`)) {
        this.subitems[name].push(this.items[i]);
      }
    }
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
    });
  }

}
