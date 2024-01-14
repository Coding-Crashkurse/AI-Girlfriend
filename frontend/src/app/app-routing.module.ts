import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateaiComponent } from './createai/createai.component'; // Pfad anpassen
import { ChatuiComponent } from './chatui/chatui.component'; // Pfad anpassen

const routes: Routes = [
  { path: 'create-ai', component: CreateaiComponent },
  { path: 'chat-ui', component: ChatuiComponent },
  { path: '', redirectTo: '/create-ai', pathMatch: 'full' }, // Standardroute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
