import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditHeaderComponent } from './components/editables/edit-header/edit-header.component';
import { EditComponent } from './components/editables/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profile', component:ProfileComponent, 
  // canActivate:[GuardGuard]
  },
  {path: 'edit', component:EditComponent},
  {path: '**', redirectTo: ''}
  // {path: '**', component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
