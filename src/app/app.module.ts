import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { EditComponent } from './components/editables/edit/edit.component';
import { EditHeaderComponent } from './components/editables/edit-header/edit-header.component';
import { EditAboutComponent } from './components/editables/edit-about/edit-about.component';
import { EditExperienceComponent } from './components/editables/edit-experience/edit-experience.component';
import { EditSkillsComponent } from './components/editables/edit-skills/edit-skills.component';
import { EditProjectsComponent } from './components/editables/edit-projects/edit-projects.component';
import { EducationComponent } from './components/education/education.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileHeaderComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    LoginComponent,
    ProfileComponent,
    EditComponent,
    EditHeaderComponent,
    EditAboutComponent,
    EditExperienceComponent,
    EditSkillsComponent,
    EditProjectsComponent,
    EducationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
