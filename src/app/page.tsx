"use client"

import React, { useEffect, useState } from 'react'
import { RootState, AppDispatch } from '@/src/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage, setUser } from '../redux/features/auth-slice';

import Header from '../components/header';
import { MainTabs } from '../components/main-tabs';
import { AddTaskDialog } from "@/src/components/modals/add-task-dialog";
import { SignInModal } from '../components/modals/sign-in-modal';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    const user = loadUserFromStorage();
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onAddTask={() => setIsAddTaskOpen(true)}
        onSignIn={() => setIsSignInModalOpen(true)}
        isAuthenticated={isAuthenticated}
      />
      <main className="container mx-auto px-4 py-6">
        <MainTabs/>
      </main>
      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
      <SignInModal open={isSignInModalOpen} onOpenChange={setIsSignInModalOpen} />
    </div>
  )
}
