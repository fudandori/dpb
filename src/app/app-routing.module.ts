import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesignerComponent} from './designer/designer.component';
import {BuilderComponent} from './builder/builder.component';

const routes: Routes = [
  {path: 'designer', component: DesignerComponent},
  {path: 'builder', component: BuilderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
