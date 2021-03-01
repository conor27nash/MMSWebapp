<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js";
    let allConfigs = [];
    let motorData;
    onMount(async () => {
        await fetch(
            "https://mmsdata.azurewebsites.net/api/MMSConfig?motorID=all"
        )
            .then((res) => res.json())
            .then((data) => {
                allConfigs = data;
            });
        for (let i = 0; i < allConfigs.length; i++) {
            const currentMotorId = allConfigs[i].id;
            console.log(currentMotorId);

            await fetch(
                `https://mmsdata.azurewebsites.net/api/MMSRetrieveData?motorID=${currentMotorId}`
            )
                .then((res) => res.json())
                .then((data) => {
                    motorData = data;
                });

            let powerGraph, rpmGraph, tempGraph;
            powerGraph = motorData[0];

            rpmGraph = motorData[1];

            tempGraph = motorData[2];
            var ctx = <HTMLCanvasElement>(
                document.getElementById(`${currentMotorId}`).getContext("2d")
            );
            let timelabels = [];
            let powerdata = [];
            let rpmdata = [];
            let tempdata = [];

            for (let i = 0; i < powerGraph.length; i++) {
                powerGraph[i].t = new Date(powerGraph[i].t);
                timelabels.push(powerGraph[i].t);
            }
            for (let i = 0; i < powerGraph.length; i++) {
                let data = powerGraph[i].y;
                powerdata.push(data);
            }
            for (let i = 0; i < rpmGraph.length; i++) {
                let data = rpmGraph[i].y / 1000;
                rpmdata.push(data);
            }
            for (let i = 0; i < tempGraph.length; i++) {
                let data = tempGraph[i].y;
                tempdata.push(data);
            }

            const motorOneData = {
                labels: timelabels,
                datasets: [
                    {
                        fill: false,
                        label: "Power(KW)",
                        data: powerdata,
                        borderColor: "#fe8b36",
                        backgroundColor: "#fe8b36",
                        lineTension: 0,
                    },
                    {
                        fill: false,
                        label: "Rpm(1000 r/min)",
                        data: rpmdata,
                        borderColor: "#61b60c",
                        backgroundColor: "#61b60c",
                        lineTension: 0,
                    },
                    {
                        fill: false,
                        label: "Temperature(Celsius)",
                        data: tempdata,
                        borderColor: "#c00ee6",
                        backgroundColor: "#c00ee6",
                        lineTension: 0,
                    },
                ],
            };
            const options = {
                type: "line",
                data: motorOneData,
                options: {
                    fill: false,
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                type: "time",
                                time: {
                                    unit: "day",
                                    displayFormats: {
                                        quarter: "MMM YYYY",
                                    },
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Values",
                                },
                            },
                        ],
                    },
                },
            };

            let chart = new Chart(ctx, options);
        }
    });
</script>

<main>
    <script
        type="text/javascript"
        src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
    <h1 class="text-center">MMS Graphs</h1>
    {#each allConfigs as { id }}
        <h4 class="h4 text-center" style="margin-top: 20px;">Motor: {id}</h4>
        <div style="text-align: center; margin-bottom: 20px;">
            <canvas {id} />
        </div>
    {/each}
</main>

<style>
    canvas {
        width: 1600px !important;
        height: 800px !important;
        padding-left: 0;
        padding-right: 0;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
</style>
