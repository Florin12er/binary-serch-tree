class Node {
  constructor(data, left = null, right = null, parent = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

class BinarySearch {
  constructor() {
    this.root = null;
  }

  add(data) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = (node) => {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data, null, null, node);
            return;
          } else if (node.right !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data, null, null, node);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }
  findMin() {
    let current = this.root;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    if (current !== null) {
      return current.data;
    } else {
      return null;
    }
  }
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current !== null ? current.data : null;
  }
  find(data) {
    let current = this.root;
    while (current !== null && current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }
  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
  levelOrder(callback) {
    const result = [];
    const queue = [];
    if (this.root !== null) {
      queue.push(this.root);
      while (queue.length > 0) {
        const node = queue.shift();
        result.push(callback ? callback(node) : node.data);
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
      }
    }
    return result;
  }

  inOrder(callback) {
    const result = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        result.push(callback ? callback(node) : node.data);
        traverse(node.right);
      }
    };
    traverse(this.root);
    return result;
  }

  preOrder(callback) {
    const result = [];
    const traverse = (node) => {
      if (node !== null) {
        result.push(callback ? callback(node) : node.data);
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(this.root);
    return result;
  }

  postOrder(callback) {
    const result = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        result.push(callback ? callback(node) : node.data);
      }
    };
    traverse(this.root);
    return result;
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) return 0;
    return this.depth(node.parent) + 1;
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) return true;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      if (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        checkBalance(node.left) &&
        checkBalance(node.right)
      ) {
        return true;
      }
      return false;
    };
    return checkBalance(this.root);
  }

  rebalance() {
    const values = this.inOrder();
    return this.buildTree(values);
  }

  buildTree(values) {
    const buildBalanced = (arr, start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);
      node.left = buildBalanced(arr, start, mid - 1);
      node.right = buildBalanced(arr, mid + 1, end);
      return node;
    };

    return buildBalanced(values, 0, values.length - 1);
  }
  visualizeTree(node = this.root, prefix = "", isLeft = true) {
    if (node !== null) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.data);
      const newPrefix = prefix + (isLeft ? "│   " : "    ");
      this.visualizeTree(node.left, newPrefix, true);
      this.visualizeTree(node.right, newPrefix, false);
    }
  }
  remove(data) {
    const removeNode = (node, data) => {
      if (node == null) {
        return null;
      }
      if (data == node.data) {
        if (node.left == null && node.right == null) {
          return null;
        }
        if (node.left == null) {
          return node.right;
        }
        if (node.right == null) {
          return node.left;
        }
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }
}

const bst = new BinarySearch();
bst.add(4);
bst.add(5);
bst.add(6);
bst.add(4);
bst.add(7);
bst.add(3);
bst.add(1);

console.log("Original Tree Visualization:");
bst.visualizeTree();
console.log("minimum value:", bst.findMin());
console.log("maximum value:", bst.findMax());

bst.remove(7);

console.log("\nLevel Order:", bst.levelOrder());
console.log("In Order:", bst.inOrder());
console.log("Pre Order:", bst.preOrder());
console.log("Post Order:", bst.postOrder());
console.log("Height of the tree:", bst.height(bst.root));
console.log("Depth of a node:", bst.depth(bst.root));
console.log("Is the tree balanced?", bst.isBalanced());

const balancedTree = new BinarySearch();
balancedTree.root = bst.rebalance();
console.log("\nRebalanced Tree Visualization:");
balancedTree.visualizeTree();
console.log("minimum value:", bst.findMin());
console.log("maximum value:", bst.findMax());
console.log("is 2 present:", bst.isPresent(2));
