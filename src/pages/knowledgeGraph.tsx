import { CheckCard } from "@ant-design/pro-card";
import {Avatar} from "antd";
import TreeMetric from "./MetricTree"
import KGraph from "./kgraph"

export default function KnowledgeGraph(){
  const dataSource = [
    {
      title: 'Anomaly Extraction',
      avatar: (
        <Avatar
          size={32}
          shape="square"
          src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
        />
      ),
      value: 'A',
    },
    {
      title: 'Dependency Cleansing',
      avatar: (
        <Avatar
          size={32}
          shape="square"
          src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
        />
      ),
      value: 'B',
    },
    {
      title: 'RCA',
      avatar: (
        <Avatar
          size={32}
          shape="square"
          src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
        />
      ),
      value: 'C',
    },
    {
      title: 'Dependency intelligence',
      avatar: (
        <Avatar
          size={32}
          shape="square"
          src="https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg"
        />
      ),
      value: 'D',
    },
  ];

  return(<div style={{padding: 24}}>
      <CheckCard.Group options={dataSource} />

      <TreeMetric/>
      <KGraph/>

    </div>

  )
}