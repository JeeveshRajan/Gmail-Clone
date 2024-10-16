import React, { useEffect, useState } from "react";
import Email from "./Email";
import useGetAllEmails from "../hooks/useGetAllEmails";
import { useSelector } from "react-redux";

const Emails = () => {
  useGetAllEmails();
  const { emails, searchText } = useSelector((store) => store.app);
  const [filterEmail, setFilterEmail] = useState(emails);

  useEffect(() => {
    const filteredEmail = emails.filter((emails) => {
      return (
        emails.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        emails.message.toLowerCase().includes(searchText.toLowerCase()) ||
        emails.to.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilterEmail(filteredEmail);
  }, [searchText, emails]);

  return (
    <div>
      {filterEmail && filterEmail.length > 0 ? (
        filterEmail.map((data) => (
          <Email key={data._id || data.to} emails={data} />
        ))
      ) : (
        <p>No emails available.</p>
      )}
    </div>
  );
};

export default Emails;
