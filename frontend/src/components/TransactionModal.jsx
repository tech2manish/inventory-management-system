import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

const TransactionModal = ({ open, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (open) fetchTransactions();
  }, [open]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/inventory/transactions"
      );
      if (response.status === 204) {
        setTransactions([]);
        setNoData(true);
      } else {
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
        setNoData(false);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterTransactions(e.target.value);
  };

  const filterTransactions = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filteredData = transactions.filter((txn) => {
      return (
        txn.itemName.toLowerCase().includes(lowercasedTerm) ||
        txn.type.toLowerCase().includes(lowercasedTerm) ||
        txn.performedBy.toLowerCase().includes(lowercasedTerm)
      );
    });
    setFilteredTransactions(filteredData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl p-6 bg-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Transaction History
          </DialogTitle>
        </DialogHeader>

        {/* Search Box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Item, Type, or User..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 w-full border border-gray-300 rounded-lg"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : noData ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <ScrollArea className="h-96">
            <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Item</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{txn.id}</td>
                    <td className="p-2">
                      {txn.itemName} (ID: {txn.itemId})
                    </td>
                    <td className="p-2">{txn.quantity}</td>
                    <td className="p-2 capitalize">{txn.type.toLowerCase()}</td>
                    <td className="p-2">{txn.performedBy}</td>
                    <td className="p-2">
                      {new Date(txn.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
