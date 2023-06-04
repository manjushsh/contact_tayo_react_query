import { useLayoutEffect, useRef } from "react";
import dayjs from 'dayjs';
import './styles.css'

const { am5, am5xy, am5themes_Animated } = window

export default function AllCasesGlobal(props) {
    const seriesGlobalCountRef = useRef(null);
    const xAxisRef = useRef(null);

    // This code will only run one time
    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv_allglobalcases");
        root.setThemes([am5themes_Animated.new(root)]);
        root.utc = true

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                wheelY: "zoomX",
                layout: root.verticalLayout,
                maxTooltipDistance: 0
            })
        );

        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "day", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        let scrollbar = am5.Scrollbar.new(root, {
            orientation: "horizontal"
        });
        let tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            getStrokeFromSprite: true,
            autoTextColor: false,
            getLabelFillFromSprite: true,
            labelText: "[bold]{valueX.formatDate()}\n {valueY}",
        });
        tooltip.get("background").setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 0.8
        });
        scrollbar.set("tooltip", tooltip);
        scrollbar.startGrip.set("tooltipText", "Drag to zoom");
        scrollbar.endGrip.set("tooltipText", "Drag to zoom");

        chart.set("scrollbarX", scrollbar);


        // Create series
        const seriesGlobalCount = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Global cases trend",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "caseCount",
                valueXField: "date",
                tooltip: tooltip
            })
        );

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(root, {}));

        xAxisRef.current = xAxis;
        seriesGlobalCountRef.current = seriesGlobalCount;

        return () => {
            root.dispose();
        };
    }, []);

    // This code will only run when props.data changes
    useLayoutEffect(() => {

        const formatedData = [];
        const keysOfChartData = Object.keys(props?.chartData || {})
        keysOfChartData.forEach((key, currentIndex, i) => {
            const date = dayjs(key, "MM/DD/YYYY").unix() * 1000
            const caseCount = props?.chartData[i[currentIndex]] - props?.chartData[i[currentIndex - 1 > 0 ? currentIndex - 1 : 0]]
            formatedData.push({ date: date, caseCount: caseCount })
            console.log()
        });

        xAxisRef.current.data.setAll(formatedData);
        seriesGlobalCountRef.current.data.setAll(formatedData);
    }, [props?.chartData]);

    return <div id="chartdiv_allglobalcases" style={{ minWidth: "75vw", minHeight: "80vh" }}></div>;
}


