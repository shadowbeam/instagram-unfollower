import React, { Component } from 'react';
import './social.less';

class Social extends React.Component {

	  constructor(props : ITodoItemProps){
    super(props);
    this.state = { editText: this.props.todo.title };
  }


	const social = ['github', 'linkedin'];

    return (
        <div className='social'>
		{social.map((number) =>
        <SocialItem key={number.toString()} value={number} />
      )}

        	
        </div>
    );
  }

function SocialItem(props) {

  return (
	<div className='icon'>
			<i className={`fa fa-${props.value}`} aria-hidden="true"></i>
	</div>
  );
}

export default Social;
