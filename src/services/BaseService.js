// OOP CONCEPTS USED:
// - Abstraction: Generic CRUD logic
// - Encapsulation: Storage access hidden
// - Reusability: Used by Student & Librarian
// - Inheritance: Extended by child services

import StorageService from "../utils/StorageService";

class BaseService {
  constructor(key) {
    this.key = key;
  }

  getAll() {
    return StorageService.get(this.key);
  }

  add(item) {
    const items = this.getAll();
    items.push(item);
    StorageService.save(this.key, items);
  }

  update(updatedItem) {
    const items = this.getAll().map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    StorageService.save(this.key, items);
  }

  delete(id) {
    const items = this.getAll().filter(item => item.id !== id);
    StorageService.save(this.key, items);
  }
}

export default BaseService;
