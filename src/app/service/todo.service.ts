import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

// import {firestore} from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  saveTodo(id: any, data: any) {
    this.afs
      .collection('categories')
      .doc(id)
      .collection('todos')
      .add(data)
      .then(() => {
        // this.afs
        //   .collection('categories/' + id)
        //   .doc('categories')
        //   .update({ todoCount: firestore });
        this.toastr.success('New Todo Saved Successfully');
      })
      .catch(() => {
        this.toastr.error('Fail');
      });
  }

  loadTodo(id: string) {
    return this.afs
      .collection('categories')
      .doc(id)
      .collection('todos')
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

  updateTodo(categoryId: string, todoId: string, updateData: string) {
    this.afs
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .doc(todoId)
      .update({ todo: updateData })
      .then(() => {
        this.toastr.success('Updated Successfully');
      })
      .catch(() => {
        this.toastr.error('Fail');
      });
  }

  deleteTodo(categoryId: string, todoId: string) {
    this.afs
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .doc(todoId)
      .delete()
      .then(() => {
        this.toastr.error('Todo deleted successfully');
      })
      .catch(() => {
        this.toastr.error('Fail');
      });
  }

  markComplete(categoryId: string, todoId: string) {
    this.afs
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .doc(todoId)
      .update({ isComplete: true })
      .then(() => {
        this.toastr.success('Todo marked completed');
      });
  }

  markImcomplete(categoryId: string, todoId: string) {
    this.afs
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .doc(todoId)
      .update({ isComplete: false })
      .then(() => {
        this.toastr.error('Todo marked imcompleted');
      });
  }
}
