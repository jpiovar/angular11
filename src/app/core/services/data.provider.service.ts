import { Injectable } from '@angular/core';
import version from '../../../assets/mock/version.json';
import home from '../../../assets/mock/home.json';
import introduction from '../../../assets/mock/introduction.json';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  data: any = {
    version,
    home,
    introduction
  };

}
