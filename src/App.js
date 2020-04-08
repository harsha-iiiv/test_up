import React, { Component } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Edit from "./components/Edit";
import firebase from "./Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("company");
    this.unsubscribe = null;
    this.state = {
      company: [],
      open: false,
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const company = [];
    querySnapshot.forEach((doc) => {
      const { CompanyName, Address, ZipCode, Country, Contact } = doc.data();
      company.push({
        key: doc.id,
        doc, // DocumentSnapshot
        CompanyName,
        Address,
        ZipCode,
        Country,
        Contact,
      });
    });
    this.setState({
      company,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  delete(id) {
    firebase
      .firestore()
      .collection("company")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div class="container">
        <Container>
          <div class="panel-heading">
            <h3 class="panel-title">companies list</h3>
          </div>

          <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">CompanyName</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">ZipCode</TableCell>
                  <TableCell align="right">Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.company.map((row) => (
                  <TableRow key={row.key}>
                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose.bind(this)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <Edit doc={row.key} />
                    </Dialog>
                    <TableCell align="right">{row.CompanyName}</TableCell>
                    <TableCell align="right">{row.Address}</TableCell>
                    <TableCell align="right">{row.ZipCode}</TableCell>
                    <TableCell align="right">{row.Contact}</TableCell>

                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClickOpen.bind(this)}
                      >
                        {" "}
                        Edit{" "}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.delete.bind(this, row.key)}
                        class="btn btn-danger"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );
  }
}

export default App;
