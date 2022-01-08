import React from "react";


const Title = ({ title, children }) => {
  return (<div className="item">
    <div className="title">{title}</div>
    {children}
  </div>)
}

export default class MetricTree extends React.Component {

  componentDidMount() {

  }

  render() {

    return (<div className="site-layout-background" style={{ padding: 8, display: "flex" }}>
      <div className={"card"} style={{ width: "400px", height: "600px" }}>
        <div>
          <span className={"name"}>
            tidb.<span style={{ fontWeight: "bolder" }}>QPS</span>
          </span>
        </div>

        <Title title="介绍">
          <div>
            不同类型 SQL 语句每秒执行的数量。按 SELECT、INSERT、UPDATE 等来统计。在监控系统中
            可存在别名: Statement OPS
          </div>
        </Title>

        <Title title="关联指标">
          <div>
            tidb_executor_statement_total
          </div>
        </Title>


        <Title title="关联信息">
          <div>
            <div>
              <span>Grafana Panel:</span>
              <a>[tidb overview / statement ops]</a>
            </div>

            <div>
              <span>指标文档: </span>
              <a href={"https://docs.pingcap.com/zh/tidb/stable/grafana-overview-dashboard#tidb"}>pingcapDoc/grafana/overview-dashboard</a>
            </div>
          </div>
        </Title>



      </div>

      <div className={"tree-graph"} style={{ width: "800px", height: "600px" }}>
        <div className={"line"}>

          <div className={"node"}>
            <span className="label">Machine</span>
            <span className="status">
            411
          </span>
          </div>

          <div className={"flex-column"}>
            <div className={"node"}>
              <span className="label">CPU</span>
              <span className="status">4</span>
            </div>

            <div className={"node"}>
              <span className="label">MEM</span>
              <span className="status">37</span>
            </div>

            <div className={"node"}>
              <span className="label">IO</span>
              <span className="status">37</span>
            </div>

            <div className={"node"}>
              <span className="label">NET</span>
              <span className="status">37</span>
            </div>

            <div className={"node"}>
              <span className="label">XFS</span>
              <span className="status">37</span>
            </div>
          </div>
        </div>

        <div className={"line"} style={{marginTop: "16px"}}>
          <div className={"node"}>
            <span className="label">Workload</span>
          </div>
          <div className={"flex-column"}>

            <div className={"node"}>
              <span className="label">TiKV</span>
              <span className="status">
            428
          </span>
            </div>


            <div className={"node"}>
              <span className="label">PD</span>
              <span className="status">
            111
          </span>
            </div>


            <div className={"line"}>
              <div className={"node"}>
                <span className="label">TiDB</span>
                <span className="status">211</span>
              </div>


              <div className={"flex-column"}>
                <div className={"node metric active"}>
                  <span className="label">QPS</span>
                </div>

                <div className={"node metric"}>
                  <span className="label">TPS</span>
                </div>
              </div>

            </div>
          </div>


        </div>

      </div>

    </div>)
  }


};