import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: any;
  handleMarkerClick(college: any): void;
}

export default function SearchBar({ data, handleMarkerClick }: Props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(data);
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    //Filter college data for values that match the search
    const filteredData = data.filter((college: any) => {
      return college.name.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filteredData);
    setSearchResults(filteredData);
  };

  const handleSearchClick = (college: any) => {
    handleMarkerClick(college);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="flex absolute top-0 z-10 left-0 items-center space-x-2 mt-4 ml-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <div>
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
                  className="flex flex-col p-2 border-gray-100 hover:bg-gray-100 hover:rounded-md hover:cursor-pointer"
                  onClick={() => handleSearchClick(college)}
                >
                  <span className="text-gray-800">{college.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Button
        size="icon"
        className="dark:bg-black bg-white text-gray-500 dark:text-white hover:text-white"
      >
        <Settings />
      </Button>
    </div>
  );
}
