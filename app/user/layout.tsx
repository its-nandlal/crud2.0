import DashBordNave from "@/components/dashbord-nav/DashBordNave"

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex h-screen overflow-hidden">
            <DashBordNave />
            <main className="w-full overflow-y-scroll">{children}</main>
        </div>
    );
}