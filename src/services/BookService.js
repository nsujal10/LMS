// OOP CONCEPTS USED:
// 1. Encapsulation: Business rules isolated from UI
// 2. Abstraction: UI interacts via service methods
// 3. Single Responsibility: Handles only Book data

import StorageService from "../utils/StorageService";

const KEY = "books";

class BookService {
  getAll() {
    return StorageService.get(KEY);
  }

  add(book) {
    const books = this.getAll();
    books.push(book);
    StorageService.save(KEY, books);
  }

  update(book) {
    const books = this.getAll().map(b =>
      b.id === book.id ? book : b
    );
    StorageService.save(KEY, books);
  }

  delete(id) {
    const books = this.getAll().filter(b => b.id !== id);
    StorageService.save(KEY, books);
  }
}

export default new BookService();
