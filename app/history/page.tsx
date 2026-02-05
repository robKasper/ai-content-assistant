"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FiCopy, FiTrash2, FiEye, FiSearch, FiArrowLeft } from "react-icons/fi";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

interface Generation {
  id: string;
  topic: string;
  keyword: string;
  output: string;
  created_at: string;
}

export default function HistoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Generation | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("generations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setGenerations(data);
      }
      setLoading(false);
    };
    loadData();
  }, [router, supabase]);

  const filteredGenerations = useMemo(() => {
    if (searchQuery.trim() === "") {
      return generations;
    }
    const query = searchQuery.toLowerCase();
    return generations.filter(
      (g) =>
        g.topic.toLowerCase().includes(query) ||
        g.keyword.toLowerCase().includes(query)
    );
  }, [searchQuery, generations]);

  const handleCopy = (output: string) => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  const handleDelete = async (generation: Generation) => {
    const { error } = await supabase
      .from("generations")
      .delete()
      .eq("id", generation.id);

    if (!error) {
      setGenerations((prev) => prev.filter((g) => g.id !== generation.id));
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateOutput = (output: string, maxLength = 100) => {
    if (output.length <= maxLength) return output;
    return output.slice(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <FiArrowLeft className="sm:mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold">History</h1>
            </div>
            <Badge variant="outline" className="text-sm sm:text-base px-2 sm:px-3 py-1 w-fit">
              {generations.length} generations
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results */}
        {filteredGenerations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              {generations.length === 0
                ? "No generations yet. Create your first outline!"
                : "No results match your search."}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredGenerations.map((generation) => (
              <Card key={generation.id}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base sm:text-lg truncate">
                          {generation.topic}
                        </h3>
                        <Badge variant="outline" className="text-xs sm:text-sm">{generation.keyword}</Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">
                        {formatDate(generation.created_at)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 font-mono hidden sm:block">
                        {truncateOutput(generation.output)}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedGeneration(generation)}
                      >
                        <FiEye className="sm:mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(generation.output)}
                      >
                        <FiCopy className="sm:mr-1" />
                        <span className="hidden sm:inline">Copy</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteConfirm(generation)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* View Dialog */}
      <Dialog
        open={!!selectedGeneration}
        onOpenChange={() => setSelectedGeneration(null)}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">{selectedGeneration?.topic}</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Keyword: {selectedGeneration?.keyword} •{" "}
              {selectedGeneration && formatDate(selectedGeneration.created_at)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <Textarea
              value={selectedGeneration?.output || ""}
              readOnly
              className="min-h-[250px] sm:min-h-[400px] font-mono text-xs sm:text-sm"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                selectedGeneration && handleCopy(selectedGeneration.output)
              }
              className="w-full sm:w-auto"
            >
              <FiCopy className="mr-2" />
              Copy to Clipboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Generation?</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to delete the outline for &quot;{deleteConfirm?.topic}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 flex-col sm:flex-row">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="w-full sm:w-auto"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
