import { Button } from '@/components/ui/button';
import { HelpCircle, SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TopRightBar() {
  const { setTheme } = useTheme();

  return (
    <div className="flex absolute top-0 z-10 right-0 items-center space-x-2 mt-4 mr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-9 px-0 dark:bg-black bg-white dark:text-white text-gray-500 hover:text-white">
            <SunIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0  dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        size="icon"
        className="dark:bg-black bg-white text-gray-500 dark:text-white hover:text-white"
      >
        <HelpCircle />
      </Button>
    </div>
  );
}
