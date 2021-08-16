import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { formatWithOptions } from 'util';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects : Project [];
  newProject:Project = new Project();
  editProject:Project = new Project();
  editIndex : number;
  deleteproject : Project = new Project();
  deleteIndex:number;
  searchBy:string = "ProjectName";
  searchText:string="";
  constructor(private projectsService:ProjectsService) { 

  }
  
  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe((response : Project[])=> {
     // console.log(response);
      this.projects = response;
      
    });
  }

  onSaveClick() :void {
    this.projectsService.addNewProject(this.newProject).subscribe((response) => {
      //Add Project to Grid
      var p: Project = new Project();
      p.projectID = response.projectID;
      p.projectName = response.projectName;
      p.dateOfStart = response.dateOfStart;
      p.teamSize = response.teamSize;
      this.projects.push(p);

      //Clear New Project Dialog - TextBoxes
      this.newProject.projectID = null;
      this.newProject.projectName = null;
      this.newProject.dateOfStart = null;
      this.newProject.teamSize = null;
    }, (error) => {
      console.log(error);
    });
  }

  onEditClick(event,index:number):void{
    this.editProject.projectID = this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.dateOfStart = this.projects[index].dateOfStart;
    this.editIndex  = index;
  }

  onUpdateClick(){
    
    this.projectsService.updateProject(this.editProject).subscribe((response)=>{
      var p: Project = new Project();
      p.projectID = response.projectID;
      p.projectName = response.projectName;
      p.dateOfStart = response.dateOfStart;
      p.teamSize = response.teamSize;

      this.projects[this.editIndex]=p;
      
      
       //Clear New Project Dialog - TextBoxes
       this.editProject.projectID = null;
       this.editProject.projectName = null;
       this.editProject.dateOfStart = null;
       this.editProject.teamSize = null;
    },
    (error)=>{
      console.log(error);
    });
  }

  onDeleteClick(event,index:number){
    this.deleteproject.projectID = this.projects[index].projectID;
    this.deleteproject.projectName = this.projects[index].projectName;
    this.deleteproject.teamSize = this.projects[index].teamSize;
    this.deleteproject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteIndex  = index;
    console.log(this.deleteproject);
  }
  onDeleteConfirmClick()
  {
    this.projectsService.deleteProject(this.deleteproject.projectID).subscribe((response)=>{
      this.projects.splice(this.deleteIndex,1);
      this.deleteproject.projectID =null;
      this.deleteproject.projectName =null;
      this.deleteproject.dateOfStart =null;
      this.deleteproject.teamSize =null;
    },
    (error)=>{
      console.error();
      
    });
  }

  onSearchClick(){
    console.log(this.searchBy + '-' +this.searchText);
    this.projectsService.searchProject(this.searchBy,this.searchText).subscribe((response:Project[])=>{
     
      this.projects = response;
    }
    ,(error)=>{
        console.log(error);
    });
  }

}
