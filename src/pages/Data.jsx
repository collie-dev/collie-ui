import "moment-duration-format";
import moment from "moment";
import React from "react";
import { format } from "d3-format";
import _ from "underscore";
import data from "./ts.json"
import {Set} from "immutable"
// Pond
import { TimeSeries, TimeRange } from "pondjs";
import {
  AreaChart, TimeRangeMarker, TimeMarker,
  ChartContainer,
  ChartRow,
  Charts,
  LabelAxis,
  LineChart,
  Resizable,
  ValueAxis,
  YAxis,
  Brush
} from "react-timeseries-charts"

// Styling relates a channel to its rendering properties. In this way you
// can achieve consistent styles across different charts and labels by supplying
// the components with this styler object
//
// const style = styler(channelNames.reduce((v, key)=>{
//   v.push({
//     key,
//     color: "steelblue"
//   })
//   return v;
// } , []));


// Baselines are the dotted average lines displayed on the chart
// In this case these are separately styled
const brushStyle = {
  boxShadow: "inset 0px 2px 5px -2px rgba(189, 189, 189, 0.75)",
  background: "#FEFEFE",
  paddingTop: 10
};
const baselineStyles = {
  speed: {
    stroke: "steelblue",
    opacity: 0.5,
    width: 0.25
  },
  power: {
    stroke: "green",
    opacity: 0.5,
    width: 0.25
  }
};

// d3 formatter to display the speed with one decimal place
const speedFormat = format(".1f");
const start = new Date(2021, 1, 1).valueOf();

export default class cycling extends React.Component {
  constructor(props) {
    super(props);
    const initialRange = new TimeRange([1641548573000, 1641557577000]);


    this.state = {
      ready: false,
      mode: "channels",
      channels: [],
      channelNames: [],
      rollup: "1m",
      tracker: null,
      timerange: initialRange,
      brushrange: initialRange,
      selected: Set(),
    };
  }


  componentDidMount() {
    setTimeout(() => {
      const { channelNames, channels } = this.state;

      let names = [];

      for (let kpi of data) {
        if (kpi.change_point && kpi.change_point.length>0){
          names.push(kpi.name)
          channels[kpi.name] = {
            units: "%",
            label: kpi.name,
            format: ",.1f",
            show: true,
            avg: 0.1,
            max: kpi.max,
            cp:kpi.change_point,
            series: new TimeSeries({
              name: kpi.name,
              columns: ["time", "value"],
              points: kpi.values,
            }),
          }
        }


      }
      const selected = ["node_cpu_seconds_total-{{instance}}172.31.34.23:9100", "node_load1-{{instance}}node_load1-172.31.34.23:9100-overwritten-nodes", "tidb_server_query_total-{{instance}} {{type}} {{result}}172.31.40.244:10080-tidb-OK-Ping", "tidb_tikvclient_txn_cmd_duration_seconds_bucket-{{type}}get", "tidb_server_query_total-{{instance}} {{type}} {{result}}172.31.41.21:10080-tidb-OK-StmtExecute", "pd_client_request_handle_requests_duration_seconds_count-request", "tidb_server_handle_query_duration_seconds_bucket-999", "tidb_session_transaction_duration_seconds_count-{{type}}commit", "tidb_tikvclient_lock_resolver_actions_total-{{type}}query_resolve_lock_lite", "tidb_session_transaction_duration_seconds_bucket-80", "tidb_tikvclient_txn_cmd_duration_seconds_count-{{type}}lock_keys", "pd_hotspot_status-store-{{store}}pd_hotspot_status…172.31.40.244:2379-pd-5-hot_read_region_as_leader", "node_network_receive_bytes_total-Inbound:  {{insta…device}}eth0-172.31.44.167:9100-overwritten-nodes", "tidb_session_transaction_duration_seconds_bucket-95", "tidb_executor_statement_total-{{type}}Commit", "tidb_tikvclient_txn_cmd_duration_seconds_bucket-{{type}}commit", "node_network_transmit_bytes_total-Outbound:  {{ins…device}}eth0-172.31.34.246:9100-overwritten-nodes", "tidb_tikvclient_lock_resolver_actions_total-{{type}}query_resolve_locks", "tidb_executor_statement_total-{{type}}Insert", "tidb_tikvclient_lock_resolver_actions_total-{{type}}query_txn_status_committed", "pd_client_cmd_handle_cmds_duration_seconds_count-cmd", "pd_hotspot_status-store-{{store}}pd_hotspot_status…72.31.40.244:2379-pd-1-hot_write_region_as_leader", "node_network_transmit_bytes_total-Outbound:  {{ins…device}}eth0-172.31.44.167:9100-overwritten-nodes", "tidb_session_transaction_duration_seconds_bucket-99", "tidb_server_handle_query_duration_seconds_bucket-80", "tidb_executor_statement_total-{{type}}Select", "tidb_tikvclient_txn_cmd_duration_seconds_count-{{type}}batch_get", "pd_hotspot_status-store-{{store}}pd_hotspot_status…172.31.40.244:2379-pd-4-hot_read_region_as_leader", "tidb_session_transaction_duration_seconds_count-{{type}}rollback", "tikv_coprocessor_request_duration_seconds_bucket-{{req}}-99%select", "tidb_server_handle_query_duration_seconds_bucket-95", "tidb_tikvclient_lock_resolver_actions_total-{{type}}expired", "tidb_tikvclient_txn_cmd_duration_seconds_bucket-{{type}}lock_keys", "tidb_tikvclient_txn_cmd_duration_seconds_count-{{type}}get", "pd_hotspot_status-store-{{store}}pd_hotspot_status…72.31.40.244:2379-pd-5-hot_write_region_as_leader", "node_network_transmit_bytes_total-Outbound:  {{ins…{device}}eth0-172.31.41.21:9100-overwritten-nodes", "tidb_executor_statement_total-{{type}}Begin", "tidb_server_handle_query_duration_seconds_bucket-99", "go_memstats_heap_inuse_bytes-HeapInuse-{{instance}…emstats_heap_inuse_bytes-172.31.40.244:10080-tidb", "tidb_executor_statement_total-{{type}}RollBack", "node_network_transmit_bytes_total-Outbound:  {{ins…{device}}eth0-172.31.34.23:9100-overwritten-nodes", "tidb_tikvclient_txn_cmd_duration_seconds_count-{{type}}commit", "tidb_server_query_total-{{instance}} {{type}} {{result}}172.31.40.244:10080-tidb-OK-Query", "node_network_receive_bytes_total-Inbound:  {{insta…{device}}eth0-172.31.41.21:9100-overwritten-nodes", "tikv_coprocessor_executor_count-{{type}}batch_index_scan", "tikv_coprocessor_executor_count-{{type}}batch_selection", "tikv_thread_cpu_seconds_total-{{instance}}172.31.34.23:20180", "tidb_executor_statement_total-{{type}}Update", "tidb_server_query_total-{{instance}} {{type}} {{result}}172.31.41.21:10080-tidb-OK-Query", "tidb_server_query_total-{{instance}} {{type}} {{result}}172.31.41.21:10080-tidb-OK-Ping", "tidb_server_query_total-{{instance}} {{type}} {{result}}172.31.40.244:10080-tidb-OK-StmtExecute", "node_cpu_seconds_total-{{instance}}172.31.41.21:9100", "tidb_executor_statement_total-{{type}}Delete", "tikv_coprocessor_executor_count-{{type}}batch_table_scan"]
      const minDuration = 60 * 1000;
      const minTime = new Date(start);
      const maxTime = new Date((start + 800 * 60 * 1000));

      this.setState({ selected: Set(selected),ready: true, channels, minTime, maxTime, minDuration, channelNames: names });
    }, 0);
  }

  tsBuild = (name) => {
    let points = [];
    Array.from(Array(500))
      .map((_, i) => points.push([start + i * 60 * 1000, Math.random() * 100]))
    return new TimeSeries({
      name: name,
      columns: ["time", name],
      points: points,
    });
  }
  handleTrackerChanged = t => {
    this.setState({ tracker: t });
  };

  // Handles when the brush changes the timerange
  handleTimeRangeChange = timerange => {
    const { channels, channelNames } = this.state;

    if (timerange) {
      this.setState({ timerange, brushrange: timerange });
    } else {
      this.setState({ timerange: channels[channelNames[0]].range(), brushrange: null });
    }
  };

  handleChartResize = width => {
    this.setState({ width });
  };

  handleActiveChange = channelName => {
    const channels = this.state.channels;
    channels[channelName].show = !channels[channelName].show;
    this.setState({ channels });
  };

  renderChart = () => {
    return this.renderChannelsChart();
  };

  renderChannelsChart = () => {
    const { selected, channelNames, channels, maxTime, minTime, minDuration } = this.state;

    const rows = [];

    for (let channelName of channelNames) {
      const charts = [];
      let series = channels[channelName].series;
      if (selected.has(channelName)){

      }
      charts.push(
        <LineChart
          key={`line-${channelName}`}
          axis={`${channelName}_axis`}
          series={series}
          columns={["value"]}
          onSelectionChange={()=>{
            console.log(channelName)
            this.setState({selected: selected.add(channelName)})
          }}
          // style={style}
        />
      );

      // Get the value at the current tracker position for the ValueAxis
      let value = "--";
      let marker = <g/>
      // if (this.state.tracker) {
      //   const approx =
      //     (+this.state.tracker - +timerange.begin()) /
      //     (+timerange.end() - +timerange.begin());
      //   const ii = Math.floor(approx * series.size());
      //   const i = series.bisect(new Date(this.state.tracker), ii);
      //   const v = i < series.size() ? series.at(i).get('value') : null;
      //   if (v) {
      //     value = parseInt(v, 10);
      //   }
      //
      //   const e = series.atTime(this.state.tracker);
      //
      // }

      const isSelect = selected.has(channelName)
      charts.push(<TimeRangeMarker
        onClick={()=>console.log("?")}

        type="flag"
        style={{ fill: isSelect? "rgba(82, 196, 26, 0.25)":"rgba(70, 130, 180, 0.25)" }}
        axis={`${channelName}_axis`}
        timerange={new TimeRange([1641555720000, 1641556500000])}
      />)
      for (let p of channels[channelName].cp) {
        charts.push(<TimeMarker
          time={new Date(p.start / 1000000)}
          // infoValues={"Shift↘"}
          showTime={false}
          infoHeight={0}
          infoWidth={0}
          infoStyle={{
            line: { stroke: "red", cursor: "crosshair", pointerEvents: "none" },
            box: {
              fill: "red", opacity: 0, stroke: "#999", pointerEvents: "none",
              label: { fill: "red", transform: "translate(-10px, -10px)" }
            },
            dot: { fill: "#999" }
          }}
        />)
      }



      // Get the summary values for the LabelAxis
      const summary = [
        { label: "Max", value: speedFormat(channels[channelName].max) },
        { label: "Avg", value: speedFormat(channels[channelName].avg) }
      ];

      rows.push(
        <ChartRow
          height="100"
          visible={channels[channelName].show}
          key={`row-${channelName}`}
        >
          <LabelAxis
            id={`${channelName}_axis`}
            label={channels[channelName].label}
            values={summary}
            min={0}
            max={channels[channelName].max}
            width={140}
            style={ { axis: { fontSize: 11, textAnchor: "left", fill: "#bdbdbd" },
              label: { textAnchor: "start", fontWeight: "bolder" , fontSize: 16, transform: "translate(-45px, -10px)", fill: "#838383" },
              values: { fill: "none", stroke: "none" } }}
            type="linear"
            format=",.1f"
          />
          <Charts>{charts}</Charts>
          <ValueAxis
            id={`${channelName}_valueaxis`}
            value={value}
            detail={channels[channelName].units}
            width={80}
            min={0}
            max={100}
          />

        </ChartRow>
      );
    }

    return (
      <ChartContainer
        timeRange={this.state.timerange}
        showGrid={false}
        maxTime={maxTime}
        minTime={minTime}
        minDuration={minDuration}
        trackerPosition={this.state.tracker}
        // onTimeRangeChanged={this.handleTimeRangeChange}
        // onChartResize={width => this.handleChartResize(width)}
        // onTrackerChanged={this.handleTrackerChanged}
      >
        {rows}
      </ChartContainer>
    );
  };

  renderBrush = () => {
    const { channels } = this.state;
    return (
      <ChartContainer
        timeRange={new TimeRange([1641548573000, 1641557577000])}
        // trackerPosition={this.state.tracker}
      >
        <ChartRow height="60" debug={false}>
          <Brush
            timeRange={this.state.brushrange}
            allowSelectionClear
            onTimeRangeChanged={this.handleTimeRangeChange}
          />
          <YAxis
            id="axis1"
            visible={false}
            label="Altitude (ft)"
            min={0}
            max={100}
            width={70}
            type="linear"
            format="d"
          />
          <Charts>
            <AreaChart
              axis="axis1"
              // style={style.areaChartStyle()}
              columns={{ up: [Object.keys(channels)[0]], down: [] }}
              series={channels[Object.keys(channels)[0]].series}
            />
          </Charts>
        </ChartRow>
      </ChartContainer>
    );
  };

  render() {
    const { ready } = this.state;

    if (!ready) {
      return <div>{`Building rollups...`}</div>;
    }
    const chartStyle = {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#DDD",
      paddingTop: 10,
      marginBottom: 10,
      position: "relative",
      width: "100%",
      height: 600,
      overflowY: "scroll"
    };

    return (
      <div className="site-layout-background" style={{ padding: 8, marginTop: 24 }}>
        <div className="row">

          <div className="col-md-6">
            {this.state.tracker
              ? `${moment.duration(+this.state.tracker).format()}`
              : "-:--:--"}
          </div>
        </div>

        {/*<div className="row">*/}
        {/*  <div className="col-md-12" style={brushStyle}>*/}
        {/*    <Resizable>{ready ? this.renderBrush() : <div />}</Resizable>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="row">
          <div className="col-md-12" style={chartStyle}>
            <Resizable>
              {ready ? this.renderChart() : <div>Loading.....</div>}
            </Resizable>
          </div>
        </div>
      </div>
    );
  }
}