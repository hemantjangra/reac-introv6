import React, { Component } from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleImageClick = (e) => {
    this.setState({ active: +e.target.dataset.index });
  };

  render() {
    return (
      <div className="carousel">
        <img src={this.props.images[this.state.active]} alt="animal" />
        <div className="carousel-smaller">
          {this.props.images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === this.state.active ? "active" : ""}
              alt="animal thumbnail"
              onClick={(e) => this.handleImageClick(e)}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
