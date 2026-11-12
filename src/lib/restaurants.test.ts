import assert from 'node:assert/strict';
import { restaurants, pickRestaurantOrder } from './restaurants';
assert.deepEqual(restaurants.slice(1).map(r => r.name), ['Chick-fil-A', 'Subway', 'Five Guys']);
for (const r of restaurants) {
  for (let n=0;n<=100;n++) {
    const result=pickRestaurantOrder(r.name,()=>n/100);
    assert.notEqual(result.restaurant.name,r.name);
    assert.ok(result.itemCount>=5 && result.itemCount<=15);
  }
}
assert.notEqual(pickRestaurantOrder(null,()=>0).itemCount,pickRestaurantOrder(null,()=>1).itemCount);
