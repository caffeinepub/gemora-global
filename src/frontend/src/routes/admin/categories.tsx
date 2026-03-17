import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const COLORS = [
  "#C6A55C",
  "#5C9EC6",
  "#9EC65C",
  "#C65C9E",
  "#5CC6A5",
  "#C6935C",
];

const initialCategories = [
  { id: 1, name: "Necklaces", count: 12 },
  { id: 2, name: "Earrings", count: 8 },
  { id: 3, name: "Bracelets", count: 6 },
  { id: 4, name: "Rings", count: 5 },
  { id: 5, name: "Bridal", count: 4 },
  { id: 6, name: "Minimal", count: 9 },
];

const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name: newName.trim(), count: 0 },
    ]);
    setNewName("");
    toast.success(`Category "${newName.trim()}" added`);
  };

  const handleDelete = (id: number, name: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success(`Category "${name}" deleted`);
  };

  const handleEditSave = (id: number) => {
    if (!editName.trim()) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: editName.trim() } : c)),
    );
    setEditId(null);
    setEditName("");
    toast.success("Category updated");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="section-label mb-1">Manage</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Categories
        </h1>
      </div>

      {/* Add Category */}
      <motion.div
        className={`${CARD} p-5`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="font-serif text-base font-medium text-gray-800 mb-3">
          Add New Category
        </h2>
        <div className="flex gap-3">
          <Input
            data-ocid="categories.input"
            placeholder="e.g. Anklets, Bangles..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#C6A55C] flex-1"
          />
          <Button
            data-ocid="categories.add_button"
            onClick={handleAdd}
            className="flex items-center gap-2 text-xs"
            style={{ backgroundColor: "#C6A55C", color: "#fff" }}
          >
            <Plus size={14} /> Add Category
          </Button>
        </div>
      </motion.div>

      {/* Category List */}
      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-serif text-base font-medium text-gray-800">
            All Categories
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {categories.length} categories
          </p>
        </div>
        <ul className="divide-y divide-gray-50">
          {categories.map((cat, i) => (
            <motion.li
              key={cat.id}
              data-ocid={`categories.item.${i + 1}`}
              className="flex items-center gap-4 px-5 py-3.5"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {editId === cat.id ? (
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEditSave(cat.id)}
                  className="flex-1 h-7 text-sm bg-gray-50 border-gray-300"
                  autoFocus
                />
              ) : (
                <span className="flex-1 text-sm font-medium text-gray-800">
                  {cat.name}
                </span>
              )}
              <span className="text-xs text-gray-400 min-w-[60px] text-right">
                {cat.count} products
              </span>
              <div className="flex items-center gap-1">
                {editId === cat.id ? (
                  <Button
                    size="sm"
                    data-ocid={`categories.save_button.${i + 1}`}
                    onClick={() => handleEditSave(cat.id)}
                    className="h-7 px-3 text-xs"
                    style={{ backgroundColor: "#C6A55C", color: "#fff" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    data-ocid={`categories.edit_button.${i + 1}`}
                    onClick={() => {
                      setEditId(cat.id);
                      setEditName(cat.name);
                    }}
                    className="h-7 w-7 p-0 text-gray-400 hover:text-[#C6A55C]"
                  >
                    <Edit2 size={12} />
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      data-ocid={`categories.delete_button.${i + 1}`}
                      className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={12} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-gray-800">
                        Delete Category
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-500">
                        Are you sure you want to delete "{cat.name}"? This
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        data-ocid="categories.cancel_button"
                        className="text-gray-700"
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        data-ocid="categories.confirm_button"
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
