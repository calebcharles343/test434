import { createContext, ReactNode, FC } from "react";

interface TableContextProps {
  columns: string;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

interface TableProps {
  columns: string;
  children: ReactNode;
}

const Table: FC<TableProps> & {
  Header: FC<{ children: ReactNode }>;
  Body: FC<BodyProps>;
  Row: FC<{ children: ReactNode }>;
  Footer: FC<{ children: ReactNode }>;
} = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border border-gray-200 text-sm  rounded-lg overflow-hidden"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

const Header: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      role="row"
      className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-6 p-4 bg-gray-100 border-b border-gray-200 uppercase tracking-wide font-semibold text-gray-600"
    >
      {children}
    </div>
  );
};

const Row: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      role="row"
      className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-6 p-3 border-b border-gray-200 last:border-none"
    >
      {children}
    </div>
  );
};

interface BodyProps {
  data: any[];
  render: (item: any) => ReactNode;
}

const Body: FC<BodyProps> = ({ data, render }) => {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <div>{data.map(render)}</div>;
};

const Footer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <footer className="bg-gray-100 flex justify-center p-3">{children}</footer>
  );
};

const Empty: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className="text-lg font-semibold text-center my-6">{children}</p>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
