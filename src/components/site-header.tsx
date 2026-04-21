import { NavLink } from "react-router"
import { Button } from "./ui/button"

import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  ChevronDownIcon,
  SearchIcon,
  ShoppingBagIcon,
  SunIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const SiteHeader = () => {
  return (
    <header className="container mx-auto flex h-24 items-center justify-between border-b">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="cursor-pointer rounded-full p-3 hover:bg-muted">
          <NavLink to="/">
            <SunIcon className="size-8" />
          </NavLink>
        </div>
        <div className="flex min-w-64 items-center justify-between gap-2 rounded-full bg-muted px-2 hover:bg-muted/80">
          <div className="flex items-center gap-4">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h2 className="text-lg font-medium">Pickup or deliver?</h2>
              <span className="text-sm text-muted-foreground">
                Kathmandu Nepal
              </span>
            </div>
          </div>
          <ChevronDownIcon />
        </div>

        <Field className="max-w-xl py-4">
          <InputGroup className="h-12">
            <InputGroupInput
              id="inline-start-input"
              placeholder="Search everything at Walmart online and in store"
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button>
          <ShoppingBagIcon />
        </Button>
        <Button asChild variant="outline">
          <NavLink to="/login" end>
            Sign in
          </NavLink>
        </Button>
        {/* <Button asChild>
          <NavLink to="/login" end>
            Login
          </NavLink>
        </Button>
        <Button asChild>
          <NavLink to="/register" end>
            Register
          </NavLink>
        </Button> */}
      </div>
    </header>
  )
}

export default SiteHeader
