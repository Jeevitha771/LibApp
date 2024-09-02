import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { AddBooksComponent } from './add-books/add-books.component'; // Import the new component

const routes: Routes = [
  { path: '', redirectTo: '/libraryInventory', pathMatch: 'full' }, // Redirect to libraryInventory by default
  { path: 'addBooks', component: AddBooksComponent }, // Route for adding books
  { path: 'libraryInventory', component: LibraryComponent }, // Route for viewing inventory
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
