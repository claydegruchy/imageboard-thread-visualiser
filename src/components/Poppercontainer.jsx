import React from 'react';
import parse from 'html-react-parser';
const Poppercontainer = ({ node, colours }) => {
  console.log(node.data());
  var { no, name, com, now, tim } = node.data();
  if (!com) return <div />;
  return (
    <div
      style={{
        backgroundColor: colours.reply,
        padding: 10,
        maxWidth: '35vw',
        pointerEvents: 'none',
      }}
    >
      {/*https://i.4cdn.org/[board]/[4chan image ID]s.jpg*/}
      {/*https://i.4cdn.org/ck/17130466s.jpg*/}

      {/*""*/}
      {tim ? <img src={`https://i.4cdn.org/ck/${tim}s.jpg`} /> : <div />}
      <div style={{ color: colours.name, fontWeight: 'bold' }}>{name}</div>
      <div style={{ fontFamily: 'arial,helvetica,sans-serif' }}>
        {/*<div dangerouslySetInnerHTML={{ __html: com }} />*/}
        {parse(com, {
          replace: (domNode) => {
            if (domNode?.attribs?.class == 'quote') {
              console.log('quote', domNode);
            }
          },
        })}
      </div>
    </div>
  );
};

export default Poppercontainer;
