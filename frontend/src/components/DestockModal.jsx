import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";

const DestockModal = ({ item, closeModal, refresh }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async () => {
    await fetch(
      `http://localhost:8080/api/inventory/destock/${item.id}?quantity=${quantity}&user=admin`,
      {
        method: "POST",
      }
    );
    refresh();
    closeModal();
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="!max-w-3xl p-6 bg-gray-200">
        <DialogHeader>
          <DialogTitle>Destock {item.name}</DialogTitle>
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
          <Button onClick={handleSubmit}>Destock</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestockModal;
