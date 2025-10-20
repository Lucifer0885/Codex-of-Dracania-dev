import { Gift, ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { IBonusCode } from "@interfaces/IBonusCode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BonusCodeEntry from "@components/BonusCodeEntry";

function BonusCodesHistory() {
  const navigate = useNavigate();
  const [bonusCodes, setBonusCodes] = useState<IBonusCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [sortBy, setSortBy] = useState<"startDate" | "endDate" | "name" | "id">("startDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchBonusCodes = async () => {
      setIsLoading(true);
      try {
        const response = await window.electron.getAllBonusCodes({
          page: currentPage,
          limit: itemsPerPage,
          sortBy,
          order: sortOrder,
        });
        setBonusCodes(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalItems(response.pagination.totalItems);
      } catch (error) {
        console.error("Error fetching bonus codes:", error);
        setBonusCodes([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBonusCodes();
  }, [currentPage, itemsPerPage, sortBy, sortOrder]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: "startDate" | "endDate" | "name" | "id") => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg gap-4 flex flex-col min-h-screen mt-20">
      {/* Header */}
      <div className="flex justify-between gap-4 items-center h-12">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/bonus-codes")} className="btn btn-circle btn-ghost hover:bg-base-300">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Gift className="h-8 w-8 text-primary" />
          <h1 className="text-4xl text-primary font-bold">Bonus Codes History</h1>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 bg-base-100 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Total: {totalItems} codes</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold w-21">Sort by:</label>
            <select
              className="select select-bordered select-sm"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as "startDate" | "endDate" | "name" | "id")}
            >
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
              <option value="name">Name</option>
              <option value="id">ID</option>
            </select>
          </div>

          <button onClick={toggleSortOrder} className="btn btn-outline btn-sm">
            {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold">Show:</label>
            <select
              className="select select-bordered select-sm"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : bonusCodes.length > 0 ? (
        <>
          <BonusCodeEntry bonusCodes={bonusCodes} />

          <div className="flex flex-wrap justify-between items-center gap-4 bg-base-100 p-4 rounded-lg">
            <div className="text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
              {totalItems} codes
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline"
                title="First Page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline"
                title="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) =>
                  typeof page === "number" ? (
                    <button
                      key={index}
                      onClick={() => goToPage(page)}
                      className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-outline"}`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={index} className="px-2">
                      {page}
                    </span>
                  )
                )}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline"
                title="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline"
                title="Last Page"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No bonus codes found.</p>
      )}
    </div>
  );
}

export default BonusCodesHistory;
