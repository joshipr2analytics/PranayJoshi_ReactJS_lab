import { ChangeEvent, Component, FormEvent } from "react";
import { pushDataToServer } from "../server/menu";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Props = {
  onTrue: any;
  onClose: any;
};

type State = {
  payeeName: string;
  product: string;
  price: number;
  setDate: string;
};

class ExpenseTracker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      payeeName: "",
      product: "",
      price: 0,
      setDate: this.setDefaultDate(),
    };

    this.setpayee = this.setpayee.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.loggedDate = this.loggedDate.bind(this);
  }

  setDefaultDate = () => {
    const today = new Date();
    return (
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2)
    );
  };

  setpayee = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      payeeName: event.target.value,
    });
  };

  setProduct = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      product: event.target.value,
    });
  };

  setPrice = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      price: parseInt(event.target.value),
    });
  };

  loggedDate = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    // console.log(typeof (e.target.value))

    this.setState({
      setDate: e.target.value,
    });
  };

  submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    // console.log(this.state)
    const finalDate = {
      ...this.state,
    };
    const data = await pushDataToServer(finalDate);
    console.log(data);
    this.props.onTrue();
  };

  el = document.createElement("div");

  render() {
    const element = (
      <>
        <section>
          <header style={{ backgroundColor: "whitesmoke" }}>
            <h1>Add New Item</h1>
            <p >
              Read the below instructions before proceeding: <br />
              Make sure you fill all the fields
            </p>
          </header>
          <Form style={{ backgroundColor: "whitesmoke", padding: '10px' }} onSubmit={this.submitHandler}>
            <Form.Group className="mb-3" style={{ margin: "5px" }} >
              <Form.Label>Name</Form.Label>
              <Form.Select name="Name" required value={this.state.payeeName} onChange={this.setpayee}>
                <option value="" defaultChecked> Choose </option>
                <option value="Rahul">Rahul</option>
                <option value="Ramesh">Ramesh</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" style={{ margin: "5px" }}>
              <Form.Label>Product Purchased</Form.Label>
              <Form.Control type="text" placeholder="Product Purchased" required
                value={this.state.product} onChange={this.setProduct} />
            </Form.Group>

            <Form.Group className="mb-3" style={{ margin: "5px" }}>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price" required
                value={this.state.price} onChange={this.setPrice} />
            </Form.Group>

            <Form.Group className="mb-3" style={{ margin: "5px" }}>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Date" required
                value={this.state.setDate} onChange={this.loggedDate} />
            </Form.Group>

            <Button variant="success" type="submit" style={{ marginLeft: '10px' }}> Submit </Button>
            <Button variant="primary" type="submit" style={{ marginLeft: '10px' }} onClick={this.props.onClose} > Close </Button>
          </Form>
        </section>
      </>
    );

    return element;
  }
}
export default ExpenseTracker;