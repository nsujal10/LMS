// OOP CONCEPTS USED:
// 1. Abstraction: Hides localStorage implementation
// 2. Encapsulation: Access to storage is controlled via methods
// 3. Singleton pattern: Single shared instance across app

class StorageService {
  get(key) {
    // Abstracts how data is retrieved
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  save(key, data) {
    // Abstracts how data is stored
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export default new StorageService();
