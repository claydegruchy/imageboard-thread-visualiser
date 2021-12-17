import React from 'react';
import parse from 'html-react-parser';
const Poppercontainer = ({ node, colours }) => {
  var { no, name, com, now } = node.data();
  if (!com) return <div />;
  return (
    <div
      style={{
        backgroundColor: colours.reply,
        padding: 10,
        maxWidth: '35vw',
        'pointer-events': 'none',
      }}
    >
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
