import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Briefcase, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import { useState, useEffect } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
    const { user } = useAuth();
    const [userCount, setUserCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const coll = collection(db, "users");
                const snapshot = await getCountFromServer(coll);
                setUserCount(snapshot.data().count);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setUserCount(0);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        {
            title: "Alumni Network",
            value: userCount !== null ? userCount.toString() : "...",
            desc: "Registered alumni",
            icon: Users,
            color: "text-blue-500",
        },
        {
            title: "Upcoming Events",
            value: "0",
            desc: "No upcoming events",
            icon: Calendar,
            color: "text-green-500",
        },
        {
            title: "Job Opportunities",
            value: "0",
            desc: "Active listings",
            icon: Briefcase,
            color: "text-purple-500",
        },
        {
            title: "Message Requests",
            value: "0",
            desc: "Pending",
            icon: MessageSquare,
            color: "text-orange-500",
        },
    ];

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-navy-deep">
                        Welcome back, {user?.displayName?.split(" ")[0] || "Alumni"}!
                    </h1>
                    <p className="text-muted-foreground">
                        Here's what's happening in your alumni network.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Activity or Feed could go here */}
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Updates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground p-4 text-center">No recent updates.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recommended Connections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground p-4 text-center">Connect with more alumni to see recommendations.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
