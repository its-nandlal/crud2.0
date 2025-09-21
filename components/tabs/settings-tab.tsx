
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeToggle from "../modeToggle";
import { LogOut } from "lucide-react";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";


export default function SettingsTab() {

  const user = useUser({ or: "redirect" })
  const router = useRouter()

  const handleLogOut = ()=>{
    user.signOut()

    router.push('/')

  }
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your application preferences</p>
      </div>
      
      <div className="grid gap-6">
        <div className="relative grid gap-6 ">

          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-2xl font-bold uppercase">Coming Soon</p>
          </div>

        <Card className="opacity-[.3] pointer-events-none">
          <CardHeader>
            <CardTitle>Store Settings</CardTitle>
            <CardDescription>Manage your store configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Store Name</label>
              <input className="w-full mt-1 p-2 border rounded-md" defaultValue="My Store" />
            </div>
            <div>
              <label className="text-sm font-medium">Currency</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="opacity-[.3] pointer-events-none">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email notifications</span>
              <Button variant="outline" size="sm">Toggle</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Push notifications</span>
              <Button variant="outline" size="sm">Toggle</Button>
            </div>
          </CardContent>
        </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Theme Change Setting</CardTitle>
            <CardDescription>Configure how you change theme mode change</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Theme Change</span>
              <ModeToggle title="Toggle" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logout</CardTitle>
            <CardDescription>Sign out from your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Logout</span>
              <Button variant="destructive" className="cursor-pointer" onClick={handleLogOut}>
                <LogOut /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
