import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
  const dispatch = useDispatch();
  const { emails } = useSelector((store) => store.app);
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/email/getallemail",
          {
            withCredentials: true,
          }
        );

        // Check if res.data.emails is an array; if not, convert it to an array
        const emails = Array.isArray(res.data.emails)
          ? res.data.emails
          : [res.data.emails];

        console.log(emails); // Should log an array now
        dispatch(setEmails(res.data.emails));
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmails();
  }, []);
};

export default useGetAllEmails;
