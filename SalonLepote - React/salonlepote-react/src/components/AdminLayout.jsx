import AdminSidebar from "./AdminSidebar";

//AdminLayout sadrzi elemente koji ce biti na svakoj admin stranici
export default function AdminLayout({ children }) {
  return (
    <div style={layoutStyles.container}>
      <AdminSidebar />
      <main style={layoutStyles.content}>{children}</main>
    </div>
  );
}

const layoutStyles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
    overflowY: "auto",
  },

};
