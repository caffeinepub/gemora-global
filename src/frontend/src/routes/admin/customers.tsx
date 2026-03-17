import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, MessageCircle, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const initialCustomers = [
  {
    id: 1,
    name: "Ahmed Al Rashid",
    country: "🇦🇪 UAE",
    email: "ahmed@mail.com",
    whatsapp: "+971501234567",
    businessType: "Wholesale Distributor",
    lead: "hot",
  },
  {
    id: 2,
    name: "Marie Dubois",
    country: "🇫🇷 France",
    email: "marie@mail.com",
    whatsapp: "+33612345678",
    businessType: "Boutique Owner",
    lead: "hot",
  },
  {
    id: 3,
    name: "John Smith",
    country: "🇺🇸 USA",
    email: "john@mail.com",
    whatsapp: "+12125551234",
    businessType: "Importer",
    lead: "cold",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    country: "🇫🇷 France",
    email: "sophie@mail.com",
    whatsapp: "+33698765432",
    businessType: "Retailer",
    lead: "cold",
  },
  {
    id: 5,
    name: "Carlos Rivera",
    country: "🇪🇸 Spain",
    email: "carlos@mail.com",
    whatsapp: "+34612345678",
    businessType: "Distributor",
    lead: "hot",
  },
];

const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");

  const toggleLead = (id: number) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, lead: c.lead === "hot" ? "cold" : "hot" } : c,
      ),
    );
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.businessType.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-label mb-1">B2B Management</p>
          <h1
            className="font-serif text-3xl"
            style={{ color: "var(--gold)", fontWeight: 300 }}
          >
            Customers & Buyers
          </h1>
        </div>
        <Button
          variant="outline"
          className="text-xs gap-1.5 border-gray-200 text-gray-700"
        >
          <Download size={13} /> Export
        </Button>
      </div>

      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              data-ocid="customers.search_input"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        <Table data-ocid="customers.table">
          <TableHeader>
            <TableRow className="border-gray-100 hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Name
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Country
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Email
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                WhatsApp
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Business Type
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Lead Status
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c, i) => (
              <TableRow
                key={c.id}
                data-ocid={`customers.item.${i + 1}`}
                className="border-gray-50 hover:bg-gray-50/50"
              >
                <TableCell className="text-sm font-medium text-gray-800">
                  {c.name}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {c.country}
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  {c.email}
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  {c.whatsapp}
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  {c.businessType}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    data-ocid={`customers.toggle.${i + 1}`}
                    onClick={() => toggleLead(c.id)}
                    className="cursor-pointer"
                  >
                    {c.lead === "hot" ? (
                      <Badge
                        style={{
                          backgroundColor: "#C6A55C18",
                          color: "#C6A55C",
                          border: "1px solid #C6A55C40",
                        }}
                        className="text-xs"
                      >
                        Hot Lead 🔥
                      </Badge>
                    ) : (
                      <Badge
                        style={{
                          backgroundColor: "#dbeafe",
                          color: "#1d4ed8",
                          border: "none",
                        }}
                        className="text-xs"
                      >
                        Cold Lead ❄️
                      </Badge>
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 hover:text-green-600 text-gray-400"
                    >
                      <MessageCircle size={13} />
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
