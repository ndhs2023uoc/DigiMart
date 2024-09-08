import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import useAxioxSecure from "../../../../../hooks/useAxiosSecure";
import useUser from "../../../../../hooks/useUser";

const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxioxSecure();
  const { currentUser } = useUser();
  const [payment, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payment.length;
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPage = Math.ceil(totalItem / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payment.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payment]);

  useEffect(() => {
    if (currentUser?.email) {
      axiosFetch
        .get(`/payment-history/${currentUser.email}`)
        .then((res) => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser?.email, axiosFetch]);

  const totalPaidAmount = payment.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-center mt-6 mb-16">
      <p className="text-gray-400">
        Hey,{" "}
        <span className="text-secondary font-bold">
          {currentUser ? currentUser.name : "User"}
        </span>{" "}
        Welcome...!
      </p>
      <h1 className="text-4xl font-bold">
        My Pay<span className="text-secondary">ent Hist</span>ory
      </h1>
      <p className="text-gray-500 text-sm my-3">
        You can see your history here
      </p>

      {/* table here */}
      <div>
        <p className="font-bold">Total Payments: {payment.length}</p>
        <p className="font-bold">Total Paid: ${totalPaidAmount}</p>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Classes</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((payment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  ${payment.amount}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {payment.classesId.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPaymentHistory;
