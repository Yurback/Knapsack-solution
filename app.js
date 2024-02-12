function knapsack(items, cap, cur_item) {
        //base case
    if ( cap === 0 || cur_item < 0 ) {
        return {items:[[]], value:0, weight:0, alt:0};
    }

    if ( cap<items[cur_item].weight ) {
        // return {items:[], value:0, weight:0}; if we have only one item
        return knapsack(items, cap, cur_item-1);
    }
    const sackWithItem = knapsack(items,cap-items[cur_item].weight,cur_item-1);
    const sackWithoutItem = knapsack(items, cap, cur_item-1);

    const valueWithItem = sackWithItem.value + items[cur_item].value;
    const valueWithoutItem = sackWithoutItem.value;

    if (valueWithItem > valueWithoutItem) {
        for (let i=0; i<sackWithItem.items.length; i++) {
            sackWithItem.items[i] = sackWithItem.items[i].concat(items[cur_item]);
        }
        const updatedSack = {
            items: sackWithItem.items,
            value: sackWithItem.value + items[cur_item].value,
            weight: sackWithItem.weight + items[cur_item].weight,
            alt: sackWithItem.alt
        }
        return updatedSack;
    } else if (valueWithItem===valueWithoutItem) {
        const newItems = sackWithItem.items.concat(sackWithoutItem.items)
        console.log(newItems);
        const newAlt = (sackWithItem.alt >= sackWithoutItem.alt) ? sackWithItem.alt +1 : sackWithoutItem.alt +1;
        
        const updatedSack = {
            items: newItems,
            value: sackWithItem.value + items[cur_item].value,
            weight: sackWithItem.weight + items[cur_item].weight,
            alt: newAlt
        }
        return updatedSack;
    } else {
        return sackWithoutItem;
    }
    
}

const package = [
    {name: 'a', value: 1, weight:8},
    {name: 'b', value: 2, weight:8},
    {name: 'c', value: 2, weight:8}
    // {name: 'd', value: 5, weight:3},
    // {name: 'e', value: 25, weight:8},
    // {name: 'f', value: 4, weight:1},
    // {name: 'g', value: 10, weight:2}
];

maxWeight = 8

console.log(knapsack(package, maxWeight, package.length - 1));

//"c"   -> take                   -> pass
//      /       \                /       \
//'b'-> take    -> pass     'b' -> take  ->pass  
//       /\        /  \         /  \        /  \   
//'a'->take pass  take pass  take pass    take pass