// var sizes = [...Array(5).keys()]
//   .filter((a) => !(a % 2))
//   .filter((a) => a > 2)
//   .map((a, i, v) => );

var fontSize = 12;

var sizes = [
  {
    selector: `node[[degree>1]]`,
    style: {
      'font-size': fontSize * 1.2,
    },
  },
  {
    selector: `node[[degree>2]]`,
    style: {
      'font-size': fontSize * 1.4,
    },
  },

  {
    selector: `node[[degree>4]]`,
    style: {
      'font-size': fontSize * 3,
    },
  },

  {
    selector: `node[[degree>8]]`,
    style: {
      'font-size': fontSize * 6,
    },
  },
];

var colours = {
  background: 'rgb(239, 242, 254)',
  reply: 'rgb(215,  218, 238)',
  name: 'rgb(54,  117, 72)',
  subject: 'rgb(28, 24,  98)',
  quote: 'rgb(131, 155, 65)',

    
};

const Chartstyle = [
  {
    selector: 'node',
    style: {
      'background-color': colours.reply,
      width: 'label',
      height: 'label',
      padding: '6px',
      shape: 'round-rectangle',
      // 'border-color': 'green',
      'border-width': '1',
    },
  },

  {
    selector: 'node[label]',
    style: {
      label: 'data(label)',
      'font-size': fontSize,
      color: colours.name,
      'text-halign': 'center',
      'text-valign': 'center',
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'unbundled-bezier',
      // 'control-point-step-size': 0,
      // 'text-rotation': 'autorotate',
      'arrow-scale': 0.5,
      width: 2,
    },
  },
  {
    selector: 'edge[name]',
    style: {
      'font-size': fontSize,

      'text-background-color': 'white',
      'text-background-opacity': 1,
      'text-background-padding': '2px',

      'text-border-color': 'black',
      'text-border-style': 'solid',
      'text-border-width': 0.5,
      'text-border-opacity': 1,

      'text-rotation': 'autorotate',
    },
  },
  {
    selector: 'node[weight]',
    style: {
      'font-size': 'data(weight)',
    },
  },

  ...sizes,
  {
    selector: 'edge',
    style: {
      width: '3',
      // width: "data(weight)",
      'line-style': 'solid',
    },
  },

  {
    selector: 'edge.noReply',
    style: {
      width: '2',
      // width: "data(weight)",
      'line-style': 'dotted',
      'line-dash-offset': 24,
      'line-dash-pattern': [6, 3],
    },
  },
  {
    selector: '.managed',
    style: {
      'font-size': '12',
      'text-background-color': 'lightgrey',
      'line-style': 'solid',

      // "text-rotation": "autorotate"
    },
  },

  {
    selector: 'node:selected',
    style: {
      'border-color': 'red',
      'border-width': '5',
    },
  },

  {
    selector: '.neighbor-selected.successor',
    style: {
      'border-color': 'blue',
      'border-width': '2',

      // 'background-color': 'green',
      'line-color': 'blue',
    },
  },

  {
    selector: '.neighbor-selected.incoming',
    style: {
      'border-color': 'green',
      'border-width': '3',

      // 'background-color': 'green',
      'line-color': 'green',
    },
  },

  {
    selector: '.neighbor-selected.outgoing',
    style: {
      'border-color': 'orange',
      'border-width': '3',

      // 'background-color': 'orange',
      'line-color': 'orange',
    },
  },

  {
    selector: 'edge.neighbor-selected.highlight',
    style: {
      label: 'data(name)',
      'control-point-step-size': 30,
    },
  },
  {
    selector: 'edge.neighbor-selected.highlight',
    style: {
      label: 'data(name)',
      'control-point-step-size': 30,
    },
  },

  {
    selector: 'node.highlight',
    style: {
      'border-color': 'red',
      'border-width': '3',

      // 'border-style': 'dotted',
    },
  },

  {
    selector: 'edge.highlight',
    style: {
      width: 2.5,
      'target-arrow-shape': 'triangle',
      'arrow-scale': 1,
    },
  },

  {
    selector: 'edge.hover.highlight',
    style: {
      width: 2.5,
    },
  },

  {
    selector: 'node.OP',
    style: {
      'font-weight': 'bold',
    },
  },
];

export { Chartstyle, colours };
