"use client";
import React, { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { Search } from "lucide-react";
import Ticket from "../_components/Ticket";
import ticketService from "@/lib/api/ticket";

const page = () => {
  const [query, setQuery] = useState("");
  const [dataTickets, setDataTickets] = useState([]);

  const handleSearch = async () => {
    if (query) {
      const newData = await ticketService.lookUpTicket(query);
      setDataTickets(newData.data);
    } else {
      setDataTickets([]);
    }
  };
  return (
    <>
      <Header />
      <div
        className="w-full flex flex-col justify-center text-center 
    px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 my-[2rem]"
      >
        <div className="w-full md:w-auto flex  items-center rounded-full border-[1.5px] border-gray-300 px-2">
          <Search
            className={` ${
              query.trim() === "" ? "text-gray-300" : ""
            } cursor-pointer`}
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder="Search by Booking Refference..."
            className="w-[200px] p-2 bg-transparent outline-none flex-[1]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {dataTickets &&
          dataTickets.map((ticket, index) => (
            <Ticket key={index} data={ticket} handleCancel={handleSearch} />
          ))}
      </div>
    </>
  );
};

export default page;
