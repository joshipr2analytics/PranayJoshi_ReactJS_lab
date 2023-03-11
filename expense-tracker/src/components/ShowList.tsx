import { useEffect, useState } from 'react'
import IDataList from '../model/IDataList'
import { getDataFromServer } from '../server/menu'
import ExpenseTracker from './ExpenseTracer';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'

function ShowData() {
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showform, setShowForm] = useState<boolean>(false);

    var rahulSpent1: number = 0;
    var rameshSpent1: number = 0;

    const Shares = (data: IDataList[]) => {
        data.map((sams) =>
            sams.payeeName === "Rahul"
                ? (rahulSpent1 = rahulSpent1 + sams.price)
                : (rameshSpent1 = rameshSpent1 + sams.price)
        );
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
        setSum(rahulSpent1 + rameshSpent1)
    };

    useEffect(() => {

        const fetchMenu = async () => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                Shares(data);
            } catch (error: any) {
                setError(error)
            }
        }
        fetchMenu();
    }, [showform])

    const success = () => {
        setShowForm(false);
    };
    const cancel = () => {
        setShowForm(false);
    };

    return (
        <>
            <>
                <h1 id='page-header'>Expense Tracker</h1>
                <button id="Add-Button" onClick={() => setShowForm(true)}>
                    Add
                </button>
                {showform && (
                    <div className="form">
                        <ExpenseTracker onTrue={success} onClose={cancel} />
                    </div>
                )}

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Product Purchase</td>
                            <td>Price</td>
                            <td>Payee Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{user.setDate}</td>
                                    <td>{user.product}</td>
                                    <td>{user.price}</td>
                                    <td>{user.payeeName}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </>

            <hr />
            <div className="use-inline">Total:</div>
            <span className="use-inline total">{sum}</span><br />
            <div className="use-inline">Rahul Paid:</div>
            <span className="use-inline total rahul">{rahulSpent}</span><br />
            <div className="use-inline">Ramesh Paid:</div>
            <span className="use-inline total ramesh">{rameshSpent}</span><br />
            <span className="use-inline payable">
                {rahulSpent > rameshSpent ? "Pay Rahul:" : "Pay Ramesh:"}
            </span>

            <span className="use-inline payable price">
                {Math.abs(rahulSpent - rameshSpent) / 2}
            </span>

            {error && <>{error?.message}</>}
        </>
    )
}

export default ShowData