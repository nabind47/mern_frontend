import { useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNotifications } from "@/hooks/useNotifications"

interface NotificationProps {
  isAdmin?: boolean
}

const NotificationComponent = ({ isAdmin = false }: NotificationProps) => {
  const { notifications, clearNotifications } = useNotifications(isAdmin)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.length

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 z-50 max-h-96 w-96 overflow-y-auto shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearNotifications}
                  className="h-6 px-2 text-xs"
                >
                  Clear
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No notifications
              </p>
            ) : (
              notifications.map((notification, index) => (
                <div key={index} className="rounded-lg border bg-muted/50 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {notification.type === "order_placed"
                          ? "New Order Placed"
                          : "Order Status Updated"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {notification.type === "order_placed" ? "New" : "Update"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default NotificationComponent
