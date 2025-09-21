import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { stackServerApp } from "@/stack";

export default async function ProfileTab() {

  const user = await stackServerApp.getUser()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Not update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.profileImageUrl?.toString()} />
              <AvatarFallback className="text-lg">{user?.setDisplayName.toString()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user?.displayName?.toString()}</h3>
              <p className="text-muted-foreground">{user?.primaryEmail?.toString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input className="w-full mt-1 p-2 border rounded-md" defaultValue="Niandla" />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input className="w-full mt-1 p-2 border rounded-md" defaultValue="Doe" />
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
