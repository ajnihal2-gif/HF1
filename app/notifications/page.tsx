"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Calendar,
  DollarSign,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Settings,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  type: "booking" | "review" | "revenue" | "system" | "alert"
  title: string
  message: string
  time: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionRequired?: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "New Booking Received",
      message: "Sarah Johnson booked a Daily Pass with Trainer for tomorrow at 10:00 AM at Downtown Fitness.",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      actionRequired: true,
    },
    {
      id: "2",
      type: "review",
      title: "New 5-Star Review",
      message: 'Mike Chen left a 5-star review: "Amazing facilities and great trainers! Highly recommend."',
      time: "15 minutes ago",
      read: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "revenue",
      title: "Daily Revenue Target Reached",
      message: "Congratulations! Downtown Fitness has reached today's revenue target of $1,200.",
      time: "1 hour ago",
      read: true,
      priority: "medium",
    },
    {
      id: "4",
      type: "alert",
      title: "Equipment Maintenance Due",
      message: "Treadmill #3 at Westside Gym is due for maintenance. Schedule service to avoid downtime.",
      time: "2 hours ago",
      read: false,
      priority: "high",
      actionRequired: true,
    },
    {
      id: "5",
      type: "booking",
      title: "Booking Cancellation",
      message: "Tom Wilson cancelled his membership session scheduled for today at 3:00 PM.",
      time: "3 hours ago",
      read: true,
      priority: "low",
    },
    {
      id: "6",
      type: "system",
      title: "System Update Complete",
      message: "GymManager Pro has been updated to version 2.1.0 with new reporting features.",
      time: "1 day ago",
      read: true,
      priority: "low",
    },
    {
      id: "7",
      type: "review",
      title: "Review Response Needed",
      message: "Lisa Park left a 2-star review mentioning cleanliness concerns. Consider responding.",
      time: "1 day ago",
      read: false,
      priority: "high",
      actionRequired: true,
    },
    {
      id: "8",
      type: "revenue",
      title: "Weekly Revenue Report",
      message: "Your weekly revenue report is ready. Total earnings: $8,450 across all locations.",
      time: "2 days ago",
      read: true,
      priority: "medium",
    },
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "priority">("all")
  const [notificationSettings, setNotificationSettings] = useState({
    autoMarkRead: false,
    groupSimilar: true,
    showPreviews: true,
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return Calendar
      case "review":
        return Star
      case "revenue":
        return DollarSign
      case "alert":
        return AlertCircle
      case "system":
        return Settings
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-600"
    if (type === "revenue") return "text-green-600"
    if (type === "review") return "text-yellow-600"
    return "text-blue-600"
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            Low
          </Badge>
        )
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read
    if (filter === "priority") return notif.priority === "high"
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const priorityCount = notifications.filter((n) => n.priority === "high").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your gym management activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {unreadCount} unread
          </Badge>
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="priority">Priority ({priorityCount})</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">All caught up!</h3>
                  <p className="text-muted-foreground text-center">
                    {filter === "unread"
                      ? "No unread notifications"
                      : filter === "priority"
                        ? "No priority notifications"
                        : "No notifications to show"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type)
                return (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${
                      !notification.read ? "border-primary/50 bg-primary/5" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-full bg-background border ${getNotificationColor(
                            notification.type,
                            notification.priority,
                          )}`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h4>
                            {getPriorityBadge(notification.priority)}
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                                Action Required
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{notification.message}</p>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!notification.read && (
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark as Read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          {/* Notification Settings Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Notifications</span>
                  <Badge variant="secondary">{notifications.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unread</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {unreadCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">High Priority</span>
                  <Badge variant="destructive">{priorityCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Action Required</span>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    {notifications.filter((n) => n.actionRequired).length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>Customize your notification experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Auto Mark Read</p>
                    <p className="text-xs text-muted-foreground">Mark as read when viewed</p>
                  </div>
                  <Switch
                    checked={notificationSettings.autoMarkRead}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, autoMarkRead: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Group Similar</p>
                    <p className="text-xs text-muted-foreground">Group similar notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.groupSimilar}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, groupSimilar: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Show Previews</p>
                    <p className="text-xs text-muted-foreground">Show message previews</p>
                  </div>
                  <Switch
                    checked={notificationSettings.showPreviews}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, showPreviews: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Bookings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm">Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">System</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
