import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  categoryId: any;
  todos: Array<any> = [];
  todoId: string = '';
  todoName: string = '';
  btnStatus: string = 'Add';

  constructor(
    private todoService: TodoService,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.activateRouter.snapshot.paramMap.get('id');
    this.todoService.loadTodo(this.categoryId).subscribe((val) => {
      this.todos = val;
    });
  }

  onSubmit(f: NgForm) {
    if (this.btnStatus === 'Add') {
      let todo = {
        todo: f.value.todoText,
        isComplete: false,
      };
      this.todoService.saveTodo(this.categoryId, todo);
    } else if (this.btnStatus === 'Edit') {
      this.todoService.updateTodo(
        this.categoryId,
        this.todoId,
        f.value.todoText
      );
      this.btnStatus = 'Add';
    }

    f.resetForm();
  }

  onEdit(id: string, todo: string) {
    this.todoId = id;
    this.todoName = todo;
    this.btnStatus = 'Edit';
  }
  onDelete(todoId: string) {
    this.todoService.deleteTodo(this.categoryId, todoId);
  }

  onComplete(todoId: string) {
    this.todoService.markComplete(this.categoryId, todoId);
  }
  onImcomplete(todoId:string) {
    this.todoService.markImcomplete(this.categoryId, todoId);
  }
}
