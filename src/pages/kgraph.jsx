import G6 from '@antv/g6';
import React from "react";


const data = {
  "nodes": [{
    "id": "a",
    "label": "mem",
  }, {
    "id": "b",
    "label": "io",
  }, {
    "id": "c",
    "label": "net",
  }, {
    "id": "d",
    "label": "cpu",
  }, {
    "id": "x",
    "type": "problem",
    "label": "Instance CPU Intensive Workload "
  }, {
    "id": "y",
    "type": "problem",
    "label": "Host I/O Bottleneck"
  }, {
    "id": "z",
    "type": "problem",
    "label": "Host CPU Bottleneck"
  }],
  "edges": [{
    "source": "a",
    "target": "x",
    "value": 1
  }, {
    "source": "b",
    "target": "y",
    "value": 1
  }, {
    "source": "b",
    "target": "x",
    "value": 1
  }, {
    "source": "b",
    "target": "z",
    "value": 1
  }, {
    "source": "c",
    "target": "y",
    "value": 1
  }, {
    "source": "c",
    "target": "z",
    "value": 1
  }, {
    "source": "d",
    "target": "y",
    "value": 1
  }, {
    "source": "d",
    "target": "z",
    "value": 1
  }]
};

const fn = () => {
  const graph = new G6.Graph({
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
    },
    "container": document.getElementById('kg'),
    "width": 1000,
    "height": 600,
    "fitView": true,
    "fitViewPadding": [
      16,
      16,
      16,
      16
    ],
    "layout": {
      "type": "fruchterman",
      "center": [
        690,
        360
      ]
    },
    "defaultNode": {
      "type": "circle",
      "size": 20,
      "labelCfg": {
        "position": "center",
        "style": {
          "textAlign": "center",
          "fontStyle": "normal",
          "fill": "rgb(70, 70, 70)"
        }
      },
      "style": {
        "cursor": "default",
        "fill": "rgb(239, 244, 255)",
        "stroke": "rgb(95, 149, 255)"
      },
      "icon": {
        "width": "",
        "height": ""
      },
      "linkPoints": {
        "fill": "rgb(239, 244, 255)"
      }
    },
    "defaultEdge": {
      "type": "line",
      "style": {
        "stroke": "rgb(211, 211, 211)",
        "cursor": "default"
      },
      "labelCfg": {
        "position": "middle",
        "style": {
          "textAlign": "center",
          "textBaseline": "middle",
          "fontStyle": "normal"
        }
      }
    },
  });
  graph.on('node:click', (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState('node', 'click');
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, 'click', false);
    });
    const nodeItem = e.item; // 获取被点击的节点元素对象
    graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
  });
  graph.node((node) => {
    const {
      labelCfg = {}, icon = {}, linkPoints = {}, style = {}
    } = node;


    return {
      ...node,
      type: node.type==="problem"? "rect":"circle",
      label: node.label,
    }
  })
  graph.edge((edge) => {
    const {
      loopCfg = {}, style = {},
    } = edge;
    return {
      ...edge,
    }
  })
  // 读取数据
  graph.data(data);
  // 渲染图
  graph.render();
}

class KGraph extends React.Component {

  componentDidMount() {

    setTimeout(() => {
      fn()
    }, 0)
  }

  render() {
    return <div id={"kg"}/>
  }
}

export default KGraph;