import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export const Chats = () => {
  const userId = localStorage.getItem("userId");
  const [contacts, setContacts] = useState([]);
  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3003/user/${userId}/contacts`
      );
      setContacts(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, [userId]);

  return (
    <>
      <body className="bg-blue-900">
        <div className="text-white font-bold text-3xl font-serif text-center">Chats</div>
        {contacts.map((contact) => {
          return (
            <Link>
              <div className="place-items-center mt-10 w-70 h-15 flex bg-blue-950 text-white rounded cursor-pointer">
                <div className="ml-10 font-bold">{contact.username}</div>
              </div>
            </Link>
          );
        })}
      </body>
    </>
  );
};
