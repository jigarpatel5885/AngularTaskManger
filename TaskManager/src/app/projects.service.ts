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

  updateProject(project : Project) :Observable<Project>{
    console.log(project);
    return this.httpClient.put<Project>("http://localhost:54573/api/projects",project);
  }

  deleteProject(projectID : number) : Observable<string>{
    return this.httpClient.delete<string>("http://localhost:54573/api/projects?Id="+projectID);
  }

  searchProject(searchBy:string,searchText:string): Observable<Project[]>{
    console.log("http://localhost:54573/api/projects/search/"+searchBy+"/"+searchText);
    return this.httpClient.get<Project[]>("http://localhost:54573/api/projects/search/"+searchBy+"/"+searchText)
  }

}
