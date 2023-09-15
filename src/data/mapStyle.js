export let mapStyle={
  "version": 8,
  "name": "icgc_mapa_base_gris_simplificat",
  "metadata": {"maputnik:renderer": "mbgljs"},
  "center": [1.537786, 41.837539],
  "zoom": 12,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "tiles": [
        "https://geoserveis.icgc.cat/servei/catalunya/contextmaps/vt/{z}/{x}/{y}.pbf"
      ],
      "attribution": "<b>ContextMaps</b>:<a href=\"https://www.icgc.cat/Aplicacions/Visors/ContextMaps\">Institut Cartogràfic i Geològic de Catalunya</a>|<b>Mapa resta del món</b>:© OpenMapTiles © OpenStreetMap contributors",
      "maxzoom": 16
    },
    "contour": {
      "type": "vector",
      "tiles": [
        "https://geoserveis.icgc.cat/servei/catalunya/contextmaps-contorn/vt/{z}/{x}/{y}.pbf"
      ],
      "maxzoom": 16
    },
    "divisionsadministratives": {
      "type": "vector",
      "tiles": [
        "https://geoserveis.icgc.cat/servei/catalunya/contextmaps-divisions-administratives/vt/{z}/{x}/{y}.pbf"
      ],
      "maxzoom": 16
    }
  },
  "sprite": "https://geoserveis.icgc.cat/vector-tiles/simbologia/sprites1/sprite",
  "glyphs": "https://geoserveis.icgc.cat/vector-tiles/simbologia/glyphs/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "minzoom": 0,
      "maxzoom": 24,
      "layout": {"visibility": "visible"},
      "paint": {
        "background-color": "rgba(200, 200, 200, 1)",
        "background-opacity": {"stops": [[1, 1], [6, 1]]}
      }
    },
    {
      "id": "landcover-ice-shelf",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849382550.77"},
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": ["==", "subclass", "ice_shelf"],
      "layout": {"visibility": "visible"},
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": {"base": 1, "stops": [[0, 0.9], [10, 0.3]]}
      }
    },
    {
      "id": "water-ocean",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849382550.77"},
      "source": "openmaptiles",
      "source-layer": "water",
      "maxzoom": 18,
      "filter": ["all", ["==", "class", "ocean"], ["==", "$type", "Polygon"]],
      "layout": {"visibility": "visible"},
      "paint": {"fill-opacity": 1, "fill-color": "rgba(130, 171, 192, 1)"}
    },
    {
      "id": "landcover-glacier",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": ["==", "subclass", "glacier"],
      "layout": {"visibility": "visible"},
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": {"base": 1, "stops": [[0, 0.9], [10, 0.3]]}
      }
    },
    {
      "id": "landuse-commercial",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849388993.3071"},
      "source": "openmaptiles",
      "source-layer": "landuse",
      "filter": [
        "all",
        ["==", "$type", "Polygon"],
        ["==", "class", "commercial"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(230, 230, 230, 0.23)"}
    },
    {
      "id": "waterway-other",
      "type": "line",
      "metadata": {"mapbox:group": "1444849382550.77"},
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 11,
      "filter": ["!in", "class", "canal", "river", "stream"],
      "layout": {"line-cap": "round", "visibility": "visible"},
      "paint": {
        "line-color": "rgba(174,209,232,1)",
        "line-width": {"base": 1.3, "stops": [[13, 0.5], [20, 2]]}
      }
    },
    {
      "id": "waterway-stream-canal",
      "type": "line",
      "metadata": {"mapbox:group": "1444849382550.77"},
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 12,
      "filter": ["in", "class", "canal", "stream"],
      "layout": {"line-cap": "round", "visibility": "visible"},
      "paint": {
        "line-color": "rgba(174,209,232,1)",
        "line-width": {"base": 1.3, "stops": [[13, 0.5], [20, 6]]}
      }
    },
    {
      "id": "waterway-river",
      "type": "line",
      "metadata": {"mapbox:group": "1444849382550.77"},
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 0,
      "maxzoom": 23,
      "filter": ["==", "class", "river"],
      "layout": {"line-cap": "round", "visibility": "visible"},
      "paint": {
        "line-color": "rgba(130, 171, 192, 1)",
        "line-width": {"base": 1.2, "stops": [[10, 0.4], [20, 6]]}
      }
    },
    {
      "id": "water",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849382550.77"},
      "source": "openmaptiles",
      "source-layer": "water",
      "minzoom": 0,
      "maxzoom": 24,
      "filter": ["match", ["get", "class"], ["lake", "reservoir"], true, false],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(63, 157, 216, 1)"}
    },
    {
      "id": "ferry",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": ["all", ["in", "class", "ferry"]],
      "layout": {"line-join": "round", "visibility": "visible"},
      "paint": {
        "line-color": "rgba(102, 102, 102, 1)",
        "line-width": 1.1,
        "line-dasharray": [2, 2]
      }
    },
    {
      "id": "aeroway-taxiway-casing",
      "type": "line",
      "metadata": {"mapbox:group": "1444849345966.4436"},
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 12,
      "filter": ["all", ["in", "class", "taxiway"]],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(109, 109, 109, 1)",
        "line-width": {"base": 1.5, "stops": [[11, 2], [17, 12]]},
        "line-opacity": 1
      }
    },
    {
      "id": "aeroway-runway-casing",
      "type": "line",
      "metadata": {"mapbox:group": "1444849345966.4436"},
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 12,
      "filter": ["all", ["in", "class", "runway"]],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(109, 109, 109, 1)",
        "line-width": {"base": 1.5, "stops": [[11, 5], [17, 55]]},
        "line-opacity": 1
      }
    },
    {
      "id": "aeroway-area",
      "type": "fill",
      "metadata": {"mapbox:group": "1444849345966.4436"},
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        ["==", "$type", "Polygon"],
        ["in", "class", "runway", "taxiway"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {
        "fill-opacity": {"base": 1, "stops": [[13, 0], [14, 1]]},
        "fill-color": "rgba(255, 255, 255, 1)"
      }
    },
    {
      "id": "aeroway-taxiway",
      "type": "line",
      "metadata": {"mapbox:group": "1444849345966.4436"},
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        ["in", "class", "taxiway"],
        ["==", "$type", "LineString"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {"base": 1.5, "stops": [[11, 1], [17, 10]]},
        "line-opacity": {"base": 1, "stops": [[11, 0], [12, 1]]}
      }
    },
    {
      "id": "aeroway-runway",
      "type": "line",
      "metadata": {"mapbox:group": "1444849345966.4436"},
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        ["in", "class", "runway"],
        ["==", "$type", "LineString"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {"base": 1.5, "stops": [[11, 4], [17, 50]]},
        "line-opacity": {"base": 1, "stops": [[11, 0], [12, 1]]}
      }
    },
    {
      "id": "railway-transit",
      "type": "line",
      "metadata": {"mapbox:group": "1444849345966.4436"},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 7,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["==", "class", "transit"], ["!in", "brunnel", "tunnel"]]
      ],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(112, 112, 112, 1)",
        "line-width": {"base": 1.4, "stops": [[14, 0.4], [20, 1]]}
      }
    },
    {
      "id": "railway-transit-hatching",
      "type": "line",
      "metadata": {"mapbox:group": "1444849345966.4436"},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 7,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "transit"],
        ["!in", "brunnel", "tunnel"],
        ["!has", "subclass"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(112, 112, 112, 1)",
        "line-dasharray": [0.2, 8],
        "line-width": {"base": 1.4, "stops": [[14.5, 0], [15, 2], [20, 6]]}
      }
    },
    {
      "id": "cablecar",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": ["all", ["==", "class", "cable_car"], ["!has", "icgc_id"]],
      "layout": {"line-cap": "round", "visibility": "visible"},
      "paint": {
        "line-color": "hsl(0, 0%, 70%)",
        "line-width": {"base": 1, "stops": [[11, 1], [19, 2.5]]}
      }
    },
    {
      "id": "cablecar-dash",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        ["==", "class", "cable_car"],
        ["==", "!has", "icgc_id"]
      ],
      "layout": {"line-cap": "round", "visibility": "visible"},
      "paint": {
        "line-color": "hsl(0, 0%, 70%)",
        "line-width": {"base": 1, "stops": [[11, 3], [19, 5.5]]},
        "line-dasharray": [2, 3]
      }
    },
    {
      "id": "railway-cable_car",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        ["==", "class", "rail"],
        ["==", "subclass", "cable_car"],
        ["has", "icgc_id"]
      ],
      "layout": {"line-cap": "round", "visibility": "visible"},
      "paint": {
        "line-color": "rgba(70, 70, 70, 1)",
        "line-width": {"base": 1, "stops": [[11, 1], [19, 2.5]]}
      }
    },
    {
      "id": "boundary-land-level-other",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "minzoom": 0,
      "maxzoom": 10,
      "filter": [
        "all",
        ["in", "admin_level", 4, 5, 6],
        ["==", "$type", "LineString"],
        ["!has", "minzoom"],
        ["==", "name", "Comunitat Autònoma de Catalunya"],
        ["!=", "maritime", 3]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {"base": 1.4, "stops": [[4, 1], [5, 1], [12, 1]]}
      }
    },
    {
      "id": "boundary-land-level-2",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "minzoom": 0,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "admin_level", 2],
        ["!=", "maritime", 1],
        ["!=", "disputed", 1],
        ["has", "icgc_id"],
        ["!has", "minzoom"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {"base": 1, "stops": [[0, 0.6], [4, 1], [5, 1], [12, 1]]}
      }
    },
    {
      "id": "boundary-land-disputed",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": ["all", ["!=", "maritime", 1], ["==", "disputed", 1]],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(129,42,66,1)",
        "line-dasharray": [1, 3],
        "line-width": {
          "base": 1,
          "stops": [[0, 0.6], [4, 1.4], [5, 2], [12, 8]]
        }
      }
    },
    {
      "id": "boundary-water-costa_cat",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 14,
      "filter": ["all", ["==", "class", "coast-line"]],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(129,42,66,1)",
        "line-width": {"base": 1, "stops": [[5, 0.5], [12, 1.5]]},
        "line-opacity": {"stops": [[5, 0.5], [10, 1]]}
      }
    },
    {
      "id": "poi-level-2-icgc",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "poi",
      "minzoom": 14,
      "maxzoom": 18,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["<=", "rank", 24],
        [">=", "rank", 15],
        [
          "!in",
          "classicgc",
          "circle_stroked",
          "circle",
          "vista_panoramica",
          "esglesia"
        ],
        ["!=", "class", "library"],
        ["==", "icgc_id", 94795]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": ["FiraSans-Regular"],
        "text-anchor": "top",
        "icon-image": "{classicgc}_11",
        "text-field": "",
        "text-offset": [0, 0.6],
        "text-size": 12,
        "text-max-width": 9,
        "symbol-spacing": 80,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "place-other-xarxa_viaria",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 14,
      "maxzoom": 18,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        [
          "in",
          "30507",
          "30508",
          "30509",
          "30510",
          "30511",
          "30512",
          "30513",
          "30509",
          "30700"
        ]
      ],
      "layout": {
        "text-letter-spacing": 0,
        "text-size": {"base": 1.2, "stops": [[10, 8], [12, 11], [16, 12]]},
        "text-font": ["FiraSans-Regular"],
        "text-field": "{name:latin}{name:nonlatin}",
        "text-transform": "none",
        "text-max-width": 9,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(100, 100, 100, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255,0.8)"
      }
    },
    {
      "id": "place-other-4",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 10,
      "maxzoom": 18,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["in", "codigeo", 41102, 40814]
      ],
      "layout": {
        "text-letter-spacing": 0,
        "text-size": {"base": 1.2, "stops": [[10, 8], [12, 11], [16, 12]]},
        "text-font": ["FiraSans-Regular"],
        "text-field": "{name:latin}{name:nonlatin}",
        "text-transform": "none",
        "text-max-width": 9,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(100, 100, 100, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255,0.8)"
      }
    },
    {
      "id": "place-other-park",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 10,
      "maxzoom": 20,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["in", "codigeo", 40810, 40824, 40825, 40826, 40827],
        ["!has", "icgc_zoom"],
        ["has", "zoom"]
      ],
      "layout": {
        "text-letter-spacing": 0.1,
        "text-size": {"base": 1.2, "stops": [[10, 10], [15, 14]]},
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:latin}{name:nonlatin}",
        "text-transform": "uppercase",
        "text-max-width": 9,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(150, 150, 150, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-isolated",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 13,
      "maxzoom": 18,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "isolated_dwelling"],
        ["!in", "codigeo", 40601, 40602, 40603, 40604, 40605, 40606, 40607],
        ["!has", "icgc_zoom"],
        ["has", "zoom"]
      ],
      "layout": {
        "text-letter-spacing": 0.1,
        "text-size": {"base": 1.2, "stops": [[13, 10], [14, 11], [16, 14]]},
        "text-font": ["FiraSans-Regular"],
        "text-field": "{name:latin}{name:nonlatin}",
        "text-transform": "none",
        "text-max-width": 9,
        "symbol-spacing": 80,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(81, 81, 81, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255,0.8)"
      }
    },
    {
      "id": "place-other-poblament",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "1444849242106.713",
        "maputnik:comment": "zooms 11 a 24"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 11,
      "maxzoom": 20,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["!in", "class", "city", "town", "village", "country", "continent"],
        ["!in", "codigeo", 1, 10000, 10100, 10202, 10203],
        [">", "codigeo", 10000],
        ["<", "codigeo", 20000],
        ["!has", "icgc_zoom"],
        ["!has", "zoom"]
      ],
      "layout": {
        "text-letter-spacing": 0.1,
        "text-size": {"base": 1.2, "stops": [[12, 10], [15, 11]]},
        "text-font": ["FiraSans-Regular"],
        "text-field": "{codgieo}{name:latin}{name:nonlatin}",
        "text-transform": "none",
        "text-max-width": 9,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(43, 43, 43, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255,0.8)"
      }
    },
    {
      "id": "place-other-neighbourhood",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "1444849242106.713",
        "maputnik:comment": "zooms 11 a 15"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 11,
      "maxzoom": 20,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["in", "class", "neighbourhood"],
        ["!has", "icgc_zoom"],
        ["has", "zoom"]
      ],
      "layout": {
        "text-letter-spacing": 0.1,
        "text-size": {"base": 1.2, "stops": [[12, 10], [15, 11]]},
        "text-font": ["FiraSans-Regular"],
        "text-field": "{name:latin}{name:nonlatin}",
        "text-transform": "uppercase",
        "text-max-width": 9,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(92, 92, 92, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255,0.8)"
      }
    },
    {
      "id": "place-village",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 11,
      "maxzoom": 20,
      "filter": ["all", ["==", "class", "village"], ["has", "feature_id"]],
      "layout": {
        "text-font": ["FiraSans-Regular"],
        "text-size": {"base": 1.2, "stops": [[10, 10], [11, 11], [13, 12]]},
        "text-field": "{name:latin}",
        "text-max-width": 8,
        "text-allow-overlap": {"stops": [[10, false], [13, false]]},
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(43, 43, 43, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255,0.8)"
      }
    },
    {
      "id": "place-village_icgc",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 10,
      "maxzoom": 20,
      "filter": [
        "all",
        ["==", "class", "village"],
        ["!=", "codigeo", 1],
        ["!has", "icgc_zoom"],
        ["has", "zoom"]
      ],
      "layout": {
        "text-font": ["FiraSans-Regular"],
        "text-size": {"base": 1.2, "stops": [[10, 12], [11, 12], [13, 14]]},
        "text-field": "{name:latin}",
        "text-max-width": 8,
        "text-allow-overlap": {"stops": [[10, false], [13, false]]},
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(130, 130, 130, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255,0.8)"
      }
    },
    {
      "id": "place-nommuni",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "divisionsadministratives",
      "source-layer": "place",
      "minzoom": 10,
      "maxzoom": 20,
      "filter": ["all", ["==", "tipuscap", "M"], ["==", "muni", "NO"]],
      "layout": {
        "text-font": ["FiraSans-Italic"],
        "text-size": {
          "base": 1.2,
          "stops": [[10, 8], [11, 9], [12, 12], [14, 13]]
        },
        "text-field": "({nommuni})",
        "text-max-width": 20,
        "text-transform": "none",
        "text-keep-upright": true,
        "text-justify": "left",
        "text-anchor": "left",
        "icon-anchor": "top-left",
        "text-padding": 1,
        "text-offset": [0, 1.2],
        "text-allow-overlap": {"stops": [[10, true], [11, true]]},
        "visibility": "visible"
      },
      "paint": {
        "text-color": {
          "stops": [
            [6, "rgba(255, 255, 255, 1)"],
            [10, "rgba(255, 255, 255, 1)"]
          ]
        },
        "text-halo-width": 0,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-city-z10_icgc",
      "type": "symbol",
      "source": "divisionsadministratives",
      "source-layer": "place",
      "minzoom": 10,
      "maxzoom": 20,
      "filter": ["all", ["in", "class", "city"], ["==", "tipuscap", "M"]],
      "layout": {
        "text-field": "{name:latin}",
        "symbol-placement": "point",
        "symbol-avoid-edges": false,
        "text-size": {"stops": [[10, 7], [11, 8], [15, 24]]},
        "text-allow-overlap": true,
        "text-max-width": 8,
        "text-ignore-placement": false,
        "text-pitch-alignment": "auto",
        "text-rotation-alignment": "auto",
        "text-justify": "left",
        "text-anchor": "left",
        "text-offset": [0.1, 0.1],
        "text-font": ["FiraSans-Bold"],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": 0,
        "text-halo-color": "rgba(255, 255, 255, 0.8)",
        "text-halo-blur": 1,
        "icon-opacity": 1,
        "text-opacity": 1
      }
    },
    {
      "id": "place-city-z8_c_icgc",
      "type": "circle",
      "source": "divisionsadministratives",
      "source-layer": "place",
      "minzoom": 8,
      "maxzoom": 9,
      "filter": [
        "all",
        ["in", "class", "city"],
        ["in", "rank", 4, 5],
        ["!in", "name", "Lleida", "Tarragona", "Barcelona", "Girona"],
        ["==", "tipuscap", "C"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {
        "circle-color": "rgba(86, 86, 86, 1)",
        "circle-radius": {"stops": [[6, 0.3], [16, 10]]},
        "circle-opacity": {"stops": [[6, 0.4], [10, 1]]},
        "circle-stroke-color": "rgba(0, 0, 0, 1)",
        "circle-blur": 0
      }
    },
    {
      "id": "place-city-z8_icgc",
      "type": "symbol",
      "source": "divisionsadministratives",
      "source-layer": "place",
      "minzoom": 8,
      "maxzoom": 20,
      "filter": [
        "all",
        ["in", "class", "city"],
        ["!in", "name", "Lleida", "Tarragona", "Barcelona", "Girona"],
        ["==", "tipuscap", "C"]
      ],
      "layout": {
        "text-field": "{name:latin}",
        "symbol-placement": "point",
        "symbol-avoid-edges": false,
        "text-size": {"stops": [[8, 12], [11, 14], [15, 24]]},
        "text-allow-overlap": true,
        "text-max-width": 8,
        "text-ignore-placement": false,
        "text-pitch-alignment": "auto",
        "text-rotation-alignment": "auto",
        "text-justify": "left",
        "text-anchor": "left",
        "text-offset": [0.1, 0.1],
        "text-font": ["FiraSans-Bold"],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": 0,
        "text-halo-color": "rgba(255, 255, 255, 0.8)",
        "text-halo-blur": 1,
        "icon-opacity": 1,
        "text-opacity": 1,
        "text-translate": [0, 0]
      }
    },
    {
      "id": "place-city-z7_c_icgc",
      "type": "circle",
      "source": "divisionsadministratives",
      "source-layer": "place",
      "minzoom": 7,
      "maxzoom": 9,
      "filter": [
        "all",
        ["in", "name", "Lleida", "Girona", "Tarragona"],
        ["==", "class", "city"]
      ],
      "layout": {"visibility": "visible"},
      "paint": {
        "circle-color": "rgba(86, 86, 86, 1)",
        "circle-radius": {"stops": [[6, 1], [16, 10]]},
        "circle-opacity": {"stops": [[6, 0.4], [10, 1]]},
        "circle-stroke-color": "rgba(0, 0, 0, 1)",
        "circle-blur": 0
      }
    },
    {
      "id": "place-city-z7_icgc",
      "type": "symbol",
      "source": "divisionsadministratives",
      "source-layer": "place",
      "minzoom": 7,
      "maxzoom": 20,
      "filter": [
        "all",
        ["in", "name", "Lleida", "Girona", "Tarragona"],
        ["==", "class", "city"]
      ],
      "layout": {
        "text-field": "{name:latin}",
        "symbol-placement": "point",
        "symbol-avoid-edges": false,
        "text-size": {"stops": [[7, 12], [9, 11], [11, 24]]},
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-pitch-alignment": "auto",
        "text-rotation-alignment": "auto",
        "text-justify": "left",
        "text-anchor": "left",
        "text-offset": [0.3, 0.3],
        "text-font": ["FiraSans-Bold"],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": 0.1,
        "text-halo-color": "rgba(99, 99, 99, 0.8)",
        "text-halo-blur": 1,
        "icon-opacity": 1,
        "text-opacity": 1
      }
    },
    {
      "id": "place-city",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 5,
      "filter": ["all", ["==", "class", "city"], ["!has", "icgc_id"]],
      "layout": {
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:ca}",
        "text-size": {"stops": [[7, 12], [9, 11], [11, 24]]},
        "text-max-width": 6.25,
        "text-transform": "none",
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "rgba(90, 90, 90, 1)",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-city-bcn_icgc",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "divisionsadministratives",
      "source-layer": "place",
      "minzoom": 5,
      "maxzoom": 20,
      "filter": ["all", ["==", "name", "Barcelona"], ["==", "class", "city"]],
      "layout": {
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:latin}",
        "text-size": {"stops": [[6, 11], [10, 14], [14, 15]]},
        "text-max-width": 6.25,
        "text-transform": "none",
        "text-allow-overlap": true,
        "text-justify": "left",
        "text-anchor": "top-left",
        "text-offset": {
          "stops": [
            [6, [0, 0]],
            [8, [2, 0]],
            [10, [4, 0]],
            [12, [12, 0]],
            [14, [20, 0]],
            [16, [30, 0]]
          ]
        },
        "text-letter-spacing": 0.1,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": 0,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-town",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 6,
      "maxzoom": 18,
      "filter": [
        "all",
        ["==", "class", "town"],
        ["!has", "icgc_id"],
        ["!in", "name", "Barcelona", "Lleida", "Girona", "Tarragona"]
      ],
      "layout": {
        "text-field": "{name:latin}",
        "symbol-placement": "point",
        "symbol-avoid-edges": false,
        "text-size": {"stops": [[8, 12], [11, 11], [15, 24]]},
        "text-allow-overlap": true,
        "text-max-width": 8,
        "text-ignore-placement": false,
        "text-pitch-alignment": "auto",
        "text-rotation-alignment": "auto",
        "text-justify": "left",
        "text-anchor": "left",
        "text-offset": [0.1, 0.1],
        "text-font": ["FiraSans-Bold"],
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgba(100, 100, 100, 1)",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)",
        "text-halo-blur": 1,
        "icon-opacity": 1,
        "text-opacity": 1
      }
    },
    {
      "id": "place-city-capital",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 0,
      "filter": ["all", ["==", "capital", 2], ["==", "class", "city"]],
      "layout": {
        "text-font": ["FiraSans-Regular"],
        "text-size": {"base": 1.2, "stops": [[7, 14], [11, 24]]},
        "text-field": "{name:latin}",
        "text-max-width": 8,
        "icon-image": "star_11",
        "text-offset": [0.4, 0],
        "icon-size": 0.8,
        "text-anchor": "left",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-continent",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 0,
      "maxzoom": 18,
      "filter": ["==", "class", "continent"],
      "layout": {
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:latin}",
        "text-size": 14,
        "text-max-width": 6.25,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "rgba(90, 90, 90, 1)",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-country-other",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 4,
      "maxzoom": 5,
      "filter": ["all", ["==", "class", "country"], ["!in", "rank", 0, 1, 2]],
      "layout": {
        "text-font": ["FiraSans-Italic"],
        "text-field": "{name:latin}",
        "text-size": {"stops": [[3, 11], [7, 17]]},
        "text-max-width": 6.25,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-country-adm1_2",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 5,
      "maxzoom": 6,
      "filter": ["==", "class", "admin_1_2"],
      "layout": {
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:latin}",
        "text-size": 12,
        "text-max-width": 6.25,
        "text-offset": [0.4, 0],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "icon-allow-overlap": true,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "rgba(120, 120, 120, 1)",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-country-3",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 4,
      "maxzoom": 5,
      "filter": ["all", ["==", "class", "country"], [">=", "rank", 3]],
      "layout": {
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:latin}",
        "text-size": {"stops": [[3, 11], [7, 17]]},
        "text-transform": "uppercase",
        "text-max-width": 6.25,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-country-2",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 3,
      "maxzoom": 5,
      "filter": ["all", ["==", "class", "country"], ["==", "rank", 2]],
      "layout": {
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:latin}",
        "text-size": 11,
        "text-max-width": 6.25,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "place-country-1",
      "type": "symbol",
      "metadata": {"mapbox:group": "1444849242106.713"},
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 2,
      "maxzoom": 5,
      "filter": ["all", ["==", "class", "country"], ["==", "rank", 1]],
      "layout": {
        "text-font": ["FiraSans-Bold"],
        "text-field": "{name:latin}",
        "text-size": 11,
        "text-max-width": 6.25,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255, 255, 255, 0.8)"
      }
    },
    {
      "id": "hipsometria_select",
      "type": "fill",
      "source": "contour",
      "source-layer": "contour",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "contour-senzilles_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "contour",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "contour-intercalades_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "contour",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "contour-mestres_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "contour",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "contour-250m_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "contour",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "contour-cotes_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "contour",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    },
    {
      "id": "waterway-other_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "waterway-stream-canal_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "waterway-river_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "water-ocean_select",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "water_select",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "water-other_select",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "building-industrial_select",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "building-top-industrial_select",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "building_select",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "building-top_select",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-color": "rgba(242, 0, 242, 1)", "fill-opacity": 0.8}
    },
    {
      "id": "tunnel-path_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-service-track-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-minor-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-tertiary-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-secondary-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-primary-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-trunk-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-motorway-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-service-track_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-pedestrian_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-minor_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-tertiary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-secondary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-primary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-trunk_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-motorway_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-railway_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "tunnel-railway-highspeed_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-motorway-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-path_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-track_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-service-parking_aisle_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-pedestrian_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-pedestrian-steps_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-busway_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-minor_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-tertiary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-secondary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-primary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "highway-motorway_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway-transit_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway-service_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway-highspeed_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway-rack_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway-funicular_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway-other_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "railway-hatching_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-pedestrian_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-minor_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "id_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-tertiary-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-secondary-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-primary-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-motorway-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-path-casing_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-path_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-tertiary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-secondary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-primary_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "bridge-motorway_select",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "codi_via", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "boundary-land-municipis_select",
      "type": "line",
      "source": "divisionsadministratives",
      "source-layer": "boundary",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "line-color": "rgba(242, 0, 242, 1)",
        "line-opacity": 0.8,
        "line-width": 4
      }
    },
    {
      "id": "water-name-mars_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    },
    {
      "id": "water-name-lakeline-platja-mountain_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "mountain_peak",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    },
    {
      "id": "water-name-lakeline-z12_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    },
    {
      "id": "water-name-lakeline-MM_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    },
    {
      "id": "water-name-other_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    },
    {
      "id": "highway-name-pedestrian_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    },
    {
      "id": "highway-name-minor_select",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "minzoom": 14,
      "maxzoom": 21,
      "filter": ["==", "icgc_id", "null#"],
      "layout": {"visibility": "visible"},
      "paint": {
        "icon-halo-color": "rgba(242, 0, 242, 1)",
        "icon-halo-width": 10
      }
    }
  ],
  "id": "ru07vkz8n"
}