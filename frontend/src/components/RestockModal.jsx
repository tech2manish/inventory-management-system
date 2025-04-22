import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const RestockModal = ({ item, closeModal, refresh }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async () => {
    await fetch(
      `http://localhost:8080/api/inventory/restock/${item.id}?quantity=${quantity}&user=admin`,
      {
        method: "POST",
      }
    );
    refresh();
    closeModal();
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="!max-w-4xl p-6 bg-gray-200">
        <DialogHeader>
          <DialogTitle>Restock {item.name}</DialogTitle>
        </DialogHeader>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Restock</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RestockModal;
