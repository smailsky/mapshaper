
/* @requires core */

// See http://ndevilla.free.fr/median/median/src/wirth.c
// Elements of @arr are reordered
//
Utils.findValueByRank = function(arr, rank) {
  var k = (rank | 0) - 1, // conv. rank into array index
      n = arr.length,
      l = 0,
      m = n - 1,
      i, j, val, tmp;

  if (!arr.length || k < 0 || k >= arr.length) error("[findValueByRank()] invalid input");

  while (l < m) {
    val = arr[k];
    i = l;
    j = m;
    do {
      while (arr[i] < val) {i++;}
      while (val < arr[j]) {j--;}
      if (i <= j) {
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        i++;
        j--;
      }
    } while (i <= j);
    if (j < k) l = i;
    if (k < i) m = j;
  }
  return arr[k];
};


//
Utils.findMedian = function(arr) {
  var n = arr.length,
      rank = Math.floor(n / 2) + 1,
      median = Utils.findValueByRank(arr, rank);
  if ((n & 1) == 0) {
    median = (median + Utils.findValueByRank(arr, rank - 1)) / 2;
  }
  return median;
};
