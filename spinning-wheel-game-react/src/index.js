import React from 'react';



export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  weighted_random(items, weights) {
      var i;

      for (i = 0; i < weights.length; i++)
          weights[i] += weights[i - 1] || 0;

      var random = Math.random() * weights[weights.length - 1];

      for (i = 0; i < weights.length; i++)
          if (weights[i] > random)
              break;

      return i;
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = this.weighted_random(this.props.items, [40, 30, 15, 10, 5])
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({selectedItem });
      setTimeout(() => {
        this.props.handleResult(this.state.selectedItem)
      }, 4500);
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 50);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
          {items.map((item, index) => (
            <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
