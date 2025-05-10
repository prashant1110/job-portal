import { useEffect, useRef, useState } from "react";
import { getJobs } from "../api/jobApi";
import useFetch from "../hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader, MoonLoader } from "react-spinners";
import JobCard from "../components/JobCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { State } from "country-state-city";
import { getCompanies } from "../api/companyApi";

const JobListing = () => {
  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const inputRef = useRef(null);

  const {
    data,
    loading,
    fn: fnJobs,
  } = useFetch(getJobs, {
    searchQuery,
    location,
    company_id,
  });

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center">
        <MoonLoader className="mb-4" width={"100%"} color="#36d7b7" />
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
          ref={inputRef}
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="flex-1 w-full">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="flex-1 w-full">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="flex-1" variant="destructive" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {loading && <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />}

      {loading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.length ? (
            data?.map((job) => {
              return (
                <JobCard
                  job={job}
                  savedInit={job?.saved?.length > 0}
                  key={job.id}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
