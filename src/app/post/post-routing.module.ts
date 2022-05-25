import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: "", redirectTo: 'post/index', pathMatch: 'full'},
  { path:"post/index", component: IndexComponent },
  { path: "post/:postId/view", component: ViewComponent },
  { path: "post/create", component: CreateComponent },
  { path: "post/:postId/edit", component: CreateComponent },
  {path : "**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
