import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Settings, XIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { data } from '../app/data/colleges';

interface Props {
  schoolData: any;
  handleMarkerClick(college: any): void;
  handleFilterChange(filter: { conference?: string; state?: string }): void;
}

export default function SearchBar({
  schoolData,
  handleMarkerClick,
  handleFilterChange,
}: Props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    //Filter college data for values that match the search
    const filteredData = schoolData.filter((college: any) => {
      return college.name.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(filteredData);
  };

  const handleSearchClick = (college: any) => {
    handleMarkerClick(college);
    setSearchTerm('');
    setSearchResults([]);
  };

  const filterClick = (value: string) => {
    //TODO: Fix this to work with both filters, only works with conference
    handleFilterChange({ conference: value, state: 'all' });
  };

  return (
    <div className="flex absolute top-0 z-10 left-0 items-center space-x-2 mt-4 ml-4">
      <div>
        <Search className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          className="px-3 py-2 w-80 pl-12 pr-4"
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {searchResults.length > 0 && searchTerm !== '' && (
          <div className="absolute z-10 w-80 bg-white rounded-md shadow-lg">
            {searchResults.map((college: any) => {
              return (
                <div
                  key={college.id}
                  className="flex flex-row p-2 border-gray-100 hover:bg-gray-100 hover:rounded-md hover:cursor-pointer"
                  onClick={() => handleSearchClick(college)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-800">{college.name} </span>
                    <Image
                      src={college.logo}
                      width={30}
                      height={30}
                      alt={`${college.name} Logo`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Button
        size="icon"
        className="dark:bg-black bg-white text-gray-500 dark:text-white hover:text-white"
        onClick={() => setShowFilters(!showFilters)}
      >
        {!showFilters ? <Settings /> : <XIcon />}
      </Button>
      {showFilters && (
        <>
          <Select onValueChange={filterClick}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Conference" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All Conferences</SelectItem>
              {/* Filter Duplicate Conferences and order alphabetically */}
              {data
                .filter(
                  (college: any, index: number, self: any) =>
                    index ===
                    self.findIndex(
                      (c: any) => c.conference === college.conference
                    )
                )
                .sort((a: any, b: any) =>
                  a.conference > b.conference ? 1 : -1
                )
                .map((college: any) => {
                  return (
                    <SelectItem key={college.id} value={college.conference}>
                      {college.conference}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          {/* <Select onValueChange={filterClick}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All States</SelectItem>
              {data
                .filter(
                  (college: any, index: number, self: any) =>
                    index ===
                    self.findIndex(
                      (c: any) => c.location.state === college.location.state
                    )
                )
                .sort((a: any, b: any) =>
                  a.location.state > b.location.state ? 1 : -1
                )
                .map((college: any) => {
                  return (
                    <SelectItem key={college.id} value={college.location.state}>
                      {college.location.state}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select> */}
        </>
      )}
    </div>
  );
}
