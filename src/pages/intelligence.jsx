import React from 'react'
import { endOfToday, set } from 'date-fns'
import { TimePicker } from 'antd';
import { Collapse } from 'antd';
import { DownOutlined, FallOutlined, UpOutlined, WarningTwoTone } from '@ant-design/icons';
import { Select, Tag } from 'antd';
import moment from "moment";
const { Option } = Select;
const { Panel } = Collapse;
const Rise =<Tag icon={<UpOutlined />} color="#2db7f5">Shift Up</Tag>
const Down = <Tag icon={<DownOutlined />} color="#87d068">Shift Down</Tag>
const DownError = <><Tag icon={<DownOutlined />} color="#108ee9">Spike Up</Tag><WarningTwoTone twoToneColor="#f1c40f"  /></>
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


const MetricLine = ({ name, b, a , hits = undefined, rca = undefined}) => {
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

    <div className="rca">
      {rca}
    </div>
  </div>


}

export class Intelligence extends React.Component {
  state = {
    error: false,
    rcaId: "1",
    selectedInterval: [selectedStart, selectedEnd],
  }

  errorHandler = ({ error }) => this.setState({ error })

  onChangeCallback = selectedInterval => this.setState({ selectedInterval })

  render() {
    const { rcaId, error } = this.state
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
      <div className="site-layout-background" style={{ padding: 8, marginTop: 24 }}>
        <div style={{marginBottom:"10px", fontSize: "16px"}}>
          <div style={{display:"flex"}}>
            <div style={{flex: "1 1 800px"}}>
              baseline: <TimePicker.RangePicker defaultValue={[moment('04:08:23', 'HH:mm:ss'), moment('14:08:23', 'HH:mm:ss')]} size="small"/>
              actual: <TimePicker.RangePicker defaultValue={[moment('14:08:24', 'HH:mm:ss'), moment('14:19:23', 'HH:mm:ss')]} size="small"/>
            </div>
            <div style={{ flex: "0 0  300px"}}>
              rac:<Select defaultValue="1" onChange={id=>{this.setState({rcaId: id})}} style={{ width: 220}} value={rcaId}>
              <Option value="1">97.1% 网络延迟</Option>
              <Option value="2">14.3% CPU 异常负载</Option>
              <Option value="3">4.7% Cpu 瓶颈</Option>
              <Option value="4">3.2% 网络瓶颈</Option>

            </Select>

            </div>
          </div>
          {/*RCA suggest: <span style={{color: "red"}}>Network Latency</span>, similar: 93.7%*/}

        </div>
        {/*<TimeRange*/}
        {/*  error={error}*/}
        {/*  ticksNumber={60}*/}
        {/*  selectedInterval={selectedInterval}*/}
        {/*  timelineInterval={[startTime, endTime]}*/}
        {/*  onUpdateCallback={this.errorHandler}*/}
        {/*  onChangeCallback={this.onChangeCallback}*/}
        {/*  disabledIntervals={disabledIntervals}*/}
        {/*/>*/}



        <div className={"metric-table"} style={{padding: "0 16px", marginTop: "36px"}}>
        <MetricLine name={""} b={"baseline"} a={"actual"} rca={"rca"}/>
          <MetricLine name={""} b={"AVG"} a={"AVG"}/>
        </div>
        <Collapse defaultActiveKey={['1', '2']} style={{ marginTop: "8px" }}>
          <Panel header="app:TiKV 172.31.34.23:20160" key="1">
            <div className={"metric-table"}>
              <MetricLine name={"tikv.cpu.usage"} b={"71.7%"} a={"24.1%"} hits={<>2.9x<FallOutlined /></>} rca={rcaId!=="1"?DownError:Down}/>
            </div>
          </Panel>
          <Panel header="app:TiDB 172.31.40.244:4000" key="2">
            <div className={"metric-table"}>
              <MetricLine name={"tidb.duration.p99"} b={"478ms"} a={"1400ms"} rca={Rise}/>
              <MetricLine name={"tidb.qps"} b={"1170"} a={"469"} rca={Down}/>
              <MetricLine name={"tidb.tps"} b={"182"} a={"68"} rca={Down}/>
              <MetricLine name={"tidb.tp_duration.p99"} b={"2010ms"} a={"3430ms"} rca={Rise}/>
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
