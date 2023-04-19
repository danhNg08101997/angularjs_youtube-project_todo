import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  colorArr: Array<any> = [
    '#B2A4FF',
    '#FFB4B4',
    '#FFDEB4',
    '#FDF7C3',
    '#FEFF86',
    '#B0DAFF',
    ' #B9E9FC',
    '#DAF5FF',
    ' #454545',
    '#FF6000',
    '#FFA559',
    '#FFE6C7',
  ];
  categoryArr: Array<any> = [];
  categoryName: string = '';
  btnStatus: string = 'Add';
  categoryId: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.loadCategory().subscribe((val) => {
      this.categoryArr = val;
    });
  }

  onSubmit(f: NgForm) {
    if (this.btnStatus === 'Add') {
      let randomNumber = Math.floor(Math.random() * 12);
      let todoCategory = {
        category: f.value.categoryName,
        colorCode: this.colorArr[randomNumber],
        todoCount: 0,
      };
      this.categoryService.saveCategory(todoCategory);
    } else if (this.btnStatus === 'Edit') {
      this.categoryService.updateCategory(
        this.categoryId,
        f.value.categoryName
      );
      this.btnStatus = 'Add';
    }

    f.resetForm();
  }

  onEdit(id: string, category: string) {
    this.categoryId = id;
    this.categoryName = category;
    this.btnStatus = 'Edit';
  }

  onDelete(id:string) {
    this.categoryService.deleteCategory(id);
  }

}
