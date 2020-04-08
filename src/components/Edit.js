import React, { Component } from "react";
import firebase from "../Firebase";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      CompanyName: "",
      Address: "",
      ZipCode: "",
      Contact: "",
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection("company").doc(this.props.doc);
    ref.get().then((doc) => {
      if (doc.exists) {
        const comp = doc.data();
        this.setState({
          key: doc.id,
          CompanyName: comp.CompanyName,
          Address: comp.Address,
          ZipCode: comp.ZipCode,
          Contact: comp.Contact,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ comp: state });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { CompanyName, Address, ZipCode, Contact } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("company")
      .doc(this.state.key);
    updateRef
      .set({
        CompanyName,
        Address,
        ZipCode,
        Contact,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          CompanyName: "",
          Address: "",
          ZipCode: "",
          Contact: "",
        });
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div class="container">
        <Container>
          <div class="panel-heading">
            <h3 class="panel-title">EDIT</h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">CompanyName:</label>
                <TextField
                  type="text"
                  class="form-control"
                  name="CompanyName"
                  value={this.state.CompanyName}
                  onChange={this.onChange}
                  placeholder="CompanyName"
                />
              </div>
              <div class="form-group">
                <label for="description">Address:</label>
                <TextField
                  type="text"
                  class="form-control"
                  name="Address"
                  value={this.state.Address}
                  onChange={this.onChange}
                  placeholder="Address"
                />
              </div>
              <div class="form-group">
                <label for="author">ZipCode:</label>
                <TextField
                  type="text"
                  class="form-control"
                  name="ZipCode"
                  value={this.state.ZipCode}
                  onChange={this.onChange}
                  placeholder="ZipCode"
                />
              </div>
              <div class="form-group">
                <label for="author">Contact:</label>
                <TextField
                  type="text"
                  class="form-control"
                  name="Contact"
                  value={this.state.Contact}
                  onChange={this.onChange}
                  placeholder="Contact"
                />
              </div>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                class="btn btn-success"
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default Edit;
