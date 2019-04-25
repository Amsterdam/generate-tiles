# Generate Tiles

Docker-based script to generate tiles using MapServer and MapProxy.

Example:

    ./generate-tiles.sh ./test --srs 4326 --map test --layer test --levels 12-18 --bounds 4.8943087,52.3425805,4.9092879,52.3500052

To find out the bounding box of a geospatial file, you can use `gdalinfo`.
