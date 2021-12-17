import React from 'react';
import parse from 'html-react-parser';

// function makeElements(systems, connections) {
//   console.log(
//     'makeElements',
//     'systems',
//     systems.length,
//     'connections',
//     connections.length
//   );

//   console.log(connections);
//   var makeNode = (system) => ({
//     data: {
//       ...system,
//       id: system.slug,
//       label: system.title,
//     },
//   });

//   var makeEdge = (connection) => ({
//     classes: connection.classes,
//     data: {
//       weight: 1,
//       ...connection,
//       source: connection.source.slug,
//       target: connection.target.slug,
//     },
//   });

//   var nodes = [];
//   var edges = [];

//   // make the systems
//   for (var system of systems) {
//     var newNode = makeNode(system);
//     // console.log(newNode);
//     nodes.push(newNode);
//   }

//   for (var connection of connections) {
//     edges.push(makeEdge(connection));
//   }
//   return { nodes, edges };
// }

// https://a.4cdn.org/ck/thread/17130545.json

const Thread = ({ threadData }) => {
  var { posts } = threadData;

  const elements = [
    // { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    // { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
    // {
    //   data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' },
    // },
  ];

  var makeNode = (post) => ({
    data: {
      id: post.no,
      label: post.name,
    },
  });

  var makeEdge = (reply) => ({
    data: {
      weight: 1,
      source: reply.source,
      target: reply.target,
    },
  });

  var findReplies = (post) => {
    if (!post.com) return [];
    var postHTML = parse(post.com);
    if (typeof postHTML === 'string' || postHTML instanceof String) return [];

    var possibleReplies = postHTML.filter((e) => e.type == 'a');
    var replies = [];
    for (var ele of possibleReplies) {
      replies.push(ele.props?.href.replace('#p', ''));
    }

    return [...new Set(replies)].map((replyNo) =>
      makeEdge({
        source: post.no,
        target: replyNo,
      })
    );
  };

  var nodes = [];
  var edges = [];

  for (var post of posts) {
    nodes.push(makeNode(post));

    edges = [...edges, ...findReplies(post)];
  }

  return { nodes, edges };
};

const getThread = async ({ site, board, thread }) => {
  return await await fetch(
    `http://localhost:5000/${site}/${board}/thread/${thread}.json`
  ).then((r) => r.json());
};

export { Thread, getThread };
