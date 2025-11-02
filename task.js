class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinaryTree {
    constructor() {
      this.root = null;
    }
  
    add(value) {
      const newNode = new Node(value);
      if (!this.root) {
        this.root = newNode;
        return;
      }
  
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            break;
          }
          current = current.right;
        }
      }
    }
  
    contains(value) {
      let current = this.root;
      while (current) {
        if (value === current.value) return true;
        current = value < current.value ? current.left : current.right;
      }
      return false;
    }
  
    printInOrder(node = this.root) {
      if (!node) return;
      this.printInOrder(node.left);
      console.log(node.value);
      this.printInOrder(node.right);
    }
  
    findMin() {
      let current = this.root;
      while (current && current.left) {
        current = current.left;
      }
      return current ? current.value : null;
    }
  
    findMax() {
      let current = this.root;
      while (current && current.right) {
        current = current.right;
      }
      return current ? current.value : null;
    }
  
    countNodes(node = this.root) {
      if (!node) return 0;
      return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }
  
    delete(value, node = this.root) {
      if (!node) return null;
  
      if (value < node.value) {
        node.left = this.delete(value, node.left);
      } else if (value > node.value) {
        node.right = this.delete(value, node.right);
      } else {
        // Випадок 1: немає дітей
        if (!node.left && !node.right) return null;
  
        // Випадок 2: один нащадок
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        // Випадок 3: два нащадки
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.value = minRight.value;
        node.right = this.delete(minRight.value, node.right);
      }
  
      return node;
    }
  }
  
  // Приклад використання
  const tree = new BinaryTree();
  tree.add(5); // додає елементи у дерево
  tree.add(3);
  tree.add(7);
  tree.add(2);
  tree.add(4);
  tree.add(6);
  tree.add(8);
  
  console.log("In-order traversal:"); // виводить елементи у відсортованому порядку
  tree.printInOrder(); 
  
  console.log("Min:", tree.findMin()); // знаходить мінімальне значення
  console.log("Max:", tree.findMax()); // знаходить максимальне значення
  console.log("Contains 4:", tree.contains(4)); // перевіряє наявність значення
  console.log("Count:", tree.countNodes()); // рахує кількість елементів у дереві
  
  tree.delete(7); // видалення елемента
  console.log("After deleting 7:");
  tree.printInOrder(); // виводить елементи після видалення
