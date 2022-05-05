import React, { useEffect } from "react";
import NotFoundSection from "../components/NotFoundSection";
import PaymentList from "../components/PaymentList";
import Spinner from "../components/Spinner";
import Layout from "../containers/Layout";
import { useFetch, useMenuItems } from "../utils/hooks";
import { getPayments } from "../utils/store";
import { toast } from "react-toastify";
import { NotificationError } from "../components/Notification";

const PaymentPage = () => {
  const { data, isLoading, error, fetch } = useFetch(getPayments);

  let menuItems = useMenuItems();

  useEffect(() => {
    let isUnmount = false;
    const loadData = async () => {
      try {
        await fetch();
        if (isUnmount) return;
      } catch (error) {
        toast(<NotificationError text="Operation unsuccessfull" />);
        console.log(error);
      }
    };

    loadData();

    return () => {
      console.log("fucking unmounted");
      isUnmount = true;
    };
  }, []);

  if (error) return <NotFoundSection />;
  if (isLoading) return <Spinner />;

  return (
    <Layout menuItems={menuItems}>
      {data && <PaymentList payments={data} />}
    </Layout>
  );
};

export default PaymentPage;
