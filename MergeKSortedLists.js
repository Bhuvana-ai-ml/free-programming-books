/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (!lists || lists.length === 0) return null;

    // Min Heap Implementation
    class MinHeap {
        constructor() { this.heap = []; }
        
        push(node) {
            this.heap.push(node);
            this._heapifyUp();
        }
        
        pop() {
            if (this.heap.length === 0) return null;
            const top = this.heap[0];
            const end = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = end;
                this._heapifyDown();
            }
            return top;
        }
        
        _heapifyUp() {
            let index = this.heap.length - 1;
            while (index > 0) {
                let parent = Math.floor((index - 1) / 2);
                if (this.heap[parent].val <= this.heap[index].val) break;
                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                index = parent;
            }
        }
        
        _heapifyDown() {
            let index = 0;
            const length = this.heap.length;
            while (true) {
                let left = 2 * index + 1;
                let right = 2 * index + 2;
                let smallest = index;
                if (left < length && this.heap[left].val < this.heap[smallest].val) smallest = left;
                if (right < length && this.heap[right].val < this.heap[smallest].val) smallest = right;
                if (smallest === index) break;
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            }
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
    }

    const heap = new MinHeap();

    // Push the head of each list into the heap
    for (let node of lists) {
        if (node) heap.push(node);
    }

    const dummy = new ListNode(0);
    let curr = dummy;

    // Extract min node and push its next into heap
    while (!heap.isEmpty()) {
        let node = heap.pop();
        curr.next = node;
        curr = curr.next;
        if (node.next) heap.push(node.next);
    }

    return dummy.next;
};
