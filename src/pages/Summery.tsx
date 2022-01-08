import {StatisticCard} from "@ant-design/pro-card";
import {Divider} from "antd";
import React from "react";

export default function Summary() {
  return (
    <div className="site-layout-background" style={{padding: 8, marginTop: 24}}>
    <StatisticCard.Group title="Dataset" direction={'row'}>
        <StatisticCard
          statistic={{
            title: 'Logs',
            tip: '',
            value: 114514,
            suffix: 'line',

            // precision: 2,
          }}
        />
        <Divider type={'vertical'}/>
        <StatisticCard
          statistic={{
            title: 'Metrics',
            value: 1479,
            precision: 0,
          }}
        />
        <Divider type={'vertical'}/>
        <StatisticCard
          statistic={{
            title: 'Event',
            value: 92,
            suffix: '',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Trace',
            value: 0,
          }}
        />
      </StatisticCard.Group>
    </div>
  )
}