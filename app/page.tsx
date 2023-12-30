import { MantineProvider } from "@mantine/core";
import ProjectTable from "./component/ProjectTable";
import { TableSort } from "./component/TableSort";

export default function Home() {
  return (
    <main className="">
      <MantineProvider>
        <TableSort />
      </MantineProvider>
    </main>
  );
}
