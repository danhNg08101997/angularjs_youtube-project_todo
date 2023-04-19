import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  saveCategory(data: any) {
    this.afs
      .collection('categories')
      .add(data)
      .then(() => {
        this.toastr.success('New Category Saved Successfully');
      });
  }

  loadCategory() {
    return this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((aciton) => {
          return aciton.map((a) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data();
            return { id, data };
          });
        })
      );
  }

  updateCategory(id: string, updatedData: string) {
    this.afs
      .doc('categories/' + id)
      .update({ category: updatedData })
      .then(() => {
        this.toastr.warning('Updated Successfully');
      });
  }

  deleteCategory(id: string) {
    this.afs
      .doc('categories/' + id)
      .delete()
      .then(() => {
        this.toastr.error('Category deleted successfully');
      });
  }
}
