/*
var a = new heap([4,1,3,2,16,9]);
setInterval(function(){
a().push(Math.random()*1000%100);
heapSort(a());
console.log(a());
},50);
*/
module.exports = function () {
  return {
    HeapSort: heapSort,
    Heap: heap
  }
}
function heapSort (A) {
  buildMaxHeap(A);
  for (var i = (A.length - 1); i >= 1; --i) {
    swap(A,0,i);
    A.heapSize = A.heapSize - 1;
    maxHeapify(A,0);
  }
}
function heap (A) {
  return function () {
    var a = A;
    a.length = A.length;
    a.heapSize = 0;
    return a;
  }
}
function buildMaxHeap (A) {
  A.heapSize = A.length;
  for (var i = Math.floor((A.length - 1) / 2); i >= 0; --i) {
    maxHeapify(A,i);
  }
}
function parent (i) {
  return Math.floor(i / 2);
}
function left (i) {
  return 2 * i;
}
function right (i) {
  return (2 * i) + 1;
}
function swap (A,i,largest) {
  var x = A[largest];
  A[largest] = A[i];
  A[i] = x;
}
function maxHeapify (A,i) {
  var l = left(i) + 1;
  var r = right(i) + 1;
  var largest = 0;
  if ((l <= (A.heapSize - 1)) && (A[l] > A[i])) {
    largest = l;
  } else {
    largest = i;
  }
  if ((r <= (A.heapSize - 1)) && (A[r] > A[largest])) {
    largest = r;
  }
  if (largest != i) {
    swap(A,i,largest);
    maxHeapify(A,largest);
  }
}
