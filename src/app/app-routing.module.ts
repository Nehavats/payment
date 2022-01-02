import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSavedCardListComponent } from './Componets/view-saved-card-list/view-saved-card-list.component';
import { AddCardDetailsComponent } from './Componets/add-card-details/add-card-details.component';


const routes: Routes = [
  {path:'view-list', component: ViewSavedCardListComponent, pathMatch:'full' },
  { path: '', redirectTo: 'view-list', pathMatch: 'full' },
   {path:'add-list', component: AddCardDetailsComponent, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
