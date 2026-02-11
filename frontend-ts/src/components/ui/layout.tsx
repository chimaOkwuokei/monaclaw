import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      style={{ fontFamily: "Barlow" }}
    >
      <main>
        <Outlet />
      </main>
    </div>
  );
}
