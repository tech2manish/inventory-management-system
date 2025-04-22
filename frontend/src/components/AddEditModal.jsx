import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";

const AddEditModal = ({ item, closeModal, refresh }) => {
  const [formData, setFormData] = useState({
    name: item ? item.name : "",
    price: item ? item.price : "",
    quantity: item ? item.quantity : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = item
      ? `http://localhost:8080/api/inventory/update/${item.id}`
      : "http://localhost:8080/api/inventory/add";
    const method = item ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    refresh();
    closeModal();
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="!max-w-3xl p-6 bg-gray-200">
        <DialogHeader>
          <DialogTitle>{item ? "Edit" : "Add"} Item</DialogTitle>
        </DialogHeader>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-2"
        />
        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="mb-2"
        />
        <Input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{item ? "Update" : "Add"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditModal;
