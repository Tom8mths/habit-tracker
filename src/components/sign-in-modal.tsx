import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
      <DialogDescription>Sign in / Sign up Modal</DialogDescription>
        <Tabs defaultValue="sign-in" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sign-in" className="gap-2">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="sign-up" className="gap-2">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Username / Email </Label>
                <Input id="title" placeholder="Enter your username / email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password"/>
              </div>
              <div className="space-y-2">
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button>
                Sign In
              </Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="sign-up">
            <DialogHeader>
              <DialogTitle>Sign Up</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Username</Label>
                <Input id="username" placeholder="Enter your username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password"/>
              </div>
              <div className="space-y-2">
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button>
                Sign Up
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}