import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { resetAuthState, signInUser, signUpUser } from "@/src/redux/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store/store";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, successMessage, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [signInform, setSignInForm] = useState({email: '', password: ''});
  const [signUpForm, setSignUpForm] = useState({email: '', password: '', username: ''});

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm({...signInform, [e.target.name]: e.target.value});
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signInUser({email: signInform.email, password: signInform.password}));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({...signUpForm, [e.target.name]: e.target.value});
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signUpUser({name: signUpForm.username, email: signInform.email, password: signInform.password}));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetAuthState());
    }
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      onOpenChange(false)
    }
  }, [successMessage, error, dispatch, isAuthenticated, onOpenChange]);
  
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
            <form onSubmit={handleSignInSubmit}>
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Email</Label>
                  <Input id="title" type="email" value={signInform.email} name="email" onChange={handleSignInChange} placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Password</Label>
                  <Input id="password" type="password" name="password" value={signInform.password} onChange={handleSignInChange} placeholder="Enter your password"/>
                </div>
                <div className="space-y-2">
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button loading={loading} className="mb-2 sm:mb-0" spinnerColor="black" type="submit">
                  Sign In
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="sign-up">
            <form onSubmit={handleSignUpSubmit}>
              <DialogHeader>
                <DialogTitle>Sign Up</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Username</Label>
                  <Input onChange={handleSignUpChange} id="username" name="username" placeholder="Enter your username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Email</Label>
                  <Input onChange={handleSignUpChange} id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Password</Label>
                  <Input onChange={handleSignUpChange} id="password" name="password" type="password" placeholder="Enter your password"/>
                </div>
                <div className="space-y-2">
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button loading={loading} className="mb-2 sm:mb-0" spinnerColor="black" type="submit">
                  Sign Up
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}