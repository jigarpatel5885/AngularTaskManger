import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient:HttpClient) { 


  }

  getAllProjects():Observable<Project[]>{
    return this.httpClient.get<Project[]>("http://localhost:54573/api/projects");
  } 

  addNewProject(project :Project):Observable<Project>{
    return this.httpClient.post<Project>("http://localhost:54573/api/projects",project);
  }
}
