import React, {useState} from 'react';
import './App.css';
import {StatisticCard} from '@ant-design/pro-card';
import {Layout, Tabs, Breadcrumb, PageHeader, Button, Divider, Tag} from 'antd';
import Summary from "./pages/Summery";
import Data from "./pages/Data";
import KnowledgeGraph from "./pages/knowledgeGraph";
import {Intelligence} from "./pages/intelligence";

const {Header, Content, Footer, Sider} = Layout;
const {TabPane} = Tabs;

function App() {
  let responsive = false
  const [tabId, setTabId] = useState("1");
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0, height: "inherit"}}>
          <PageHeader
            className="site-page-header"
            title="2022-01-04 14:27 集群 A IO 异常，请求缓慢"
            subTitle="This is a subtitle"
            extra={[
              <Button key="3">Download</Button>,
              <Button key="2">Comment</Button>,
              <Button key="1" type="primary">
                Share
              </Button>,
            ]}
            footer={
              <Tabs defaultActiveKey="1" onChange={setTabId} activeKey={tabId}>
                <TabPane tab="Overview" key="1"/>
                <TabPane tab="Anomaly Extraction" key="2"/>
                <TabPane tab="Dependency intelligence" key="4"/>
                <TabPane tab="knowledge graph" key="3"/>
              </Tabs>
            }
          >
            <Tag color="yellow">level:S2</Tag>

            <Tag color="magenta">status:In Progress</Tag>
            <Tag color="geekblue">analysis:Finished</Tag>
          </PageHeader>


        </Header>

        <Content style={{margin: '0 16px'}}>

            {tabId==="1" && <Summary/>}
            {tabId==="2" && <Data/>}
            {tabId==="3" && <KnowledgeGraph/>}
          {tabId==="4" && <Intelligence/>}

        </Content>
        <Footer style={{textAlign: 'center'}}>Collie Playbook©2021 Created by Collie</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
