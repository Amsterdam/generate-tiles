# Generate Tiles

Docker-based script to generate tiles using MapServer and MapProxy.

## Usage

__Prerequisites: Docker with Docker Compose.__

1. Create a [MapServer Mapfile](https://www.mapserver.org/mapfile/) which contains a `LAYER` for the geospatial source file you want to generate tiles from;
2. Run [`generate-tiles.sh`](generate-tiles.sh) and specify the directory which contains the Mapfile, the name of the Mapfile and the name of the layer (and optionally, a projection, bounding box and zoom levels);
3. MapServer and MapProxy are started, with the specified directory as working directory for both containers: MapServer creates a WMS from the specified Mapfile, MapProxy uses this WMS to seed a set of tiles using [`mapproxy-seed`](https://mapproxy.org/docs/nightly/seed.html).

## Example

To create tiles from [`test/0cdbe01a-ba16-2af0-f676-a85ec9c8b6fc.tif`](test/0cdbe01a-ba16-2af0-f676-a85ec9c8b6fc.tif), run:

    ./generate-tiles.sh ./test --srs 4326 --map test --layer test --levels 12-18 --bounds 4.8943087,52.3425805,4.9092879,52.3500052

To find out the bounding box of a geospatial file, you can use `gdalinfo`.
