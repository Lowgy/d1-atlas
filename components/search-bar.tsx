import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Settings } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: any;
  handleMarkerClick(college: any): void;
}

export default function SearchBar({ data, handleMarkerClick }: Props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    //Filter college data for values that match the search
    const filteredData = data.filter((college: any) => {
      return college.name.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(filteredData);
  };

  const handleSearchClick = (college: any) => {
    handleMarkerClick(college);
    setSearchTerm('');
    setSearchResults([]);
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
      >
        <Settings />
      </Button>
    </div>
  );
}
