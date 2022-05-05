import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { utils } from "near-api-js";

const PaymentList = ({ payments }) => {
  return (
    <section className="payment-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 blog-roll-cards">
            <div className="row">
              <h2 style={{ marginBottom: "20px" }}>Payments</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Article</th>
                    <th>Payment Amount</th>
                    <th>Author</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/blog/${payment.post}`}>{payment.post}</Link>
                      </td>
                      <td>
                        {utils.format.formatNearAmount(payment.deposit)} NEAR
                      </td>
                      <td>{payment.postAuthor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentList;
