import { Component } from '@angular/core';
import { vi_VN, NzI18nService } from 'ng-zorro-antd/i18n';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-intership01';
  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(vi_VN);
  }
}
