import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
    User, MapPin, GraduationCap, Loader2, Mail,
    Briefcase, School, BookOpen, Phone, Camera
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Default image if none exists
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        bio: "",
        location: "",
        graduationYear: "",
        email: "",
        positionHeld: "",
        university: "",
        course: "",
        gender: "",
        phone: "",
        photoURL: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        fullName: data.fullName || "",
                        bio: data.bio || "",
                        location: data.location || "",
                        graduationYear: data.graduationYear || "",
                        email: data.email || user.email || "",
                        positionHeld: data.positionHeld || "",
                        university: data.university || "",
                        course: data.course || "",
                        gender: data.gender || "",
                        phone: data.phone || "",
                        photoURL: data.photoURL || "",
                    });
                    setPreviewImage(data.photoURL || null);
                } else {
                    // Pre-fill email from auth if doc doesn't exist (though it should from signup)
                    setFormData(prev => ({ ...prev, email: user.email || "" }));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load profile data.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !user) return;

        const file = e.target.files[0];
        setSaving(true);

        try {
            // Create a reference to the storage location
            const storageRef = ref(storage, `profile-images/${user.uid}/${file.name}`);

            // Upload the file
            await uploadBytes(storageRef, file);

            // Get the download URL
            const url = await getDownloadURL(storageRef);

            // Update local state
            setPreviewImage(url);
            setFormData(prev => ({ ...prev, photoURL: url }));

            toast({
                title: "Image Uploaded",
                description: "Profile image updated successfully.",
            });

        } catch (error) {
            console.error("Error uploading image:", error);
            toast({
                variant: "destructive",
                title: "Upload Failed",
                description: "Could not upload profile image. Please try again.",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        try {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, {
                ...formData,
                updatedAt: new Date().toISOString(),
            }, { merge: true });

            toast({
                title: "Success",
                description: "Profile updated successfully.",
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update profile.",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container max-w-2xl mx-auto py-10 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-navy-deep">Edit Profile</h1>
                    <p className="text-muted-foreground mt-2">
                        Update your information to help other alumni connect with you.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center sm:flex-row gap-6 p-6 bg-card rounded-lg border shadow-sm">
                        <div className="relative group">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-muted border-4 border-white shadow-md">
                                {previewImage ? (
                                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        <User className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <label
                                htmlFor="image-upload"
                                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
                            >
                                <Camera className="w-4 h-4" />
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-lg font-semibold">Profile Picture</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                SVG, PNG, JPG or GIF (max. 2MB).
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Personal Information
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(val) => handleSelectChange("gender", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-9"
                                        disabled // Usually email shouldn't be changed easily or matches auth email
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="pl-9"
                                        placeholder="+234..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell us about yourself..."
                                className="h-24"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="pl-9"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            Academic & Career
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="graduationYear">Graduation Year</Label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="graduationYear"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        className="pl-9"
                                        placeholder="YYYY"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="positionHeld">Position Held</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="positionHeld"
                                        name="positionHeld"
                                        value={formData.positionHeld}
                                        onChange={handleChange}
                                        className="pl-9"
                                        placeholder="e.g. Head Boy, Prefect"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="university">University Attended</Label>
                            <div className="relative">
                                <School className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="university"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                    className="pl-9"
                                    placeholder="University Name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="course">Course Studied</Label>
                            <div className="relative">
                                <BookOpen className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="pl-9"
                                    placeholder="Course of Study"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                        <Button type="submit" disabled={saving} size="lg" className="w-full sm:w-auto">
                            {saving && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                            Save Profile
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
