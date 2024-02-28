import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserDetailsScreen() {
  const [request, setRequest] = useState<any>({});
  const params = useParams();

  const getRequestForApprovals = () => {
    const token = localStorage.getItem("auth_token");

    axios
      .get(
        `http://localhost:3000/api/fetch-request-for-approval/${params?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (params?.id) {
      getRequestForApprovals();
    }
  }, [params?.id]);

  return <div>{request?.data && <UserDetails data={request?.data} />}</div>;
}
