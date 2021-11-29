import React from "react";

interface AsideProps {
  children: React.ReactNode;
}

const Aside: React.FunctionComponent<AsideProps> = ({ children }) => {
  return <aside className="col col--2-lg col--1-md">{children}</aside>;
};

export default Aside;
