import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighlightComponent } from './highlight/highlight.component';
import { HomeComponent } from './chat/layout/home/home.component';

const routes: Routes = [
  { path: "highlight", component: HighlightComponent },
  { path: 'chat', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
