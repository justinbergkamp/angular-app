import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library-grid',
  templateUrl: './library-grid.component.html',
  styleUrls: ['./library-grid.component.css']
})
export class LibraryGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    this.onChanges();
    this.mode = 'none';
  }

  public onStatusFilterChange(val){

    let selectedBooks = [];
    if (val !=''){
      for(let filter of val){

        let filteredBooks = this.allBooks.filter(book => book.tags.includes(filter));

        selectedBooks = selectedBooks.concat(filteredBooks);

      }
    }else{
      selectedBooks = this.allBooks;
    }
    this.books = selectedBooks;
  }

  onSelect(book: Book): void {
    this.mode = 'details';
    this.selectedBook = book;
    //should either emit or move to transition dialog
  }

  onTag(tag: string): void {
    console.log(tag);

    console.log(this.tagInformation.get(tag));
  }
  deleteBook(book: Book): void {
    // need to check user for deletion
    console.log(book);

    let deletedBook = {
      "id": book.id
   };

    this.api.DeleteBook(deletedBook).then(event => {
      console.log('item deleted!');
      this.mode = 'none';

    })
    .catch(e => {
      console.log('error deleting book...', e);
    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onChanges(): void {
    console.log("test");

    this.myControl.valueChanges.subscribe(val => {
      let filteredBooks = [];
      filteredBooks = this.allBooks.filter(book => book.title.toLowerCase().includes(val));
      this.books = filteredBooks;
    });
  }

  addToQueue(book : Book): void {
    this.mode = 'details';
    book.status = 1;
    this.selectedBook = book;
  }

}
