import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setEmailSent(true);
            toast({
                title: "Email Sent!",
                description: "Check your inbox for password reset instructions.",
            });
        } catch (error: unknown) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send reset email. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex items-center justify-center p-6 lg:p-12"
            >
                <div className="w-full max-w-md">
                    <Link to="/login" className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                            <GraduationCap className="w-7 h-7 text-gold" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-navy-deep">AFCS YOLA</h1>
                            <p className="text-xs text-muted-foreground">Alumni Network</p>
                        </div>
                    </Link>

                    {!emailSent ? (
                        <>
                            <h2 className="text-3xl font-bold text-navy-deep mb-2">Reset Password</h2>
                            <p className="text-muted-foreground mb-8">
                                Enter your email address and we'll send you instructions to reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your.email@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-12"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button variant="navy" size="lg" className="w-full" disabled={loading}>
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </form>

                            <div className="mt-6">
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Sign In
                                </Link>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-deep mb-2">Check Your Email</h2>
                            <p className="text-muted-foreground mb-6">
                                We've sent password reset instructions to:
                            </p>
                            <p className="text-lg font-semibold text-navy-deep mb-8">{email}</p>
                            <div className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    Didn't receive the email? Check your spam folder or
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setEmailSent(false);
                                        setEmail("");
                                    }}
                                >
                                    Try Another Email
                                </Button>
                            </div>
                            <div className="mt-8">
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Sign In
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Right Panel - Visual */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12"
            >
                <div className="max-w-md text-center">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gold/20 flex items-center justify-center">
                        <Mail className="w-14 h-14 text-gold" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                        Forgot Your Password?
                    </h2>
                    <p className="text-primary-foreground/80 text-lg">
                        No worries! We'll help you get back into your account in no time.
                        Just enter your email and follow the instructions.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
