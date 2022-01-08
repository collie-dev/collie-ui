import React from 'react'
import { endOfToday, set } from 'date-fns'
import TimeRange from 'react-timeline-range-slider'
import { Collapse } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(7)
const endTime = endOfToday()

const disabledIntervals = [
  { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) }
]


const MetricLine = ({ name, b, a , hits = undefined}) => {
  return <div className={"metric-line"}>
    <div className={"name"}>{name}</div>
    <div className="baseline">
      {b}
    </div>

    <div className="actual">
      {a}
    </div>

    <div className="hits">
      {hits}

    </div>
  </div>


}

export class Intelligence extends React.Component {
  state = {
    error: false,
    selectedInterval: [selectedStart, selectedEnd],
  }

  errorHandler = ({ error }) => this.setState({ error })

  onChangeCallback = selectedInterval => this.setState({ selectedInterval })

  render() {
    const { selectedInterval, error } = this.state
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
      <div className="site-layout-background" style={{ padding: 8, marginTop: 24 }}>
        <div style={{marginBottom:"10px", fontSize: "16px"}}>
          RCA suggest: <span style={{color: "red"}}>Network Latency</span>, similar: 93.7%
        </div>
        <TimeRange
          error={error}
          ticksNumber={60}
          selectedInterval={selectedInterval}
          timelineInterval={[startTime, endTime]}
          onUpdateCallback={this.errorHandler}
          onChangeCallback={this.onChangeCallback}
          disabledIntervals={disabledIntervals}
        />


        <div className={"metric-table"} style={{padding: "0 16px", marginTop: "36px"}}>
        <MetricLine name={""} b={"baseline"} a={"actual"}/>
          <MetricLine name={""} b={"AVG"} a={"AVG"}/>
        </div>
        <Collapse defaultActiveKey={['1', '2']} style={{ marginTop: "8px" }}>
          <Panel header="app:TiKV 172.31.34.23:20160" key="1">
            <div className={"metric-table"}>
              <MetricLine name={"tikv.cpu.usage"} b={"71.7%"} a={"24.1%"} hits={<>2.9x<FallOutlined /></>}/>
            </div>
          </Panel>
          <Panel header="app:TiDB 172.31.40.244:4000" key="2">
            <div className={"metric-table"}>
              <MetricLine name={"tidb.duration.p99"} b={"478ms"} a={"1400ms"}/>
              <MetricLine name={"tidb.qps"} b={"1170"} a={"469"}/>
              <MetricLine name={"tidb.tps"} b={"182"} a={"68"}/>
              <MetricLine name={"tidb.tp_duration.p99"} b={"2010ms"} a={"3430ms"}/>
              <Collapse defaultActiveKey={['1']} style={{ marginTop: "8px" }}>
                <Panel header="Log Pattern Diff (power by naglfar)" key="1">
                  <div className={"metric-table log"}>
                    <MetricLine name={"slow prewrite request "} b={"2"} a={"49"} hits={<><FallOutlined />24x</>}/>
                    <MetricLine name={"analyze table {str}.{str} as finished "} b={"194"} a={"31"} hits={<><FallOutlined />6x</>}/>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </Panel>
          <Panel header="app:TiKV 172.31.34.246:20160" key="3">
            <p>{text}</p>
          </Panel>

          <Panel header="app:TiKV 172.31.44.167:20160" key="4">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    )
  }
}
