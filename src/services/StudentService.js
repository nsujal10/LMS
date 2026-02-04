// OOP CONCEPTS USED:
// - Inheritance
// - Polymorphism (same methods, different data)

import BaseService from "./BaseService";

class StudentService extends BaseService {
  constructor() {
    super("students");
  }
}

export default new StudentService();
