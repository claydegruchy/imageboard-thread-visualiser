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

  var OP = posts.find((post) => post.resto == 0);

  const elements = [];

  var makeNode = (post) => {
    var classes = [];
    if (post == OP) classes.push('OP');
    if (post.filename) classes.push('hasImage');
    return {
      classes,
      data: {
        ...post,
        id: post.no,
        label: post.name,
      },
    };
  };

  var makeEdge = (reply, c) => ({
    classes: c,
    data: {
      weight: 1,
      ...reply,
    },
  });

  var indirectOpReply = (post) => {
    return [
      makeEdge(
        {
          source: post.no,
          target: OP.no,
        },
        ['noReply']
      ),
    ];
  };

  var findReplies = (post) => {
    var classes = [];
    // no comment or reply
    if (!post.com) return [];

    var postHTML = parse(post.com);

    // no replies to anyone
    if (typeof postHTML === 'string' || postHTML instanceof String)
      return indirectOpReply(post);

    if (!Array.isArray(postHTML)) postHTML = [postHTML];

    var possibleReplies = postHTML.filter((e) => e.type == 'a');

    if (possibleReplies.length < 1) return indirectOpReply(post);

    var replies = [];
    for (var ele of possibleReplies) {
      replies.push(ele.props?.href.replace('#p', ''));
    }

    return [...new Set(replies)].map((replyNo) =>
      makeEdge(
        {
          source: post.no,
          target: replyNo,
        },
        classes
      )
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
