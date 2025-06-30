import type { Route } from "./+types/home";
import Welcome  from "../welcome/welcome";
import DataTable from "components/data-table/data-table";
import type { Column } from "types/table.ts/table";
import { useUsersData } from "hooks/use-users-data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data-table" },
    { name: "data table", content: "Data table page" },
  ];
}

export default function Home() {
   const { users, loading, error } = useUsersData();
    const columns: Column[] = [
      { key: "firstName", label: "Name" },
      { key: "email", label: "Email" },
      { key: "company.name", label: "Company" },
      { key: "address.city", label: "City" },
      { key: "age", label: "Age" },
    ];
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
  return <DataTable data={users} columns={columns}  />;
}
