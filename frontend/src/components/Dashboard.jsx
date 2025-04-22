import { useEffect, useState } from "react";
import AddEditModal from "./AddEditModal";
import RestockModal from "./RestockModal";
import DestockModal from "./DestockModal";
import { Button } from "./ui/button";
import TransactionModal from "./TransactionModal";

const InventoryDashboard = ({ email }) => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionOpen, setTransactionOpen] = useState(false);

  const fetchData = async () => {
    try {
      const itemsResponse = await fetch(
        "http://localhost:8080/api/inventory/items"
      );
      const statsResponse = await fetch(
        "http://localhost:8080/api/inventory/dashboard"
      );
      const usernameResponse = await fetch(
        `http://localhost:8080/api/auth/username?email=${email}`
      );

      const itemsData = await itemsResponse.json();
      const statsData = await statsResponse.json();
      const usernameData = await usernameResponse.text();

      setItems(itemsData);
      setStats(statsData);
      setUserName(usernameData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    await fetch(`http://localhost:8080/api/inventory/item/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const openModal = (type, item = null) => {
    setSelectedItem(item);
    setModalType(type);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-600">
        Welcome, {userName} 👋
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Items", value: stats.totalItems },
          { label: "Total Quantity", value: stats.totalQuantity },
          { label: "Total Value", value: `₹${stats.totalValue}` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white shadow-md rounded-xl p-4 border-l-4 border-purple-500"
          >
            <p className="text-gray-600">{label}</p>
            <p className="text-xl font-bold text-purple-700">{value}</p>
          </div>
        ))}
      </div>

      {/* Header with Add and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Inventory Items</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 outline-purple-500 w-64"
          />
          <Button
            onClick={() => openModal("add")}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Add Item
          </Button>
          <Button
            onClick={() => setTransactionOpen(true)}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Transactions
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white text-left border border-gray-200 shadow-md rounded-xl">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              {["Name", "Price", "Quantity", "Actions"].map((header) => (
                <th key={header} className="p-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id} className="border-t hover:bg-purple-50">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3 space-x-2">
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => openModal("restock", item)}
                    >
                      Restock
                    </Button>
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => openModal("destock", item)}
                    >
                      Destock
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {modalType === "add" && (
        <AddEditModal
          item={null}
          closeModal={() => setModalType(null)}
          refresh={fetchData}
        />
      )}
      {modalType === "edit" && (
        <AddEditModal
          item={selectedItem}
          closeModal={() => setModalType(null)}
          refresh={fetchData}
        />
      )}
      {modalType === "restock" && (
        <RestockModal
          item={selectedItem}
          closeModal={() => setModalType(null)}
          refresh={fetchData}
        />
      )}
      {modalType === "destock" && (
        <DestockModal
          item={selectedItem}
          closeModal={() => setModalType(null)}
          refresh={fetchData}
        />
      )}
      {transactionOpen && (
        <TransactionModal
          open={transactionOpen}
          onClose={() => setTransactionOpen(false)}
        />
      )}
    </div>
  );
};

export default InventoryDashboard;
