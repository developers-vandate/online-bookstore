import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  // templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean;
  previousCategoryId: number = 1;
  keyword: string = '';

  currentPage: number = 1;
  pageSize: number = 1;
  totalRecords: number = 0;

  constructor(private _bookService: BookService, 
    private _activatedRoute: ActivatedRoute,
    _config: NgbPaginationConfig) { 
      _config.maxSize = 3;
      _config.boundaryLinks = true;
    }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBook();
    });
  }

  listBook() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
  }

  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }
    // setting up the current page to 1, if user navigates to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    
    this._bookService.getBooks(this.currentCategoryId, 
      this.currentPage - 1, 
      this.pageSize).subscribe(this.processPaginate());
  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    // setting up the current page to 1, of the keyword change
    if (this.keyword != keyword) {
      this.currentPage = 1;
    }
    this.keyword = keyword;
    this._bookService.searchBooks(keyword, this.currentPage - 1, 
      this.pageSize).subscribe(this.processPaginate());
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBook();
  }

  processPaginate() {
    return data => {
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

}
