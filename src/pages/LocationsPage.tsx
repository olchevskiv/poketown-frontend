import { useSearchRestaurants } from "@/api/RestaurantAPI";
import Loader from "@/components/Loader";
import PaginationMenu from "@/components/PaginationMenu";
import RestaurantCard from "@/components/RestaurantCard";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { SearchState } from "@/types";
import { useState } from "react";

const LocationsPage = () => {
    
    // default search is empty, returns all restaurant records
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        sortOption: "bestMatch",
    });

    // Send search request for restaurant
    const { results, isLoading } = useSearchRestaurants(searchState);

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
          ...prevState,
          page,
        }));
      };
    
    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col gap-y-3">
            <div>
                <SearchBar
                searchQuery={searchState.searchQuery}
                onSubmit={setSearchQuery}
                placeHolder="Search by city, zip or state"
                onReset={resetSearch}
                />
            </div>
            <div className="flex justify-between flex-col gap-3 lg:flex-row">

            </div>

            { !results?.data ? (
                <span className="text-lg h-[700px]">No results found</span>
            ) : (
                results.data.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))
            )}
             { results ? (
                <PaginationMenu page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            ) : (<></>)}
        </div>
    );
}

export default LocationsPage;