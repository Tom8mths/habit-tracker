import React from 'react'
import { SparklesText } from '../magicui/sparkles-text'
import { SAMPLE_QUESTIONS } from '@/src/lib/constants'
import { useTheme } from 'next-themes';
import { ChevronRight } from 'lucide-react';
import { BlurFade } from '../magicui/blur-fade';

function EmptyChatState() {
  const { theme } = useTheme();
  return (
    <div>
      <SparklesText className='text-2xl mb-1' text='How Can I Assist You?'/>
      <div className='flex flex-col gap-2'>
        {SAMPLE_QUESTIONS.map((suggestion: string, index: number) => (
          <BlurFade delay={0.25*index} key={suggestion}>
            <div key={index}>
              <h2 className={`text-xs p-3 border rounded-sm transition-colors cursor-pointer ${theme === "dark" ? "hover:bg-zinc-900" : "hover:bg-gray-100"} flex items-center justify-between`}>{suggestion}<ChevronRight size={14} /></h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default EmptyChatState
