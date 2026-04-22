import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavLink, useNavigate } from "react-router"

import api from "@/api"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useAuthStore } from "@/store/user.store"
import { useQuery } from "@tanstack/react-query"
import {
  ChevronDownIcon,
  SearchIcon,
  ShoppingBagIcon,
  SunIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"

const fetchUser = async (
  token: string
): Promise<{ name: string; email: string }> => {
  const response = await api.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

const SiteHeader = () => {
  const navigate = useNavigate()
  const { accessToken, removeToken } = useAuthStore()

  const { isLoading, data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchUser(accessToken),
    enabled: !!accessToken,
  })

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

        {isLoading ? (
          <Skeleton className="h-8 w-24 animate-pulse rounded-md bg-muted" />
        ) : !data?.name ? (
          <Button asChild variant="outline">
            <NavLink to="/login" end>
              Sign in
            </NavLink>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{data.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={() => {
                  removeToken()
                  navigate("/login", { replace: true })
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}

export default SiteHeader
