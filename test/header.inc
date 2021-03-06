EXTENT      94000 465000 170000 514000
UNITS       meters
MAXSIZE     4000
STATUS      ON

IMAGETYPE   png

WEB
  METADATA
    "ows_enable_request"           "*"
    "ows_srs"                      "EPSG:28992 EPSG:4326 EPSG:3857 EPSG:4258"
    "ows_feature_info_mime_type"   "application/json"
    "wms_format"                   "image/png"
    "wfs_encoding"                 "UTF-8"
    "wfs_maxfeatures"              "500000"
    "wfs_getfeature_formatlist"    "gml,geojson,csv,shapezip,spatialzip"
  END
  IMAGEPATH                        "/srv/mapserver/tmp_img/"
  IMAGEURL                         "/ms_tmp/"
  BROWSEFORMAT                     "image/svg+xml"
  VALIDATION
    "MAP_RESOLUTION"               "^[0-9]{1,3}$"
    "DPI"                          "^[0-9]{1,3}$"
    "default_MAP_RESOLUTION"       "91"
    "default_DPI"                  "91"
  END
END

RESOLUTION                         91
DEFRESOLUTION                      91

PROJECTION
  "init=epsg:28992"
END

#-------------------------------------------------------------------
# Output formats
#-------------------------------------------------------------------

OUTPUTFORMAT
  NAME           png
  DRIVER         "AGG/PNG"
  MIMETYPE       "image/png"
  IMAGEMODE      RGB
  EXTENSION      "png"
  FORMATOPTION   "INTERLACE=OFF"
  FORMATOPTION   "QUANTIZE_FORCE=ON"
END

OUTPUTFORMAT
  NAME           png8
  DRIVER         AGG/PNG8
  MIMETYPE       "image/png; mode=8bit"
  IMAGEMODE      RGB
  EXTENSION      "png"
  FORMATOPTION   "QUANTIZE_FORCE=on"
  FORMATOPTION   "QUANTIZE_COLORS=256"
  FORMATOPTION   "GAMMA=0.75"
END

OUTPUTFORMAT
  NAME        gif
  DRIVER      GD/GIF
  MIMETYPE    "image/gif"
  IMAGEMODE   PC256
  EXTENSION   "gif"
END

OUTPUTFORMAT
  NAME           "jpeg"
  DRIVER         AGG/JPEG
  MIMETYPE       "image/jpeg"
  IMAGEMODE      RGB
  EXTENSION      "jpg"
  FORMATOPTION   "GAMMA=0.75"
END
