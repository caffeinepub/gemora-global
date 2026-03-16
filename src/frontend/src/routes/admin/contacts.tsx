import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAllCatalogueRequests,
  useGetAllInquiries,
  useMarkInquiryRead,
} from "@/hooks/useQueries";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminContacts() {
  const { data: inquiries, isLoading: inqLoading } = useGetAllInquiries();
  const { data: catalogueRequests, isLoading: catLoading } =
    useGetAllCatalogueRequests();
  const markRead = useMarkInquiryRead();

  const handleMarkRead = async (index: number) => {
    try {
      await markRead.mutateAsync(BigInt(index));
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="section-label mb-2">Manage</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Contacts
        </h1>
        <div className="gold-divider-left mt-4" />
      </div>

      <Tabs defaultValue="inquiries">
        <TabsList
          className="h-auto p-1 mb-8"
          style={{ backgroundColor: "var(--obsidian-mid)", borderRadius: 0 }}
        >
          <TabsTrigger
            data-ocid="contacts.tab"
            value="inquiries"
            className="text-xs tracking-widest uppercase px-6 py-2.5 data-[state=active]:text-black"
            style={{ borderRadius: 0, letterSpacing: "0.12em" }}
          >
            Inquiries{" "}
            {inquiries && inquiries.length > 0 && `(${inquiries.length})`}
          </TabsTrigger>
          <TabsTrigger
            data-ocid="contacts.tab"
            value="catalogue"
            className="text-xs tracking-widest uppercase px-6 py-2.5 data-[state=active]:text-black"
            style={{ borderRadius: 0, letterSpacing: "0.12em" }}
          >
            Catalogue Requests{" "}
            {catalogueRequests &&
              catalogueRequests.length > 0 &&
              `(${catalogueRequests.length})`}
          </TabsTrigger>
        </TabsList>

        {/* Inquiries tab */}
        <TabsContent value="inquiries">
          {inqLoading ? (
            <div data-ocid="contacts.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="h-12 mb-2"
                  style={{ backgroundColor: "oklch(0.18 0 0)" }}
                />
              ))}
            </div>
          ) : !inquiries || inquiries.length === 0 ? (
            <div
              className="text-center py-16 border"
              style={{
                borderColor: "oklch(0.22 0 0)",
                backgroundColor: "var(--obsidian-mid)",
              }}
              data-ocid="contacts.inquiries_empty_state"
            >
              <p className="text-sm text-foreground/40">No inquiries yet.</p>
            </div>
          ) : (
            <div
              className="border overflow-hidden"
              style={{
                borderColor: "oklch(0.22 0 0)",
                backgroundColor: "var(--obsidian-mid)",
              }}
              data-ocid="contacts.table"
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(0.22 0 0)" }}>
                    {[
                      "Name",
                      "Email",
                      "Company",
                      "Country",
                      "Type",
                      "Date",
                      "Status",
                      "",
                    ].map((h) => (
                      <TableHead
                        key={h}
                        className="text-xs tracking-widest uppercase"
                        style={{
                          color: "oklch(0.5 0 0)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inq, i) => (
                    <TableRow
                      key={`inq-${inq.email}-${String(inq.timestamp)}`}
                      data-ocid={`contacts.row.${i + 1}`}
                      style={{
                        borderColor: "oklch(0.2 0 0)",
                        backgroundColor: !inq.isRead
                          ? "oklch(0.14 0.01 78)"
                          : "transparent",
                      }}
                    >
                      <TableCell
                        className="text-sm"
                        style={{ color: "var(--gold-light)" }}
                      >
                        {inq.name}
                      </TableCell>
                      <TableCell className="text-xs text-foreground/60">
                        {inq.email}
                      </TableCell>
                      <TableCell className="text-xs text-foreground/50">
                        {inq.company || "—"}
                      </TableCell>
                      <TableCell className="text-xs text-foreground/50">
                        {inq.country}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: "oklch(0.18 0 0)",
                            color: "var(--gold)",
                            borderColor: "var(--gold)",
                            borderRadius: 0,
                            fontSize: "0.6rem",
                            letterSpacing: "0.1em",
                          }}
                          variant="outline"
                        >
                          {String(inq.inquiryType)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-foreground/40">
                        {formatDate(inq.timestamp)}
                      </TableCell>
                      <TableCell>
                        {!inq.isRead ? (
                          <span
                            className="text-xs px-2 py-0.5"
                            style={{
                              backgroundColor: "var(--gold)",
                              color: "var(--obsidian)",
                              fontSize: "0.6rem",
                              letterSpacing: "0.1em",
                            }}
                          >
                            UNREAD
                          </span>
                        ) : (
                          <span className="text-xs text-foreground/30">
                            Read
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {!inq.isRead && (
                          <Button
                            data-ocid={`contacts.secondary_button.${i + 1}`}
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkRead(i)}
                            disabled={markRead.isPending}
                            className="h-7 text-xs px-3"
                            style={{
                              borderColor: "oklch(0.3 0 0)",
                              color: "oklch(0.6 0 0)",
                              borderRadius: 0,
                            }}
                          >
                            <CheckCircle size={12} className="mr-1" /> Mark Read
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Catalogue Requests tab */}
        <TabsContent value="catalogue">
          {catLoading ? (
            <div data-ocid="contacts.loading_state">
              {[1, 2].map((i) => (
                <Skeleton
                  key={i}
                  className="h-12 mb-2"
                  style={{ backgroundColor: "oklch(0.18 0 0)" }}
                />
              ))}
            </div>
          ) : !catalogueRequests || catalogueRequests.length === 0 ? (
            <div
              className="text-center py-16 border"
              style={{
                borderColor: "oklch(0.22 0 0)",
                backgroundColor: "var(--obsidian-mid)",
              }}
              data-ocid="contacts.catalogue_empty_state"
            >
              <p className="text-sm text-foreground/40">
                No catalogue requests yet.
              </p>
            </div>
          ) : (
            <div
              className="border overflow-hidden"
              style={{
                borderColor: "oklch(0.22 0 0)",
                backgroundColor: "var(--obsidian-mid)",
              }}
              data-ocid="contacts.table"
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "oklch(0.22 0 0)" }}>
                    {["Name", "Email", "Date"].map((h) => (
                      <TableHead
                        key={h}
                        className="text-xs tracking-widest uppercase"
                        style={{
                          color: "oklch(0.5 0 0)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catalogueRequests.map((req, i) => (
                    <TableRow
                      key={`cat-${req.email}-${String(req.timestamp)}`}
                      data-ocid={`contacts.row.${i + 1}`}
                      style={{ borderColor: "oklch(0.2 0 0)" }}
                    >
                      <TableCell
                        className="text-sm"
                        style={{ color: "var(--gold-light)" }}
                      >
                        {req.name}
                      </TableCell>
                      <TableCell className="text-xs text-foreground/60">
                        {req.email}
                      </TableCell>
                      <TableCell className="text-xs text-foreground/40">
                        {formatDate(req.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
