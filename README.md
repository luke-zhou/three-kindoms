# Three Kindoms

This is a world for three participants, they are interacting each other on a hexagon map.
Each kindom can spawn soldiers, and soldiers can move on the map. 
* the size 3 map would have 34 battle fields(cell) and three home towns. 
    * Kindom A home town is the most left field, color is red
    * Kindom B home town is the right top field, color is yellow
    * Kindom C home town is the right bottom field, color is blue
* spawn soldiers:
    * each kindom may spawn one soldier each trun
    * the spawn posibility is the ratio of not-self-occupied field, for example Kindom A occupied 3 cells, and total cells are 34, so the posibility of successful spawn would be (34-3)/34
    * successfully spawned soldier would be placed in the kindom's home town 
* soldier movement:
    * each soldier in each turn can conduct one of the following move:
        * stay, no movement, 25%
        * one step, move to one of the field next to the current location(field), 75%, and randomly pick one in the possible fields
