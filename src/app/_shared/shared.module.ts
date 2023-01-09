import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './components/overlay/overlay.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorLoadingComponent } from './components/error-loading/error-loading.component';

@NgModule({
  declarations: [OverlayComponent, LoadingComponent, ErrorLoadingComponent],
  imports: [CommonModule],
  exports: [OverlayComponent, LoadingComponent, ErrorLoadingComponent],
})
export class SharedModule {}
