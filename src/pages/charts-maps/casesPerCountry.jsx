import { useLayoutEffect, useRef } from "react";
import './styles.css'

const { am5, am5map, am5themes_Animated, am5geodata_worldLow } = window

export default function AllCasesGlobal(props) {
    const seriesByCountryRef = useRef(null);

    // This code will only run one time
    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv_country_wise_cases");
        root.setThemes([am5themes_Animated.new(root)]);

        let chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                projection: am5map.geoNaturalEarth1()
            })
        );

        // Create polygon series
        const countryCaseSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow
            })
        );

        countryCaseSeries.mapPolygons.template.setAll({
            tooltipText: "{name}\nTotal Cases: {totalCases}\nActive Cases: {activeCases}\nTotal Deaths: {totalDeaths}",
            interactive: true
        });

        countryCaseSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color("#cc0000")
          });

        chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
        seriesByCountryRef.current = countryCaseSeries

        return () => {
            root.dispose();
        };
    }, []);

    useLayoutEffect(() => {

        const formatedData = [];
        (props?.casesData || []).forEach(country => {
            formatedData.push({
                id: country?.countryInfo?.iso2,
                name: country?.country,
                totalCases: country?.cases,
                activeCases: country?.active,
                totalDeaths: country?.deaths
            })
        });
        seriesByCountryRef.current.data.setAll(formatedData);
    }, [props?.casesData]);

    return <>
    <div id="chartdiv_country_wise_cases" style={{ minWidth: "75vw", minHeight: "80vh" }}></div>
    <footer className="footer-info">* In mobile, click on a country to ciew its data.</footer>
    </>;
}






// import React from "react"
// import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"

// const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

// export default function CovidCasesByCountryMap() {
//     return (
//         <ComposableMap>
//             <ZoomableGroup center={[0, 0]} zoom={1}>
//                 <Geographies geography={geoUrl}>
//                     {({ geographies }) =>
//                         geographies.map((geo) => (
//                             <Geography
//                                 key={geo.rsmKey}
//                                 geography={geo}
//                                 fill="#D6D6DA"
//                                 stroke="#FFFFFF"
//                                 strokeWidth={0.5}
//                             />
//                         ))
//                     }
//                 </Geographies>
//             </ZoomableGroup>
//         </ComposableMap>
//     )
// }

