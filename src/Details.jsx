import React, { Component, Fragment } from "react";
import { useParams, withRouter } from "react-router-dom";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeContext } from "./ThemeContext";
import { Modal } from "./Modal";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, showModal: false };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  async componentDidMount() {
    const { id } = this.props;
    const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
    const jsonDetails = await response.json();
    this.setState(Object.assign({ loading: false }, jsonDetails.pets[0]));
  }

  render() {
    console.log(this.state);
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;
    return (
      <Fragment>
        <Carousel images={images} />
        <div className="details">
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
            <ThemeContext.Consumer>
              {([theme]) => (
                <button
                  onClick={() => this.toggleModal()}
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>
            <p>{description}</p>
            {showModal && (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={() => this.adopt()}>Yes</button>
                    <button onClick={() => this.toggleModal()}>No</button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
