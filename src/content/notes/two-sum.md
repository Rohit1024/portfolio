---
title: 'Two-Sum'
description: 'Find pair summing to target using a hashmap; common interview pattern.'
date: 2025-05-27
tags: ['algorithms', 'arrays']
---

Two-sum classic: store seen values in a map to get O(n) time.

```python
def two_sum(nums, target):
  seen = {}
  for i, v in enumerate(nums):
    need = target - v
    if need in seen:
      return (seen[need], i)
    seen[v] = i
  return None

# two_sum([2,7,11,15], 9) -> (0,1)
```

Edge cases: duplicate values, negative numbers-map handles them fine.