import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  render() {
    const { name, age, isActive } = this.props;

    return (
      <div>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      </div>
    );
  }
}

MyComponent.defaultProps = {
  name: "ABC",
}

// Define prop types using PropTypes (latest syntax)
MyComponent.propTypes = {
// name: PropTypes.string.isRequired,
  name: PropTypes.string,   // name must be a string and is required
  age: PropTypes.number.isRequired,   // age must be a number and is required
  isActive: PropTypes.bool            // isActive is a boolean, not required
};

export default MyComponent;
