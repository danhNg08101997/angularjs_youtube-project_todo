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
    '  #DAF5FF',
  ];
  categoryArr: Array<any> = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.loadCategory().subscribe((val) => {
      this.categoryArr = val;
      console.log(this.categoryArr);
    });
  }

  onSubmit(f: NgForm) {
    let randomNumber = Math.floor(Math.random() * 8);
    let todoCategory = {
      category: f.value.categoryName,
      colorCode: this.colorArr[randomNumber],
      todoCount: 0,
    };
    this.categoryService.saveCategory(todoCategory);
    f.resetForm();
  }
}
