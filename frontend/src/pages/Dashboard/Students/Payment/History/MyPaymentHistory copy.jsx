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
  let totalPage = Math.ceil(totalItem / 5);
  let itemsPerPage = 5;
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
    axiosFetch
      .get(`/payment-history/${currentUser?.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const totalPaidAmount = payment.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-center mt-6 mb-16">
      <p className="text-gray-400">
        Hey,{" "}
        <span className="text-secondary font-bold">{currentUser.name}</span>{" "}
        Welcome...!
      </p>
      <h1 className="text-4xl font-bold">
        My Pay<span className="text-secondary">ent Hist</span>ory
      </h1>
      <p className="text-gray-500 text-sm my-3">
        You Can see your history here
      </p>

      {/*table here*/}
      <div>
        <p className="font-bold">Total Payments: {payment.length}</p>
        <p className="font-bold">Total Paid: ${totalPaidAmount}</p>
      </div>

      <div>
        <div>
          {paginatedPayments.map((payment, index) => {
            <tr>
              <td>{index + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">${payment.amount}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {payment.classesId.length}
              </td>
            </tr>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPaymentHistory;
